export const SIMULATOR_URL = 'http://localhost:5173';

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'how-it-works', label: 'How It Works', href: '#how-it-works' },
  { id: 'components', label: 'Components', href: '#components' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
];

export interface StatItem {
  value: string;
  label: string;
}

export const STATS: StatItem[] = [
  { value: '12', label: 'Electronic Components' },
  { value: '100%', label: 'Browser Based' },
  { value: 'Free', label: 'No Credit Card' },
  { value: 'Real', label: 'AVR Code Execution' },
];

export interface ProblemItem {
  emoji: string;
  title: string;
  description: string;
}

export const PROBLEMS: ProblemItem[] = [
  {
    emoji: '🔥',
    title: 'Burnt Components',
    description: 'Wiring things incorrectly in real life means burnt LEDs and blown microcontrollers. Simulate first to avoid costly mistakes.',
  },
  {
    emoji: '🔌',
    title: 'Messy Wiring',
    description: 'Real breadboards get cluttered fast. Debugging a physical circuit with dozens of jumper wires is incredibly frustrating.',
  },
  {
    emoji: '💰',
    title: 'Expensive Hardware',
    description: 'Buying Arduino kits, sensors, and components adds up. Learn the fundamentals without spending a dime on physical hardware.',
  },
];

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export const FEATURES: FeatureItem[] = [
  {
    icon: 'Cpu',
    title: 'Real AVR Execution',
    description: 'Your C++ code is compiled and executed in the browser using an authentic AVR simulation engine.',
  },
  {
    icon: 'PenTool',
    title: 'Interactive Canvas',
    description: 'Drag, drop, rotate, and wire components naturally. Our interactive canvas feels just like a real breadboard.',
  },
  {
    icon: 'Code2',
    title: 'Built-in Code Editor',
    description: 'Write code with syntax highlighting, auto-completion, and real-time compilation error reporting.',
  },
  {
    icon: 'Terminal',
    title: 'Serial Monitor',
    description: 'Debug your code just like you would on a real Arduino with a fully functional two-way serial monitor.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Safe Experimentation',
    description: 'Short circuits and over-currents are caught by the simulator. Learn electronics without the risk of breaking things.',
  },
  {
    icon: 'Share2',
    title: 'Save & Share',
    description: 'Save your projects to the cloud and share them with a simple link. Perfect for classrooms and tutorials.',
  },
];

export interface HowItWorksStep {
  step: string;
  icon: string;
  title: string;
  description: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: '01',
    icon: 'PlusCircle',
    title: 'Add Components',
    description: 'Open the component palette and drag an Arduino, breadboard, and parts onto the canvas.',
  },
  {
    step: '02',
    icon: 'Link',
    title: 'Wire Them Up',
    description: 'Click and drag between pins to create connections. Choose different wire colors for clarity.',
  },
  {
    step: '03',
    icon: 'FileCode2',
    title: 'Write Your Code',
    description: 'Open the integrated editor and write your C++ code just like in the standard Arduino IDE.',
  },
  {
    step: '04',
    icon: 'PlayCircle',
    title: 'Run Simulation',
    description: 'Hit play to compile your code and watch your circuit come to life in real-time.',
  },
];

export interface ComponentItem {
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const COMPONENTS_LIST: ComponentItem[] = [
  { name: 'Arduino Uno', description: 'ATmega328P Microcontroller', icon: 'Cpu', color: '#1d70b8' },
  { name: 'LED', description: 'Light Emitting Diode', icon: 'Circle', color: '#ff2200' },
  { name: 'Resistor', description: 'Current limiting component', icon: 'Minus', color: '#d2a8ff' },
  { name: 'Push Button', description: 'Momentary switch', icon: 'CircleDot', color: '#8b949e' },
  { name: 'Potentiometer', description: 'Variable resistor', icon: 'Sliders', color: '#8b949e' },
  { name: 'Servo Motor', description: 'Precise rotation motor', icon: 'RotateCcw', color: '#8b949e' },
  { name: 'Buzzer', description: 'Piezoelectric speaker', icon: 'Volume2', color: '#8b949e' },
  { name: 'LCD 16x2', description: 'Character display screen', icon: 'Monitor', color: '#00979D' },
  { name: 'Ultrasonic', description: 'Distance sensor', icon: 'Radio', color: '#8b949e' },
  { name: 'DHT11', description: 'Temperature & humidity', icon: 'Thermometer', color: '#3b82f6' },
  { name: 'Relay', description: 'Electromechanical switch', icon: 'ToggleRight', color: '#8b949e' },
  { name: 'Breadboard', description: 'Prototyping base', icon: 'Grid3x3', color: '#d2b48c' },
];

export interface ComparisonFeature {
  feature: string;
  oscilink: boolean;
  tinkercad: boolean;
  wokwi: boolean | 'partial';
  hardware: boolean | 'na';
}

export const COMPARISON_FEATURES: ComparisonFeature[] = [
  { feature: 'Browser-based', oscilink: true, tinkercad: true, wokwi: true, hardware: false },
  { feature: 'Real AVR Code Execution', oscilink: true, tinkercad: true, wokwi: true, hardware: true },
  { feature: 'No Account Required', oscilink: true, tinkercad: false, wokwi: 'partial', hardware: 'na' },
  { feature: 'Modern Fast UI', oscilink: true, tinkercad: false, wokwi: 'partial', hardware: 'na' },
  { feature: 'Zero Setup Time', oscilink: true, tinkercad: true, wokwi: true, hardware: false },
  { feature: 'Cost', oscilink: true, tinkercad: true, wokwi: 'partial', hardware: false },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initial: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Oscilink is exactly what I needed for my introductory electronics class. Students can immediately start coding and seeing results without wrestling with drivers or burnt LEDs.",
    name: "Sarah Jenkins",
    role: "High School STEM Teacher",
    initial: "S",
  },
  {
    quote: "I use this to quickly prototype logic before writing the real firmware. The fact that it compiles standard Arduino code in the browser is just incredible engineering.",
    name: "David Chen",
    role: "Embedded Systems Engineer",
    initial: "D",
  },
  {
    quote: "I've tried Tinkercad and Wokwi, but Oscilink just feels so much faster and more modern. The UI is clean, and the components snap together perfectly.",
    name: "Alex Rivera",
    role: "Hobbyist Maker",
    initial: "A",
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Is Oscilink really free?',
    answer: 'Yes! The core simulation experience is 100% free. We believe that learning electronics should be accessible to everyone, regardless of their budget for physical hardware.',
  },
  {
    question: 'Do I need to install anything?',
    answer: 'No installation required. Everything runs entirely in your web browser using WebAssembly. It works on Windows, macOS, Linux, and ChromeOS.',
  },
  {
    question: 'How accurate is the simulation?',
    answer: 'Very accurate. We use the open-source avr8js engine which executes compiled AVR machine code instruction-by-instruction, just like a real ATmega328P chip.',
  },
  {
    question: 'Can I import my existing Arduino sketches (.ino)?',
    answer: 'Yes, you can copy and paste standard C++ Arduino code directly into the editor. Most standard Arduino core functions (digitalWrite, analogRead, delay, etc.) are fully supported.',
  },
  {
    question: 'Will more components be added in the future?',
    answer: 'Absolutely. We are actively developing new components including more sensors, displays, and motors. Check our roadmap for upcoming releases.',
  },
];
