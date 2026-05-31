import { v4 as uuidv4 } from 'uuid';
import {
  CircuitComponent,
  ComponentType,
  Point,
  Pin,
  PinType,
  PinDirection
} from '../types/components';

export function createComponent(type: ComponentType, position: Point): CircuitComponent {
  const id = uuidv4();
  let pins: Record<string, Pin> = {};
  let properties: Record<string, any> = {};

  const createPin = (pinId: string, label: string, pType: PinType, direction: PinDirection, pos: Point): Pin => ({
    id: pinId,
    label,
    type: pType,
    direction,
    position: pos,
    connectedWireIds: [],
    voltage: 0
  });

  switch (type) {
    case 'ARDUINO_UNO': {
      // 32 exact pins based on user coordinates for 200x140 board
      
      const createPinVoltage = (pinId: string, label: string, pType: PinType, direction: PinDirection, pos: Point, voltage = 0): Pin => ({
        id: pinId,
        label,
        type: pType,
        direction,
        position: pos,
        connectedWireIds: [],
        voltage
      });

      // Top Left (y = 2)
      pins['AREF'] = createPinVoltage('AREF', 'AREF', 'analog', 'input', { x: 42, y: 2 });
      pins['GND_TOP'] = createPinVoltage('GND_TOP', 'GND', 'ground', 'output', { x: 50, y: 2 });
      pins['D13'] = createPinVoltage('D13', '13', 'digital', 'bidirectional', { x: 58, y: 2 });
      pins['D12'] = createPinVoltage('D12', '12', 'digital', 'bidirectional', { x: 66, y: 2 });
      pins['D11'] = createPinVoltage('D11', '~11', 'PWM', 'bidirectional', { x: 74, y: 2 });
      pins['D10'] = createPinVoltage('D10', '~10', 'PWM', 'bidirectional', { x: 82, y: 2 });
      pins['D9'] = createPinVoltage('D9', '~9', 'PWM', 'bidirectional', { x: 90, y: 2 });
      pins['D8'] = createPinVoltage('D8', '8', 'digital', 'bidirectional', { x: 98, y: 2 });
      pins['D7'] = createPinVoltage('D7', '7', 'digital', 'bidirectional', { x: 106, y: 2 });
      pins['D6'] = createPinVoltage('D6', '~6', 'PWM', 'bidirectional', { x: 114, y: 2 });

      // Top Right (y = 2)
      pins['D5'] = createPinVoltage('D5', '~5', 'PWM', 'bidirectional', { x: 128, y: 2 });
      pins['D4'] = createPinVoltage('D4', '4', 'digital', 'bidirectional', { x: 136, y: 2 });
      pins['D3'] = createPinVoltage('D3', '~3', 'PWM', 'bidirectional', { x: 144, y: 2 });
      pins['D2'] = createPinVoltage('D2', '2', 'digital', 'bidirectional', { x: 152, y: 2 });
      pins['TX'] = createPinVoltage('TX', 'TX1', 'digital', 'bidirectional', { x: 160, y: 2 });
      pins['RX'] = createPinVoltage('RX', 'RX0', 'digital', 'bidirectional', { x: 168, y: 2 });
      pins['SDA'] = createPinVoltage('SDA', 'SDA', 'I2C_SDA', 'bidirectional', { x: 176, y: 2 });
      pins['SCL'] = createPinVoltage('SCL', 'SCL', 'I2C_SCL', 'bidirectional', { x: 184, y: 2 });

      // Extra ICSP to reach 32 pins
      pins['ICSP_RESET'] = createPinVoltage('ICSP_RESET', 'RST', 'digital', 'input', { x: 196, y: 2 });

      // Bottom Power (y = 138)
      pins['IOREF'] = createPinVoltage('IOREF', 'IOREF', 'power', 'output', { x: 42, y: 138 });
      pins['RESET'] = createPinVoltage('RESET', 'RESET', 'digital', 'input', { x: 50, y: 138 });
      pins['3V3'] = createPinVoltage('3V3', '3.3V', 'power', 'output', { x: 58, y: 138 }, 3.3);
      pins['5V'] = createPinVoltage('5V', '5V', 'power', 'output', { x: 66, y: 138 }, 5);
      pins['GND_1'] = createPinVoltage('GND_1', 'GND', 'ground', 'output', { x: 74, y: 138 });
      pins['GND_2'] = createPinVoltage('GND_2', 'GND', 'ground', 'output', { x: 82, y: 138 });
      pins['VIN'] = createPinVoltage('VIN', 'VIN', 'power', 'input', { x: 90, y: 138 });

      // Bottom Analog (y = 138)
      pins['A0'] = createPinVoltage('A0', 'A0', 'analog', 'input', { x: 110, y: 138 });
      pins['A1'] = createPinVoltage('A1', 'A1', 'analog', 'input', { x: 118, y: 138 });
      pins['A2'] = createPinVoltage('A2', 'A2', 'analog', 'input', { x: 126, y: 138 });
      pins['A3'] = createPinVoltage('A3', 'A3', 'analog', 'input', { x: 134, y: 138 });
      pins['A4'] = createPinVoltage('A4', 'A4', 'I2C_SDA', 'input', { x: 142, y: 138 });
      pins['A5'] = createPinVoltage('A5', 'A5', 'I2C_SCL', 'input', { x: 150, y: 138 });

      break;
    }

    case 'LED': {
      pins['ANODE'] = createPin('ANODE', '+', 'digital', 'bidirectional', { x: 10, y: 40 });
      pins['CATHODE'] = createPin('CATHODE', '-', 'digital', 'bidirectional', { x: 30, y: 40 });
      properties = { color: 'RED', forwardVoltage: 2.0 };
      break;
    }

    case 'RESISTOR': {
      pins['PIN_1'] = createPin('PIN_1', '1', 'digital', 'bidirectional', { x: 0, y: 10 });
      pins['PIN_2'] = createPin('PIN_2', '2', 'digital', 'bidirectional', { x: 60, y: 10 });
      properties = { resistance: 220, tolerance: 0.05, wattage: 0.25 };
      break;
    }

    case 'PUSH_BUTTON': {
      pins['PIN_IN'] = createPin('PIN_IN', 'IN', 'digital', 'bidirectional', { x: 0, y: 20 });
      pins['PIN_OUT'] = createPin('PIN_OUT', 'OUT', 'digital', 'bidirectional', { x: 40, y: 20 });
      properties = { pullup: false };
      break;
    }

    case 'POTENTIOMETER': {
      pins['VCC_PIN'] = createPin('VCC_PIN', 'VCC', 'power', 'input', { x: 10, y: 40 });
      pins['WIPER'] = createPin('WIPER', 'OUT', 'analog', 'output', { x: 25, y: 40 });
      pins['GND_PIN'] = createPin('GND_PIN', 'GND', 'ground', 'input', { x: 40, y: 40 });
      properties = { value: 512, resistance: 10000 };
      break;
    }

    case 'SERVO_MOTOR': {
      pins['SIGNAL'] = createPin('SIGNAL', 'SIG', 'PWM', 'input', { x: 10, y: 50 });
      pins['VCC'] = createPin('VCC', 'VCC', 'power', 'input', { x: 25, y: 50 });
      pins['GND'] = createPin('GND', 'GND', 'ground', 'input', { x: 40, y: 50 });
      properties = { minPulse: 544, maxPulse: 2400 };
      break;
    }

    case 'BUZZER': {
      pins['POSITIVE'] = createPin('POSITIVE', '+', 'digital', 'input', { x: 10, y: 40 });
      pins['NEGATIVE'] = createPin('NEGATIVE', '-', 'ground', 'input', { x: 30, y: 40 });
      properties = { frequency: 440, passive: false };
      break;
    }

    case 'LCD_16X2': {
      const spacing = 12;
      const startX = 10;
      const y = 0; // top

      const lcdPins = [
        { id: 'VSS', label: 'VSS', type: 'ground' as PinType, dir: 'input' as PinDirection },
        { id: 'VDD', label: 'VDD', type: 'power' as PinType, dir: 'input' as PinDirection },
        { id: 'V0', label: 'V0', type: 'analog' as PinType, dir: 'input' as PinDirection },
        { id: 'RS', label: 'RS', type: 'digital' as PinType, dir: 'output' as PinDirection },
        { id: 'RW', label: 'RW', type: 'digital' as PinType, dir: 'output' as PinDirection },
        { id: 'E', label: 'E', type: 'digital' as PinType, dir: 'output' as PinDirection },
        { id: 'D4', label: 'D4', type: 'digital' as PinType, dir: 'output' as PinDirection },
        { id: 'D5', label: 'D5', type: 'digital' as PinType, dir: 'output' as PinDirection },
        { id: 'D6', label: 'D6', type: 'digital' as PinType, dir: 'output' as PinDirection },
        { id: 'D7', label: 'D7', type: 'digital' as PinType, dir: 'output' as PinDirection },
        { id: 'A', label: 'A', type: 'power' as PinType, dir: 'input' as PinDirection },
        { id: 'K', label: 'K', type: 'ground' as PinType, dir: 'input' as PinDirection },
      ];

      lcdPins.forEach((p, idx) => {
        pins[p.id] = createPin(p.id, p.label, p.type, p.dir, { x: startX + idx * spacing, y });
      });
      properties = { columns: 16, rows: 2 };
      break;
    }

    case 'ULTRASONIC_SENSOR': {
      pins['VCC'] = createPin('VCC', 'VCC', 'power', 'input', { x: 10, y: 40 });
      pins['TRIG'] = createPin('TRIG', 'TRIG', 'digital', 'output', { x: 25, y: 40 });
      pins['ECHO'] = createPin('ECHO', 'ECHO', 'digital', 'input', { x: 40, y: 40 });
      pins['GND'] = createPin('GND', 'GND', 'ground', 'input', { x: 55, y: 40 });
      properties = { maxRangeCm: 400 };
      break;
    }

    case 'TEMPERATURE_SENSOR': {
      pins['VCC'] = createPin('VCC', 'VCC', 'power', 'input', { x: 10, y: 40 });
      pins['DATA'] = createPin('DATA', 'DAT', 'digital', 'bidirectional', { x: 25, y: 40 });
      pins['GND'] = createPin('GND', 'GND', 'ground', 'input', { x: 40, y: 40 });
      properties = { type: 'DHT11' };
      break;
    }

    case 'RELAY': {
      pins['VCC'] = createPin('VCC', 'VCC', 'power', 'input', { x: 0, y: 10 });
      pins['GND'] = createPin('GND', 'GND', 'ground', 'input', { x: 0, y: 30 });
      pins['IN'] = createPin('IN', 'IN', 'digital', 'input', { x: 0, y: 50 });

      pins['NO'] = createPin('NO', 'NO', 'digital', 'bidirectional', { x: 60, y: 10 });
      pins['NC'] = createPin('NC', 'NC', 'digital', 'bidirectional', { x: 60, y: 50 });
      pins['COM'] = createPin('COM', 'COM', 'digital', 'bidirectional', { x: 60, y: 30 });
      properties = { triggerVoltage: 5 };
      break;
    }

    case 'BREADBOARD': {
      pins['TOP_POS'] = createPin('TOP_POS', '+', 'power', 'bidirectional', { x: 10, y: 0 });
      pins['TOP_NEG'] = createPin('TOP_NEG', '-', 'ground', 'bidirectional', { x: 10, y: 15 });
      pins['BOTTOM_POS'] = createPin('BOTTOM_POS', '+', 'power', 'bidirectional', { x: 10, y: 105 });
      pins['BOTTOM_NEG'] = createPin('BOTTOM_NEG', '-', 'ground', 'bidirectional', { x: 10, y: 120 });
      properties = { rows: 10, columns: 30 };
      break;
    }

    default:
      throw new Error(`Unknown component type: ${type}`);
  }

  return {
    id,
    type,
    position,
    rotation: 0,
    pins,
    properties,
    zIndex: 0
  };
}

// @ts-ignore - temporary test exposure, remove after testing
if (typeof window !== 'undefined') (window as any).testFactory = createComponent;