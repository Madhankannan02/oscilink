import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { CompilationError } from '../types/simulation';

const DEFAULT_CODE = `void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}`;

interface EditorState {
  code: string;
  compiledHex: string | null;
  compilationErrors: CompilationError[];
  compilationWarnings: CompilationError[];
  isCompiling: boolean;
  lastCompileTime: number | null;
}

interface EditorActions {
  setCode: (code: string) => void;
  setCompiledHex: (hex: string | null) => void;
  setCompilationErrors: (errors: CompilationError[]) => void;
  setCompilationWarnings: (warnings: CompilationError[]) => void;
  setIsCompiling: (isCompiling: boolean) => void;
  setLastCompileTime: (time: number | null) => void;
  clearCompilationResults: () => void;
}

type EditorStore = EditorState & EditorActions;

export const useEditorStore = create<EditorStore>()(
  devtools(
    immer((set) => ({
      code: DEFAULT_CODE,
      compiledHex: null,
      compilationErrors: [],
      compilationWarnings: [],
      isCompiling: false,
      lastCompileTime: null,

      setCode: (code) => set((state) => { state.code = code; }),
      setCompiledHex: (hex) => set((state) => { state.compiledHex = hex; }),
      setCompilationErrors: (errors) => set((state) => { state.compilationErrors = errors; }),
      setCompilationWarnings: (warnings) => set((state) => { state.compilationWarnings = warnings; }),
      setIsCompiling: (isCompiling) => set((state) => { state.isCompiling = isCompiling; }),
      setLastCompileTime: (time) => set((state) => { state.lastCompileTime = time; }),
      
      clearCompilationResults: () => set((state) => {
        state.compiledHex = null;
        state.compilationErrors = [];
        state.compilationWarnings = [];
      })
    })),
    { name: 'editor-store', enabled: (import.meta as any).env ? (import.meta as any).env.DEV : true }
  )
);

// --- TEMPORARY DEBUG CODE ---
if (typeof window !== 'undefined') {
  (window as any).__editorStore = useEditorStore;
}
// -----------------------------
