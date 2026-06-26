import React, { useState } from 'react';
import { simulationManager } from '../../simulation/SimulationManager';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { useSimulationStore } from '../../store/simulationStore';
import { Radio } from 'lucide-react';

export const SensorDistanceControl: React.FC = () => {
  const selectedComponentIds = useWorkspaceStore(state => state.selectedComponentIds);
  const components = useWorkspaceStore(state => state.components);
  const simulationStatus = useSimulationStore(state => state.status);
  
  const [localDistance, setLocalDistance] = useState(50);

  // Find if exactly one ULTRASONIC_SENSOR is selected
  const selectedSensors = components.filter(c => 
    selectedComponentIds.includes(c.id) && c.type === 'ULTRASONIC_SENSOR'
  );

  const componentStates = useSimulationStore(state => state.componentStates) as any;
  
  if (selectedComponentIds.length !== 1 || selectedSensors.length !== 1) {
    return null;
  }

  const sensor = selectedSensors[0];
  const isRunning = simulationStatus === 'RUNNING';
  const sensorState = componentStates[sensor.id];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setLocalDistance(val);
    if (isRunning) {
      simulationManager.setSimulatedDistance(val);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      width: '280px',
      backgroundColor: '#2C5E4A',
      border: '1px solid #1E4133',
      borderRadius: '16px',
      padding: '16px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
      zIndex: 1000,
      color: '#ffffff',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
        <Radio size={20} color="#ffffff" style={{ marginRight: '8px' }} />
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Ultrasonic Sensor</h3>
      </div>
      
      <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#D2E8D6' }}>
        Simulated Distance
      </p>

      <input 
        type="range" 
        min="2" 
        max="400" 
        step="1" 
        value={localDistance} 
        onChange={handleSliderChange}
        style={{ 
          width: '100%', 
          marginBottom: '8px',
          accentColor: '#ffffff'
        }} 
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{localDistance} cm</span>
        <span style={{ fontSize: '12px', color: '#D2E8D6' }}>(HC-SR04 range: 2-400cm)</span>
      </div>

      {!isRunning && (
        <div style={{ fontSize: '12px', color: '#D2E8D6', fontStyle: 'italic', marginTop: '8px' }}>
          Start simulation to test distance readings
        </div>
      )}

      {isRunning && sensorState && sensorState.distanceCm !== undefined && (
        <div style={{ fontSize: '13px', color: '#86efac', marginTop: '8px', fontWeight: 600 }}>
          Last reading: {sensorState.distanceCm}cm
        </div>
      )}
    </div>
  );
};
