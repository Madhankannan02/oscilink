import React from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { WireColor } from '../../types/components';

const COLORS: { value: WireColor; hex: string }[] = [
  { value: 'red', hex: '#ef4444' },
  { value: 'black', hex: '#171717' },
  { value: 'blue', hex: '#3b82f6' },
  { value: 'yellow', hex: '#eab308' },
  { value: 'green', hex: '#22c55e' },
  { value: 'orange', hex: '#f97316' },
  { value: 'white', hex: '#f8fafc' },
];

export const WireColorPicker: React.FC = () => {
  const selectedWireIds = useWorkspaceStore(state => state.selectedWireIds);
  const selectedComponentIds = useWorkspaceStore(state => state.selectedComponentIds);
  const updateWireColor = useWorkspaceStore(state => state.updateWireColor);
  const wires = useWorkspaceStore(state => state.wires);

  // Only show if at least one wire is selected and no components are selected
  if (selectedWireIds.length === 0 || selectedComponentIds.length > 0) return null;

  // Find current color of the first selected wire to highlight active color
  const firstSelectedWire = wires.find(w => w.id === selectedWireIds[0]);
  const currentColor = firstSelectedWire?.color || 'blue';

  return (
    <div 
      className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur-md border border-border shadow-2xl rounded-full px-4 py-2 flex items-center gap-3 z-50 pointer-events-auto transition-all"
      onPointerDown={(e) => e.stopPropagation()} // Prevent canvas from interpreting clicks
      onMouseDown={(e) => e.stopPropagation()}
    >
      <span className="text-xs font-medium text-text-secondary uppercase tracking-wider mr-2">Wire Color</span>
      {COLORS.map(c => (
        <button
          key={c.value}
          onClick={(e) => {
             e.stopPropagation();
             selectedWireIds.forEach(id => updateWireColor(id, c.value));
          }}
          className={`w-6 h-6 rounded-full shadow-inner border transition-all duration-200 hover:scale-110 ${
            currentColor === c.value ? 'ring-2 ring-primary ring-offset-2 ring-offset-[#252525] border-transparent scale-110' : 'border-black/20'
          }`}
          style={{ backgroundColor: c.hex }}
          title={c.value.charAt(0).toUpperCase() + c.value.slice(1)}
        />
      ))}
    </div>
  );
};
