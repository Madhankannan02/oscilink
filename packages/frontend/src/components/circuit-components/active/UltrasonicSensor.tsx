import React, { useState, useContext } from 'react';
import { Group, Rect, Circle, Text, Line } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { CircuitComponent } from '../../../types/components';
import { useWorkspaceStore } from '../../../store/workspaceStore';
import { CanvasContext } from '../../canvas/Canvas';

interface UltrasonicSensorProps {
  component: CircuitComponent;
}

const COMMONLY_USED_PINS = ['GND', '5V', 'SIG', 'VCC', 'TRIG', 'ECHO'];

export const UltrasonicSensor: React.FC<UltrasonicSensorProps> = ({ component }) => {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const { handlePinMouseDown, handlePinMouseEnter, handlePinMouseLeave } = useContext(CanvasContext);

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
          {isCommon && (
            <Group y={0}>
              <Circle x={0} y={0} radius={6} fill="transparent" />
              <Circle
                x={0} y={0}
                radius={isHovered ? 2.5 : 1.5}
                fill={isHovered ? '#fbbf24' : '#171717'}
                stroke={isHovered ? '#fbbf24' : '#404040'}
                strokeWidth={isHovered ? 1 : 0.5}
              />
              {isHovered && (
                <Group x={-12} y={8}>
                  <Rect width={24} height={10} fill="#1f2937" cornerRadius={2} opacity={0.9} />
                  <Text
                    text={pin.label}
                    width={24} height={10}
                    align="center" verticalAlign="middle"
                    fontSize={6} fill="#fbbf24"
                    fontFamily="monospace" fontStyle="bold"
                  />
                </Group>
              )}
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
      <Group x={-52} y={-58}>
        <Rect width={104} height={48} fill="#115268" cornerRadius={2} />
        
        {/* Mounting Holes */}
        <Circle x={6} y={42} radius={3.5} fill="#ffffff" />
        <Circle x={98} y={6} radius={3.5} fill="#ffffff" />

        {/* Top Left Text */}
        <Text text="28015" x={3} y={3} fontSize={4.5} fill="#ffffff" fontFamily="sans-serif" fontStyle="bold" />
        <Text text="REV C" x={3} y={8.5} fontSize={4.5} fill="#ffffff" fontFamily="sans-serif" fontStyle="bold" />

        {/* Top Center Text */}
        <Text text="WWW.PARALLAX.COM" x={52} y={4} offsetX={30} width={60} align="center" fontSize={3.5} fill="#ffffff" fontFamily="sans-serif" />

        {/* Center Text */}
        <Text text="PING)))" x={52} y={18} offsetX={20} width={40} align="center" fontSize={7} fontStyle="bold" fill="#ffffff" />

        {/* ACT Component */}
        <Group x={46} y={7}>
          <Rect width={8} height={4.5} fill="transparent" stroke="#ffffff" strokeWidth={0.5} />
          <Rect width={8} height={2} fill="#e5e7eb" />
          <Rect y={2} width={8} height={2.5} fill="#1f2937" />
          <Text text="ACT" x={0} y={5.5} width={8} align="center" fontSize={3} fill="#ffffff" />
        </Group>

        {/* SMDs */}
        {/* Top near ACT */}
        <Group x={58} y={8}>
          <Rect x={0} y={0} width={1} height={1.5} fill="#d1d5db" />
          <Rect x={1} y={0} width={2.5} height={1.5} fill="#111827" />
          <Rect x={3.5} y={0} width={1} height={1.5} fill="#d1d5db" />
        </Group>
        
        {/* Bottom Left near pins */}
        <Group x={40.5} y={32}>
          <Rect x={0} y={0} width={1.5} height={1} fill="#d1d5db" />
          <Rect x={0} y={1} width={1.5} height={2.5} fill="#111827" />
          <Rect x={0} y={3.5} width={1.5} height={1} fill="#d1d5db" />
        </Group>

        {/* Bottom Right near pins */}
        <Group x={62} y={32}>
          <Rect x={0} y={0} width={1.5} height={1} fill="#d1d5db" />
          <Rect x={0} y={1} width={1.5} height={2.5} fill="#111827" />
          <Rect x={0} y={3.5} width={1.5} height={1} fill="#d1d5db" />
        </Group>

        {/* Left Transducer */}
        <Group x={23} y={24}>
          <Circle 
            radius={21} 
            fillLinearGradientStartPoint={{ x: -21, y: -21 }}
            fillLinearGradientEndPoint={{ x: 21, y: 21 }}
            fillLinearGradientColorStops={[0, '#f3f4f6', 1, '#9ca3af']}
          />
          <Circle radius={16} fill="#374151" />
          <Circle 
            radius={15} 
            fillLinearGradientStartPoint={{ x: -15, y: -15 }}
            fillLinearGradientEndPoint={{ x: 15, y: 15 }}
            fillLinearGradientColorStops={[0, '#a3a629', 1, '#70731a']}
          />
          <Circle 
            radius={11} 
            fillLinearGradientStartPoint={{ x: -11, y: -11 }}
            fillLinearGradientEndPoint={{ x: 11, y: 11 }}
            fillLinearGradientColorStops={[0, '#6b7280', 1, '#d1d5db']}
          />
        </Group>

        {/* Right Transducer */}
        <Group x={81} y={24}>
          <Circle 
            radius={21} 
            fillLinearGradientStartPoint={{ x: -21, y: -21 }}
            fillLinearGradientEndPoint={{ x: 21, y: 21 }}
            fillLinearGradientColorStops={[0, '#f3f4f6', 1, '#9ca3af']}
          />
          <Circle radius={16} fill="#374151" />
          <Circle 
            radius={15} 
            fillLinearGradientStartPoint={{ x: -15, y: -15 }}
            fillLinearGradientEndPoint={{ x: 15, y: 15 }}
            fillLinearGradientColorStops={[0, '#a3a629', 1, '#70731a']}
          />
          <Circle 
            radius={11} 
            fillLinearGradientStartPoint={{ x: -11, y: -11 }}
            fillLinearGradientEndPoint={{ x: 11, y: 11 }}
            fillLinearGradientColorStops={[0, '#6b7280', 1, '#d1d5db']}
          />
        </Group>

        {/* Pin Labels on PCB */}
        <Group x={44.5} y={26}>
          <Rect width={15} height={18} stroke="#ffffff" strokeWidth={0.5} />
          <Line points={[5, 0, 5, 18]} stroke="#ffffff" strokeWidth={0.5} />
          <Line points={[10, 0, 10, 18]} stroke="#ffffff" strokeWidth={0.5} />
          
          <Group x={1.5} y={15} rotation={-90}><Text text="GND" fontSize={3.5} fill="#ffffff" /></Group>
          <Group x={6.5} y={14} rotation={-90}><Text text="5V" fontSize={3.5} fill="#ffffff" /></Group>
          <Group x={11.5} y={15} rotation={-90}><Text text="SIG" fontSize={3.5} fill="#ffffff" /></Group>

          <Circle x={2.5} y={16.5} radius={1} fill="#d1d5db" />
          <Circle x={7.5} y={16.5} radius={1} fill="#d1d5db" />
          <Circle x={12.5} y={16.5} radius={1} fill="#d1d5db" />
        </Group>

        {/* Black Pin Headers */}
        <Group x={45.5} y={45}>
          <Rect x={0} y={0} width={3} height={6} fill="#4b5563" />
          <Rect x={0} y={1} width={3} height={4} fill="#111827" />
        </Group>
        <Group x={50.5} y={45}>
          <Rect x={0} y={0} width={3} height={6} fill="#4b5563" />
          <Rect x={0} y={1} width={3} height={4} fill="#111827" />
        </Group>
        <Group x={55.5} y={45}>
          <Rect x={0} y={0} width={3} height={6} fill="#4b5563" />
          <Rect x={0} y={1} width={3} height={4} fill="#111827" />
        </Group>
        
        {/* Metal Pins */}
        <Rect x={46.5} y={51} width={1} height={7} fill="#d1d5db" />
        <Rect x={51.5} y={51} width={1} height={7} fill="#d1d5db" />
        <Rect x={56.5} y={51} width={1} height={7} fill="#d1d5db" />
      </Group>

      {renderPins()}
    </Group>
  );
};
