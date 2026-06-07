import { useEditorStore } from '../../store/editorStore';
import { useSimulationStore } from '../../store/simulationStore';
import { AlertCircle, AlertTriangle, Info, Terminal } from 'lucide-react';

export function ProblemsPanel() {
  const compilationErrors = useEditorStore(state => state.compilationErrors);
  const compilationWarnings = useEditorStore(state => state.compilationWarnings);
  const circuitErrors = useSimulationStore(state => state.circuitErrors);
  const runtimeWarnings = useSimulationStore(state => state.runtimeWarnings);

  const hasProblems = 
    compilationErrors.length > 0 || 
    compilationWarnings.length > 0 || 
    circuitErrors.length > 0 || 
    runtimeWarnings.length > 0;

  if (!hasProblems) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#1A1B26] text-text-secondary">
        <p className="text-sm">No problems have been detected in the workspace.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#1A1B26] overflow-y-auto">
      <div className="flex flex-col text-sm">
        {/* Compilation Errors */}
        {compilationErrors.map((err, i) => (
          <div key={`ce-${i}`} className="flex items-start gap-3 p-3 border-b border-white/5 hover:bg-white/5 transition-colors">
            <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-red-400 font-medium">Compilation Error</span>
              <span className="text-gray-300 font-mono text-xs whitespace-pre-wrap">{err.message}</span>
              {err.hint && <span className="text-blue-400 text-xs mt-1">Hint: {err.hint}</span>}
              <span className="text-gray-500 text-xs mt-1">Line {err.line}, Column {err.column}</span>
            </div>
          </div>
        ))}

        {/* Circuit Errors */}
        {circuitErrors.map((err, i) => (
          <div key={`ce-circ-${i}`} className="flex items-start gap-3 p-3 border-b border-white/5 hover:bg-white/5 transition-colors">
            <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-red-400 font-medium">Circuit Error ({err.type})</span>
              <span className="text-gray-300 text-xs">{err.message}</span>
              {err.hint && <span className="text-blue-400 text-xs mt-1">Hint: {err.hint}</span>}
            </div>
          </div>
        ))}

        {/* Compilation Warnings */}
        {compilationWarnings.map((warn, i) => (
          <div key={`cw-${i}`} className="flex items-start gap-3 p-3 border-b border-white/5 hover:bg-white/5 transition-colors">
            <AlertTriangle size={16} className="text-yellow-500 mt-0.5 shrink-0" />
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-yellow-400 font-medium">Compilation Warning</span>
              <span className="text-gray-300 font-mono text-xs whitespace-pre-wrap">{warn.message}</span>
              <span className="text-gray-500 text-xs mt-1">Line {warn.line}, Column {warn.column}</span>
            </div>
          </div>
        ))}

        {/* Runtime Warnings */}
        {runtimeWarnings.map((warn, i) => (
          <div key={`rw-${i}`} className="flex items-start gap-3 p-3 border-b border-white/5 hover:bg-white/5 transition-colors">
            <AlertTriangle size={16} className="text-yellow-500 mt-0.5 shrink-0" />
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-yellow-400 font-medium">Runtime Warning</span>
              <span className="text-gray-300 text-xs">{warn}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
