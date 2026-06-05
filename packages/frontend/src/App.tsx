import { Canvas } from './components/canvas/Canvas';
import { ComponentPalette } from './components/ui/ComponentPalette';
import { WireColorPicker } from './components/ui/WireColorPicker';
import { UndoRedoButtons } from './components/ui/UndoRedoButtons';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { CodeEditor } from './components/editor/CodeEditor';
import { Toaster } from 'react-hot-toast';

function App() {
  useKeyboardShortcuts();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
      {/* Top Toolbar */}
      <header className="h-[52px] min-h-[52px] bg-surface border-b border-border flex items-center px-4 gap-4">
        <h1 className="text-lg font-semibold text-primary">Oscilink</h1>
        <div className="h-6 w-px bg-border mx-2" />
        <UndoRedoButtons />
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <ComponentPalette />

        {/* Center Panel (Canvas/Editor) */}
        <main className="flex-1 bg-[#FFFAFA] relative flex flex-col">
          <Canvas />
          <WireColorPicker />
        </main>

        {/* Right Panel (Code Editor + Properties/Inspector) */}
        <aside className="w-[450px] min-w-[360px] bg-surface border-l border-border flex flex-col">
          {/* Top Portion: Code Editor */}
          <div className="flex-1 flex flex-col min-h-[300px]">
            <CodeEditor />
          </div>
          
          {/* Bottom Portion: Properties */}
          <div className="h-[250px] min-h-[200px] border-t border-border p-4 flex flex-col">
            <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">Properties</h2>
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded">
              <span className="text-text-secondary">Inspector Panel</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
