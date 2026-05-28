export type SimulationStatus = 'IDLE' | 'COMPILING' | 'COMPILED' | 'RUNNING' | 'PAUSED' | 'ERROR';

export interface LEDState {
  isOn: boolean;
  brightness: number; // 0 to 1
  currentMa: number;
}

export interface ServoState {
  angle: number; // 0 to 180
  targetAngle: number;
}

export interface LCDState {
  rows: [string, string];
  backlight: boolean;
  cursorRow: number;
  cursorCol: number;
}

export interface BuzzerState {
  isActive: boolean;
  frequency: number;
}

export interface ButtonState {
  isPressed: boolean;
}

export interface PotentiometerState {
  value: number; // 0 to 1023
  voltage: number;
}

export type ComponentState = 
  | LEDState 
  | ServoState 
  | LCDState 
  | BuzzerState 
  | ButtonState 
  | PotentiometerState 
  | Record<string, any>;

export interface SerialLine {
  id: string;
  text: string;
  timestamp: number;
  type: 'output' | 'input' | 'system';
}

export interface CompilationError {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning';
  hint?: string;
}

export interface CompileResult {
  success: boolean;
  hex?: string;
  errors?: CompilationError[];
  warnings?: CompilationError[];
}

export interface CircuitError {
  id: string;
  type: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  affectedComponentIds: string[];
  affectedWireIds?: string[];
  hint?: string;
}

export interface GraphNode {
  id: string;
  componentId: string;
  pinId: string;
  voltage: number;
}

export interface GraphEdge {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  resistance: number;
}

export interface SerializedCircuitGraph {
  nodes: Record<string, GraphNode>;
  edges: Record<string, GraphEdge>;
}
