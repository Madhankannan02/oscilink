import { useEditorStore } from '../store/editorStore';
import { useSimulationStore } from '../store/simulationStore';
import { enhanceError } from '../utils/errorEnhancer';
import { CodeEditorRef } from '../components/editor/CodeEditor';
import toast from 'react-hot-toast';

export function useCompiler() {
  const code = useEditorStore(state => state.code);
  const setIsCompiling = useEditorStore(state => state.setIsCompiling);
  const setCompiledHex = useEditorStore(state => state.setCompiledHex);
  const setCompilationWarnings = useEditorStore(state => state.setCompilationWarnings);
  const clearCompilationResults = useEditorStore(state => state.clearCompilationResults);
  const setCompilationErrors = useEditorStore(state => state.setCompilationErrors);
  const setLastCompileTime = useEditorStore(state => state.setLastCompileTime);
  
  const status = useSimulationStore(state => state.status);
  const setStatus = useSimulationStore(state => state.setStatus);
  const setCircuitErrors = useSimulationStore(state => state.setCircuitErrors);

  const compile = async (editorRef?: React.RefObject<CodeEditorRef>) => {
    // If simulation is running, stop it and wait
    if (status === 'RUNNING') {
      setStatus('COMPILED'); // Stopping simulation
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    setIsCompiling(true);
    setStatus('COMPILING');
    
    const toastId = toast.loading('Compiling...', { duration: Infinity });

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 65000);

      const response = await fetch('http://localhost:3001/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const result = await response.json();
      toast.dismiss(toastId);

      if (result.success) {
        setCompiledHex(result.hex || null);
        setCompilationWarnings(result.warnings || []);
        setCompilationErrors([]);
        
        setStatus('COMPILED');
        if (editorRef?.current) {
          editorRef.current.clearErrors();
        }

        if (result.warnings && result.warnings.length > 0) {
          toast(`Compiled with ${result.warnings.length} warnings`, { icon: '⚠️', style: { background: '#D97706', color: '#fff' } });
        } else {
          toast.success('Compiled successfully', { style: { background: '#059669', color: '#fff' } });
        }
        
        setCircuitErrors([]); // fresh start
      } else {
        const enhancedErrors = (result.errors || []).map(enhanceError);
        setCompilationErrors(enhancedErrors);
        setStatus('ERROR');
        
        if (editorRef?.current) {
          editorRef.current.displayCompilationErrors(enhancedErrors);
        }
        
        toast.error(`Compilation failed: ${enhancedErrors.length} errors`, { style: { background: '#DC2626', color: '#fff' } });
      }

    } catch (err: any) {
      toast.dismiss(toastId);
      if (err.name === 'AbortError') {
        toast.error('Compilation timed out. Server took too long.');
      } else {
        toast.error('Cannot reach server. Is the backend running?');
      }
      setStatus('IDLE');
    } finally {
      setIsCompiling(false);
      setLastCompileTime(Date.now());
    }
  };

  return { compile };
}
