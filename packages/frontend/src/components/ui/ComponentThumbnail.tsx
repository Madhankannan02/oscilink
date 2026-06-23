import React, { useMemo } from 'react';
import { Stage, Layer, Group } from 'react-konva';
import { ComponentType } from '../../types/components';
import { createComponent } from '../../utils/componentFactory';
import { ComponentRouter } from '../canvas/ComponentLayer';
import { CanvasContext } from '../canvas/Canvas';

const dummyContext = {
  handlePinMouseDown: () => {},
  handlePinMouseEnter: () => {},
  handlePinMouseLeave: () => {},
  handleGridMouseDown: () => {},
  handleGridMouseMove: () => {},
  handleGridMouseUp: () => {},
} as any;

interface ComponentThumbnailProps {
  type: ComponentType;
  size?: number;
}

export const ComponentThumbnail: React.FC<ComponentThumbnailProps> = ({ type, size = 32 }) => {
  const component = useMemo(() => createComponent(type, { x: 0, y: 0 }), [type]);

  const { scale, offsetX, offsetY } = useMemo(() => {
    switch (type) {
      case 'ARDUINO_UNO': return { scale: size / 210, offsetX: -100, offsetY: -74 };
      case 'BREADBOARD': return { scale: size / 330, offsetX: -165, offsetY: -90 };
      case 'LCD_16X2': return { scale: size / 100, offsetX: -50, offsetY: -20 };
      case 'LED': return { scale: size / 40, offsetX: -15, offsetY: -20 };
      case 'RESISTOR': return { scale: size / 60, offsetX: -30, offsetY: -10 };
      case 'PUSH_BUTTON': return { scale: size / 40, offsetX: -20, offsetY: -20 };
      case 'POTENTIOMETER': return { scale: size / 60, offsetX: -30, offsetY: -30 };
      case 'SERVO_MOTOR': return { scale: size / 80, offsetX: -40, offsetY: -30 };
      case 'BUZZER': return { scale: size / 50, offsetX: -25, offsetY: -25 };
      case 'ULTRASONIC_SENSOR': return { scale: size / 60, offsetX: -30, offsetY: -15 };
      case 'RELAY': return { scale: size / 60, offsetX: -30, offsetY: -20 };
      case 'TEMPERATURE_SENSOR': return { scale: size / 50, offsetX: -25, offsetY: -15 };
      default: return { scale: size / 100, offsetX: -50, offsetY: -50 };
    }
  }, [type, size]);

  return (
    <div className="flex items-center justify-center flex-shrink-0 pointer-events-none" style={{ width: size, height: size }}>
      <Stage width={size} height={size}>
        <CanvasContext.Provider value={dummyContext}>
          <Layer>
            <Group x={size / 2} y={size / 2} scaleX={scale} scaleY={scale}>
              <Group x={offsetX} y={offsetY}>
                <ComponentRouter component={component} />
              </Group>
            </Group>
          </Layer>
        </CanvasContext.Provider>
      </Stage>
    </div>
  );
};
