import React, { useEffect, useRef } from 'react';
import { Layer, Group, Rect, Text } from 'react-konva';
import Konva from 'konva';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { useSimulationStore } from '../../store/simulationStore';
import { CircuitComponent } from '../../types/components';

import { ArduinoUno } from '../circuit-components/arduino/ArduinoUno';
import { LED } from '../circuit-components/passive/LED';
import { Resistor } from '../circuit-components/passive/Resistor';
import { PushButton } from '../circuit-components/passive/PushButton';

const FallbackComponent = ({ component }: { component: CircuitComponent }) => (
  <Group x={component.position.x} y={component.position.y} rotation={component.rotation}>
    <Rect width={100} height={100} fill="#374151" stroke="#4b5563" strokeWidth={2} cornerRadius={8} />
    <Text text={component.type} fill="white" align="center" verticalAlign="middle" width={100} height={100} padding={10} />
  </Group>
);

const ComponentRouter = ({ component }: { component: CircuitComponent }) => {
  switch (component.type) {
    case 'ARDUINO_UNO': return <ArduinoUno component={component} />;
    case 'LED': return <LED component={component} />;
    case 'RESISTOR': return <Resistor component={component} />;
    case 'PUSH_BUTTON': return <PushButton component={component} />;
    // Render fallback for un-implemented types
    case 'POTENTIOMETER':
    case 'SERVO_MOTOR':
    case 'BUZZER':
    case 'LCD_16X2':
    case 'ULTRASONIC_SENSOR':
    case 'TEMPERATURE_SENSOR':
    case 'RELAY':
    case 'BREADBOARD':
    default: return <FallbackComponent component={component} />;
  }
};

const MemoizedComponent = React.memo(
  ({ component }: { component: CircuitComponent }) => {
    // Select only this specific component's simulation state to prevent unnecessary re-renders
    const simState = useSimulationStore(state => state.componentStates[component.id]);
    
    return <ComponentRouter component={component} />;
  },
  (prev, next) => {
    // Re-render when position, rotation, or properties change
    return (
      prev.component.position.x === next.component.position.x &&
      prev.component.position.y === next.component.position.y &&
      prev.component.rotation === next.component.rotation &&
      prev.component.properties === next.component.properties
    );
  }
);

export const ComponentLayer: React.FC = () => {
  const components = useWorkspaceStore(state => state.components);
  const viewport = useWorkspaceStore(state => state.viewport);
  const layerRef = useRef<Konva.Layer>(null);

  // Call layer.batchDraw() when component states change from simulation
  useEffect(() => {
    const unsubscribe = useSimulationStore.subscribe(
      (state, oldState) => {
        if (state.componentStates !== oldState.componentStates && layerRef.current) {
          layerRef.current.batchDraw();
        }
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <Layer 
      ref={layerRef}
      x={viewport.x} 
      y={viewport.y} 
      scaleX={viewport.scale} 
      scaleY={viewport.scale}
    >
      {components.map(comp => (
        <MemoizedComponent key={comp.id} component={comp} />
      ))}
    </Layer>
  );
};
