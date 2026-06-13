import { PanelLeft, PanelRight, Play, Loader2, Check, Square } from 'lucide-react';
import { UndoRedoButtons } from './UndoRedoButtons';
import { useCompiler } from '../../hooks/useCompiler';
import { useSimulation } from '../../hooks/useSimulation';
import { useEditorStore } from '../../store/editorStore';
import { useSimulationStore } from '../../store/simulationStore';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { CodeEditorRef } from '../editor/CodeEditor';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface ToolbarProps {
  leftOpen: boolean;
  setLeftOpen: (open: boolean) => void;
  rightOpen: boolean;
  setRightOpen: (open: boolean) => void;
  errorPanelOpen: boolean;
  setErrorPanelOpen: (open: boolean) => void;
  editorRef: React.RefObject<CodeEditorRef>;
}

export function Toolbar({ leftOpen, setLeftOpen, rightOpen, setRightOpen, errorPanelOpen, setErrorPanelOpen, editorRef }: ToolbarProps) {
  const { compile } = useCompiler();
  const simulation = useSimulation(); // Call this to ensure worker initializes
  const isCompiling = useEditorStore(state => state.isCompiling);
  const compilationErrors = useEditorStore(state => state.compilationErrors);
  const compiledHex = useEditorStore(state => state.compiledHex);
  const status = useSimulationStore(state => state.status);
  const circuitErrors = useSimulationStore(state => state.circuitErrors);
  const runtimeWarnings = useSimulationStore(state => state.runtimeWarnings);

  const errorCount = compilationErrors.length;
  const showCheckmark = status === 'COMPILED' && errorCount === 0;

  // Calculate total diagnostics
  const totalErrors = compilationErrors.length + circuitErrors.filter(e => e.severity === 'error').length;
  const totalWarnings = runtimeWarnings.length + circuitErrors.filter(e => e.severity === 'warning').length;
  const hasDiagnostics = totalErrors > 0 || totalWarnings > 0 || circuitErrors.length > 0;

  const handleRun = () => {
    if (!compiledHex) {
      toast.error('Please compile the code first');
      return;
    }
    const serializedGraph = useWorkspaceStore.getState().buildCircuitGraph();
    simulation.initialize(compiledHex, serializedGraph);
    simulation.start();
  };

  return (
    <header className="h-[52px] min-h-[52px] bg-surface border-b border-border flex items-center px-4 gap-4">
      <h1 className="text-lg font-semibold text-primary">Oscilink</h1>
      <div className="h-6 w-px bg-border mx-2" />
      <UndoRedoButtons />
      
      <div className="h-6 w-px bg-border mx-2" />

      {/* Compile Button */}
      <button
        onClick={() => compile(editorRef)}
        disabled={isCompiling || status === 'RUNNING'}
        className="relative flex items-center gap-2 px-4 py-1.5 rounded bg-[#059669] hover:bg-[#047857] disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
      >
        {isCompiling ? (
          <Loader2 size={16} className="animate-spin" />
        ) : showCheckmark ? (
          <Check size={16} />
        ) : (
          <Play size={16} fill="currentColor" />
        )}
        <span className="font-medium text-sm">Compile</span>
        
        {/* Error count badge */}
        {errorCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {errorCount}
          </span>
        )}
      </button>

      {/* Run/Stop Buttons */}
      {status === 'RUNNING' ? (
        <button
          onClick={() => simulation.stop()}
          className="relative flex items-center gap-2 px-4 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white transition-colors"
        >
          <Square size={14} fill="currentColor" />
          <span className="font-medium text-sm">Stop</span>
        </button>
      ) : (
        <button
          onClick={handleRun}
          disabled={status !== 'COMPILED' || isCompiling}
          className="relative flex items-center gap-2 px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
        >
          <Play size={16} fill="currentColor" />
          <span className="font-medium text-sm">Run</span>
        </button>
      )}

      <div className="flex items-center ml-auto gap-2 text-text-secondary">
        {hasDiagnostics && (
          <button 
            onClick={() => setErrorPanelOpen(!errorPanelOpen)} 
            className={`relative p-1.5 mr-2 rounded transition-colors ${errorPanelOpen ? 'bg-surface-hover text-primary' : 'hover:bg-surface-hover'}`}
            title="Toggle Diagnostics Panel"
          >
            {totalErrors > 0 ? <AlertCircle size={18} className="text-red-500" /> : <AlertTriangle size={18} className="text-orange-500" />}
            
            <span className={`absolute -top-1.5 -right-1.5 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ${totalErrors > 0 ? 'bg-red-500' : 'bg-orange-500'}`}>
              {totalErrors > 0 ? totalErrors : totalWarnings > 0 ? totalWarnings : circuitErrors.length}
            </span>
          </button>
        )}

        <button 
          onClick={() => setLeftOpen(!leftOpen)} 
          className={`p-1.5 rounded transition-colors ${leftOpen ? 'bg-surface-hover text-primary' : 'hover:bg-surface-hover'}`}
          title="Toggle Left Panel"
        >
          <PanelLeft size={18} />
        </button>
        <button 
          onClick={() => setRightOpen(!rightOpen)} 
          className={`p-1.5 rounded transition-colors ${rightOpen ? 'bg-surface-hover text-primary' : 'hover:bg-surface-hover'}`}
          title="Toggle Right Panel"
        >
          <PanelRight size={18} />
        </button>
      </div>
    </header>
  );
}
