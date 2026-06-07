import { useState } from 'react';
import { Terminal, AlertCircle } from 'lucide-react';
import { SerialMonitor } from './SerialMonitor';
import { ProblemsPanel } from './ProblemsPanel';
import { useEditorStore } from '../../store/editorStore';
import { useSimulationStore } from '../../store/simulationStore';

type Tab = 'serial' | 'problems';

export function BottomPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('serial');

  const compilationErrors = useEditorStore(state => state.compilationErrors);
  const circuitErrors = useSimulationStore(state => state.circuitErrors);
  
  const errorCount = compilationErrors.length + circuitErrors.length;

  return (
    <div className="h-full flex flex-col bg-surface border-t border-border">
      {/* Tabs Header */}
      <div className="flex items-center border-b border-border bg-[#1E1E1E]">
        <button
          onClick={() => setActiveTab('problems')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'problems'
              ? 'border-primary text-primary bg-[#1A1B26]'
              : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-white/5'
          }`}
        >
          <AlertCircle size={15} />
          Problems
          {errorCount > 0 && (
            <span className="ml-1 bg-red-500/20 text-red-400 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {errorCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('serial')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'serial'
              ? 'border-primary text-primary bg-[#1A1B26]'
              : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-white/5'
          }`}
        >
          <Terminal size={15} />
          Serial Monitor
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden relative bg-[#1A1B26]">
        {activeTab === 'problems' && <ProblemsPanel />}
        {/* We keep SerialMonitor rendered but hidden to not lose its state/scroll */}
        <div className={`absolute inset-0 ${activeTab === 'serial' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          <SerialMonitor />
        </div>
      </div>
    </div>
  );
}
