import React, { useState, useContext } from 'react';
import { Group, Rect, Circle, Text, Line } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { CircuitComponent } from '../../../types/components';
import { useWorkspaceStore } from '../../../store/workspaceStore';
import { useSimulationStore } from '../../../store/simulationStore';
import { CanvasContext } from '../../canvas/Canvas';

interface RelayProps {
  component: CircuitComponent;
}

const COMMONLY_USED_PINS = ['IN', 'VCC', 'GND', 'NO', 'COM', 'NC'];

export const Relay: React.FC<RelayProps> = ({ component }) => {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const { handlePinMouseDown, handlePinMouseEnter, handlePinMouseLeave } = useContext(CanvasContext);

  const compState = useSimulationStore((state) => state.componentStates[component.id]) as any;
  const isActivated = compState?.isActivated ?? false;

  const handleDragStart = () => {
    useWorkspaceStore.getState().pushHistory();
  };

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    useWorkspaceStore.getState().updateComponentPosition(component.id, {
      x: e.target.x(),
      y: e.target.y()
    });
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    useWorkspaceStore.getState().updateComponentPosition(component.id, {
      x: e.target.x(),
      y: e.target.y()
    });
  };

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    useWorkspaceStore.getState().selectComponent(component.id, e.evt.shiftKey);
  };

  const onPinMouseDown = (e: KonvaEventObject<MouseEvent>, pinId: string) => {
    e.cancelBubble = true;
    handlePinMouseDown({ componentId: component.id, pinId });
  };

  const renderPins = () => {
    return Object.values(component.pins).map((pin) => {
      const isCommon = COMMONLY_USED_PINS.includes(pin.label);
      const isHovered = hoveredPin === pin.id;
      
      const isRightSide = pin.label === 'NO' || pin.label === 'COM' || pin.label === 'NC';
      
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
          {isRightSide ? (
            <Group>
              <Rect x={0} y={-4} width={8} height={8} fill="#d1d5db" />
              <Circle x={4} y={0} radius={2} fill="#4b5563" />
              <Text 
                text={pin.label} 
                x={12} y={-3} 
                fontSize={7} 
                fontFamily="monospace"
                fill="#374151" 
              />
            </Group>
          ) : (
            <Group>
              <Rect x={-3} y={0} width={6} height={8} fill="#9ca3af" />
              <Text 
                text={pin.label} 
                x={-15} y={12} 
                width={30} 
                align="center" 
                fontSize={7} 
                fontFamily="monospace"
                fill="#374151" 
              />
            </Group>
          )}

          {isCommon && (
            <Group x={isRightSide ? 8 : 0} y={isRightSide ? 0 : 8}>
              <Circle x={0} y={0} radius={6} fill="transparent" />
              <Circle
                x={0} y={0}
                radius={isHovered ? 2.5 : 1.5}
                fill="#171717"
                stroke={isHovered ? '#fbbf24' : '#404040'}
                strokeWidth={isHovered ? 1 : 0.5}
              />
            </Group>
          )}
        </Group>
      );
    });
  };

  return (
    <Group
      x={component.position.x}
      y={component.position.y}
      rotation={component.rotation}
      draggable
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onTap={handleClick}
    >
      <Group x={-7} y={-32}>
        <Rect width={44} height={32} fill="#1e293b" cornerRadius={2} />
        
        {/* Label */}
        <Text text="RELAY" x={2} y={2} fontSize={6} fill="#ffffff" />

        {/* LED Indicator */}
        <Circle x={38} y={5} radius={1.5} fill={isActivated ? '#ef4444' : '#4b5563'} shadowColor={isActivated ? '#ef4444' : 'transparent'} shadowBlur={isActivated ? 4 : 0} />

        {/* Coil Symbol */}
        <Group x={6} y={12}>
          <Rect x={0} y={0} width={8} height={12} stroke="#94a3b8" strokeWidth={1} />
          <Line points={[0, 2, 8, 2]} stroke="#94a3b8" strokeWidth={1} />
          <Line points={[0, 6, 8, 6]} stroke="#94a3b8" strokeWidth={1} />
          <Line points={[0, 10, 8, 10]} stroke="#94a3b8" strokeWidth={1} />
        </Group>

        {/* Switch Symbol */}
        <Group x={24} y={12}>
          {/* COM Terminal line */}
          <Line points={[0, 12, 0, 8]} stroke="#94a3b8" strokeWidth={1} />
          {/* NC Terminal line */}
          <Line points={[12, 0, 12, 4]} stroke="#94a3b8" strokeWidth={1} />
          {/* NO Terminal line */}
          <Line points={[12, 12, 12, 8]} stroke="#94a3b8" strokeWidth={1} />
          
          {/* Moving contact */}
          <Line 
            points={isActivated ? [0, 8, 11, 8] : [0, 8, 11, 4]} 
            stroke="#94a3b8" 
            strokeWidth={1} 
          />
          
          <Circle x={0} y={8} radius={1} fill="#94a3b8" />
          <Circle x={12} y={4} radius={1} fill="#94a3b8" />
          <Circle x={12} y={8} radius={1} fill="#94a3b8" />
        </Group>
      </Group>

      {renderPins()}
    </Group>
  );
};
