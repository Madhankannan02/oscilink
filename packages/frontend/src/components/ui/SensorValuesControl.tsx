import React, { useState, useEffect } from 'react';
import { Thermometer } from 'lucide-react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { useSimulationStore } from '../../store/simulationStore';
import { simulationManager } from '../../simulation/SimulationManager';

export const SensorValuesControl: React.FC = () => {
  const selectedComponentIds = useWorkspaceStore(state => state.selectedComponentIds);
  const components = useWorkspaceStore(state => state.components);
  const simulationStatus = useSimulationStore(state => state.status);
  
  const [temperature, setTemperature] = useState(25.0);
  const [humidity, setHumidity] = useState(60);

  // Check if a TEMPERATURE_SENSOR is selected
  const selectedSensor = components.find(
    c => selectedComponentIds.includes(c.id) && c.type === 'TEMPERATURE_SENSOR'
  );

  useEffect(() => {
    if (simulationStatus === 'RUNNING') {
      simulationManager.setSensorValues(temperature, humidity);
    }
  }, [temperature, humidity, simulationStatus]);

  if (!selectedSensor) return null;

  return (
    <div className="absolute top-20 left-4 z-40 bg-[#2C5E4A] border border-[#1E4133] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.15)] w-72 pointer-events-auto">
      <div className="p-4 border-b border-[#1E4133] bg-[#2C5E4A] rounded-t-2xl flex items-center gap-2">
        <Thermometer size={16} className="text-white" />
        <h3 className="text-sm font-semibold text-white">DHT11 Sensor</h3>
      </div>
      
      <div className="p-4 space-y-4">
        {simulationStatus !== 'RUNNING' ? (
          <div className="text-sm text-[#D2E8D6] text-center py-2 italic">
            Start simulation to use sensor controls
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#D2E8D6]">Temperature</span>
                <span className="text-white font-bold">{temperature.toFixed(1)}°C</span>
              </div>
              <input 
                type="range" 
                min="-10" 
                max="80" 
                step="0.5" 
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-white"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#D2E8D6]">Humidity</span>
                <span className="text-white font-bold">{humidity.toFixed(0)}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="1" 
                value={humidity}
                onChange={(e) => setHumidity(parseFloat(e.target.value))}
                className="w-full accent-white"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
