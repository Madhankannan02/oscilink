# Arduino Simulator

A full-stack monorepo for a browser-based Arduino electronics simulator. This project aims to provide a robust, interactive environment for designing circuits and writing code for Arduino microcontrollers directly in the browser.

## Features Implemented So Far

### 1. Interactive Infinite Canvas
- **Engine**: Built with React-Konva for high-performance 2D rendering.
- **Pan & Zoom**: Smooth panning (middle-click or spacebar drag) and mouse-wheel zooming that centers on the cursor pointer. Includes bounds constraints (0.1x to 5.0x scale).
- **Dynamic Dot Grid**: An infinite background grid that calculates visible bounds to dynamically render world-coordinate dots optimally without lagging the browser.
- **Floating Controls**: Dedicated UI overlay for zooming in/out, resetting to 100%, and an auto-calculating **"Fit to Screen"** feature to focus on all active components.

### 2. State Management Architecture
Centralized application state using Zustand + Immer:
- **`workspaceStore`**: The central nervous system for the canvas. Manages the active viewport, placed components, wiring, selection states, history (undo/redo), and handles graph serialization for the simulation engine.
- **`simulationStore`**: Manages the localized state of individual components (e.g., LED brightness, Servo angles) alongside global circuit errors and the Arduino serial output.
- **`editorStore`**: Tracks the active C++ code, compilation results, hex binaries, and compiler diagnostics.

### 3. Exhaustive Type System
A strictly typed foundation mapping the physical characteristics of microcontrollers and circuits:
- **`types/components.ts`**: Types for component definitions, custom pins (PWM, Analog, Digital, I2C, SPI), wires, point grids, and physical bounding boxes.
- **`types/simulation.ts`**: Types for the active engine state, compilation results, component sub-states, and serialized mathematical graph nodes/edges representing the circuit topology.

### 4. Layout & UI Structure
- A responsive, non-scrolling, three-panel Flexbox layout tailored for complex IDEs.
- Custom dark-theme Tailwind configuration styled perfectly for deep focus.

### 5. Component Factory System
A highly rigid factory architecture (`componentFactory.ts`) ensuring flawless initialization of physical circuit components onto the canvas:
- Dynamically generates fully formed `CircuitComponent` objects with standardized default properties and unique UUIDs.
- Exhaustive pin layouts built directly into the factory (spanning the Arduino Uno's 200x140 boundary constraints, LCD 16x2 grid arrays, Breadboard rails, and standard 2-pin passives).
- Utilizes strict `SCREAMING_SNAKE_CASE` constants tightly bound to the TypeScript union types to guarantee instantiation reliability and block invalid component requests.

## Tech Stack
### Frontend (`packages/frontend`)
- React 18 & Vite
- TypeScript
- Tailwind CSS v3
- Zustand (w/ Immer & Devtools)
- React-Konva
- Monaco Editor (Prepared)
- Lucide React (Icons)

### Backend (`packages/backend`)
- Node.js & Express
- TypeScript
- CORS, Helmet, Express Rate Limit

## Setup Instructions

1. **Install dependencies:**
   This project relies on `pnpm` workspaces. Ensure pnpm is installed, then run:
   ```bash
   pnpm install
   ```

2. **Start Development Servers:**
   The root package.json utilizes parallel execution to run both frontend and backend concurrently.
   ```bash
   pnpm run dev
   ```
   - **Frontend App**: [http://localhost:5173/](http://localhost:5173/)
   - **Backend API**: [http://localhost:3001/](http://localhost:3001/)
