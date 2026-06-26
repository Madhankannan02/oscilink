import React, { useState, useRef, useEffect, useCallback, memo } from 'react';

import { Group, Rect, Circle, Text } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { CircuitComponent } from '../../../types/components';
import { useWorkspaceStore } from '../../../store/workspaceStore';
import { useSimulationStore } from '../../../store/simulationStore';
import { CanvasContext } from '../../canvas/Canvas';

interface LCDProps {
  component: CircuitComponent;
}

const COMMONLY_USED_PINS = ['GND', 'VCC', 'SDA', 'SCL'];

export const LCD16x2_I2C = memo(({ component }: LCDProps) => {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [flashRow, setFlashRow] = useState<number | null>(null);
  
  const { handlePinMouseDown, handlePinMouseEnter, handlePinMouseLeave } = React.useContext(CanvasContext);

  const compState = useSimulationStore((state) => state.componentStates[component.id]) as any;
  const isBacklightOn = compState?.backlight ?? false;
  const rows = compState?.rows ?? ['                ', '                '];
  const cursorRow = compState?.cursorRow;
  const cursorCol = compState?.cursorCol;

  const prevRowsRef = useRef(rows);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (rows && prevRowsRef.current) {
      if (rows[0] !== prevRowsRef.current[0]) setFlashRow(0);
      else if (rows[1] !== prevRowsRef.current[1]) setFlashRow(1);
      
      if (rows[0] !== prevRowsRef.current[0] || rows[1] !== prevRowsRef.current[1]) {
        const t = setTimeout(() => setFlashRow(null), 100);
        return () => clearTimeout(t);
      }
    }
    prevRowsRef.current = rows;
  }, [rows]);

  // Migration for existing components that were created with old horizontal pin layout
  useEffect(() => {
    const gndPin = component.pins['GND'];
    if (gndPin && gndPin.position.x !== -23) {
      useWorkspaceStore.setState((state) => {
        const comps = [...state.components];
        const idx = comps.findIndex(c => c.id === component.id);
        if (idx >= 0) {
          const newPins = { ...comps[idx].pins };
          if (newPins['GND']) newPins['GND'] = { ...newPins['GND'], position: { x: -23, y: -50 } };
          if (newPins['VCC']) newPins['VCC'] = { ...newPins['VCC'], position: { x: -23, y: -40 } };
          if (newPins['SDA']) newPins['SDA'] = { ...newPins['SDA'], position: { x: -23, y: -30 } };
          if (newPins['SCL']) newPins['SCL'] = { ...newPins['SCL'], position: { x: -23, y: -20 } };
          comps[idx] = { ...comps[idx], pins: newPins };
          return { components: comps };
        }
        return state;
      });
    }
  }, [component.id, component.pins]);

  const handleDragStart = useCallback(() => {
    useWorkspaceStore.getState().pushHistory();
  }, []);

  const handleDragMove = useCallback((e: KonvaEventObject<DragEvent>) => {
    useWorkspaceStore.getState().moveSelectedComponents(component.id, e.target.x(), e.target.y());
  }, [component.id]);

  const handleDragEnd = useCallback((e: KonvaEventObject<DragEvent>) => {
    useWorkspaceStore.getState().moveSelectedComponents(component.id, e.target.x(), e.target.y());
  }, [component.id]);

  const handleClick = useCallback((e: KonvaEventObject<MouseEvent>) => {
    useWorkspaceStore.getState().selectComponent(component.id, e.evt.shiftKey);
  }, [component.id]);

  const onPinMouseDown = useCallback((e: KonvaEventObject<MouseEvent>, pinId: string) => {
    e.cancelBubble = true;
    handlePinMouseDown({ componentId: component.id, pinId });
  }, [component.id, handlePinMouseDown]);

  const renderPins = () => {
    return Object.values(component.pins).map((pin) => {
      const isCommon = COMMONLY_USED_PINS.includes(pin.label);
      const isHovered = hoveredPin === pin.id;
      return (
        <Group
          key={pin.id}
          x={pin.position.x}
          y={pin.position.y}
          onMouseEnter={() => {
            if (isCommon) {
              setHoveredPin(pin.id);
              document.body.style.cursor = 'crosshair';
              handlePinMouseEnter({ componentId: component.id, pinId: pin.id });
            }
          }}
          onMouseLeave={() => {
            if (isCommon) {
              setHoveredPin(null);
              document.body.style.cursor = 'default';
              handlePinMouseLeave();
            }
          }}
          onMouseDown={(e) => {
            if (isCommon) onPinMouseDown(e, pin.id);
          }}
        >
          {/* Horizontal labeled rectangle for the pin */}
          <Rect x={0} y={-3} width={8} height={6} fill="#9ca3af" />
          <Text 
            text={pin.label} 
            x={-27} y={-3.5} 
            width={25} 
            align="right" 
            fontSize={7} 
            fontFamily="monospace"
            fill="#374151" 
          />
          
          {/* Interactive circle if common */}
          {isCommon && (
            <Group x={0}>
              <Circle x={0} y={0} radius={6} fill="transparent" />
              <Circle
                x={0} y={0}
                radius={isHovered ? 2.5 : 1.5}
                fill={isHovered ? '#fbbf24' : '#171717'}
                stroke={isHovered ? '#fbbf24' : '#404040'}
                strokeWidth={isHovered ? 1 : 0.5}
              />
            </Group>
          )}
        </Group>
      );
    });
  };

  const moduleWidth = 176;
  const moduleHeight = 72;
  const innerInset = 8;
  const innerWidth = moduleWidth - innerInset * 2;
  const innerHeight = moduleHeight - innerInset * 2;

  const bgColor = isBacklightOn ? '#1e3a8a' : '#14532d';
  const borderColor = isBacklightOn ? '#1e40af' : '#064e3b';
  const charColor = isBacklightOn ? '#a5f3fc' : '#86efac';
  const flashColor = isBacklightOn ? 'rgba(165, 243, 252, 0.2)' : 'rgba(134, 239, 172, 0.2)';

  const charWidth = 9;
  const charHeight = 16;
  
  // Center the 16x2 grid inside the inner display area
  const gridWidth = 16 * charWidth;
  const gridHeight = 2 * charHeight;
  const gridX = innerInset + (innerWidth - gridWidth) / 2;
  const gridY = innerInset + (innerHeight - gridHeight) / 2;

  return (
    <Group
      x={component.position.x}
      y={component.position.y}
      rotation={component.rotation}
      scaleX={component.properties?.flipX ? -1 : 1}
      scaleY={component.properties?.flipY ? -1 : 1}
      draggable
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onTap={handleClick}
    >
      <Group x={-12} y={-72}>
        {/* Module Background */}
        <Rect
          x={0} y={0}
          width={moduleWidth} height={moduleHeight}
          fill={bgColor}
          stroke={borderColor}
          strokeWidth={2}
          cornerRadius={4}
        />
        
        {/* Inner Display Area */}
        <Rect
          x={innerInset} y={innerInset}
          width={innerWidth} height={innerHeight}
          fill={isBacklightOn ? '#0f172a' : '#064e3b'}
          stroke="#000"
          strokeWidth={1}
        />

        {/* Characters Grid */}
        <Group x={gridX} y={gridY}>
          {rows.map((rowText: string, rIndex: number) => (
            <Group key={`row-${rIndex}`} y={rIndex * charHeight}>
              {/* Flash effect */}
              {flashRow === rIndex && (
               <Rect x={0} y={0} width={gridWidth} height={charHeight} fill={flashColor} />
              )}
              
              {rowText.split('').map((char, cIndex) => {
                const isCursorHere = cursorVisible && cursorRow === rIndex && cursorCol === cIndex;
                
                return (
                  <Group key={`cell-${rIndex}-${cIndex}`} x={cIndex * charWidth}>
                    {/* Character cell background / cursor */}
                    {isCursorHere && (
                      <Rect x={0} y={0} width={charWidth} height={charHeight} fill={charColor} />
                    )}
                    
                    {/* Character text */}
                    <Text
                      text={char}
                      x={0} y={2}
                      width={charWidth}
                      height={charHeight}
                      align="center"
                      fontSize={10}
                      fontFamily="monospace"
                      fill={isCursorHere ? (isBacklightOn ? '#0f172a' : '#064e3b') : charColor}
                    />
                  </Group>
                );
              })}
            </Group>
          ))}
        </Group>
        
        {/* Mounting holes on PCB */}
        <Circle x={4} y={4} radius={1.5} fill="#000" />
        <Circle x={moduleWidth - 4} y={4} radius={1.5} fill="#000" />
        <Circle x={4} y={moduleHeight - 4} radius={1.5} fill="#000" />
        <Circle x={moduleWidth - 4} y={moduleHeight - 4} radius={1.5} fill="#000" />

        {/* Soldered pins for standard LCD headers (12 silver dots) */}
        {Array.from({ length: 12 }).map((_, i) => (
          <Circle key={`solder-${i}`} x={22 + i * 12} y={68} radius={2} fill="#d1d5db" />
        ))}

        {/* I2C Backpack Module attached to the back/left */}
        <Rect x={-10} y={15} width={20} height={40} fill="#1f2937" stroke="#000" strokeWidth={1} cornerRadius={2} />
      </Group>

      {renderPins()}
    </Group>
  );
}, (prev, next) => {
  return (
    prev.component.position.x === next.component.position.x &&
    prev.component.position.y === next.component.position.y &&
    prev.component.rotation === next.component.rotation &&
    JSON.stringify(prev.component.properties) === JSON.stringify(next.component.properties)
  );
});
