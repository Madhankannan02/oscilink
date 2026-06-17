import { SavedProject } from '../utils/projectSerializer';

function createBlinkProject(): SavedProject {
  return ({
  "version": "1.0",
  "name": "led_blinking_project",
  "savedAt": "2026-06-17T11:14:40.839Z",
  "description": "",
  "components": [
    {
      "id": "acd5227d-06e7-46ce-b8db-a91a48a6f337",
      "type": "ARDUINO_UNO",
      "position": {
        "x": 300,
        "y": 300
      },
      "rotation": 0,
      "pins": {
        "SCL": {
          "id": "SCL",
          "label": "SCL",
          "type": "I2C_SCL",
          "direction": "bidirectional",
          "position": {
            "x": 59.99999999999999,
            "y": 10.37037037037037
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "SDA": {
          "id": "SDA",
          "label": "SDA",
          "type": "I2C_SDA",
          "direction": "bidirectional",
          "position": {
            "x": 64.9002849002849,
            "y": 10.37037037037037
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "AREF": {
          "id": "AREF",
          "label": "AREF",
          "type": "analog",
          "direction": "input",
          "position": {
            "x": 69.80056980056979,
            "y": 10.37037037037037
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "GND_TOP": {
          "id": "GND_TOP",
          "label": "GND",
          "type": "ground",
          "direction": "output",
          "position": {
            "x": 74.70085470085469,
            "y": 10.37037037037037
          },
          "connectedWireIds": [
            "ccf4e9fd-6579-47ab-b3e2-6a44a5e1c34a"
          ],
          "voltage": 0
        },
        "D13": {
          "id": "D13",
          "label": "13",
          "type": "digital",
          "direction": "bidirectional",
          "position": {
            "x": 79.6011396011396,
            "y": 10.37037037037037
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "D12": {
          "id": "D12",
          "label": "12",
          "type": "digital",
          "direction": "bidirectional",
          "position": {
            "x": 84.5014245014245,
            "y": 10.37037037037037
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "D11": {
          "id": "D11",
          "label": "~11",
          "type": "PWM",
          "direction": "bidirectional",
          "position": {
            "x": 89.40170940170938,
            "y": 10.37037037037037
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "D10": {
          "id": "D10",
          "label": "~10",
          "type": "PWM",
          "direction": "bidirectional",
          "position": {
            "x": 94.3019943019943,
            "y": 10.37037037037037
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "D9": {
          "id": "D9",
          "label": "~9",
          "type": "PWM",
          "direction": "bidirectional",
          "position": {
            "x": 99.2022792022792,
            "y": 10.37037037037037
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "D8": {
          "id": "D8",
          "label": "8",
          "type": "digital",
          "direction": "bidirectional",
          "position": {
            "x": 104.10256410256409,
            "y": 10.37037037037037
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "D7": {
          "id": "D7",
          "label": "7",
          "type": "digital",
          "direction": "bidirectional",
          "position": {
            "x": 111.02564102564102,
            "y": 10.37037037037037
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "D6": {
          "id": "D6",
          "label": "~6",
          "type": "PWM",
          "direction": "bidirectional",
          "position": {
            "x": 115.93406593406593,
            "y": 10.37037037037037
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "D5": {
          "id": "D5",
          "label": "~5",
          "type": "PWM",
          "direction": "bidirectional",
          "position": {
            "x": 120.84249084249083,
            "y": 10.37037037037037
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "D4": {
          "id": "D4",
          "label": "4",
          "type": "digital",
          "direction": "bidirectional",
          "position": {
            "x": 125.75091575091574,
            "y": 10.37037037037037
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "D3": {
          "id": "D3",
          "label": "~3",
          "type": "PWM",
          "direction": "bidirectional",
          "position": {
            "x": 130.65934065934064,
            "y": 10.37037037037037
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "D2": {
          "id": "D2",
          "label": "2",
          "type": "digital",
          "direction": "bidirectional",
          "position": {
            "x": 135.56776556776555,
            "y": 10.37037037037037
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "TX": {
          "id": "TX",
          "label": "TX→1",
          "type": "digital",
          "direction": "bidirectional",
          "position": {
            "x": 140.47619047619048,
            "y": 10.37037037037037
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "RX": {
          "id": "RX",
          "label": "RX←0",
          "type": "digital",
          "direction": "bidirectional",
          "position": {
            "x": 145.38461538461536,
            "y": 10.37037037037037
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "NC_POWER": {
          "id": "NC_POWER",
          "label": "",
          "type": "digital",
          "direction": "input",
          "position": {
            "x": 78.2051282051282,
            "y": 129.62962962962962
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "IOREF": {
          "id": "IOREF",
          "label": "IOREF",
          "type": "power",
          "direction": "output",
          "position": {
            "x": 83.11355311355311,
            "y": 129.62962962962962
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "RESET": {
          "id": "RESET",
          "label": "RESET",
          "type": "digital",
          "direction": "input",
          "position": {
            "x": 88.02197802197801,
            "y": 129.62962962962962
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "3V3": {
          "id": "3V3",
          "label": "3.3V",
          "type": "power",
          "direction": "output",
          "position": {
            "x": 92.93040293040292,
            "y": 129.62962962962962
          },
          "connectedWireIds": [],
          "voltage": 3.3
        },
        "5V": {
          "id": "5V",
          "label": "5V",
          "type": "power",
          "direction": "output",
          "position": {
            "x": 97.83882783882783,
            "y": 129.62962962962962
          },
          "connectedWireIds": [],
          "voltage": 5
        },
        "GND_1": {
          "id": "GND_1",
          "label": "GND",
          "type": "ground",
          "direction": "output",
          "position": {
            "x": 102.74725274725274,
            "y": 129.62962962962962
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "GND_2": {
          "id": "GND_2",
          "label": "GND",
          "type": "ground",
          "direction": "output",
          "position": {
            "x": 107.65567765567765,
            "y": 129.62962962962962
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "VIN": {
          "id": "VIN",
          "label": "Vin",
          "type": "power",
          "direction": "input",
          "position": {
            "x": 112.56410256410255,
            "y": 129.62962962962962
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "A0": {
          "id": "A0",
          "label": "A0",
          "type": "analog",
          "direction": "input",
          "position": {
            "x": 120.25641025641025,
            "y": 129.62962962962962
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "A1": {
          "id": "A1",
          "label": "A1",
          "type": "analog",
          "direction": "input",
          "position": {
            "x": 125.28205128205127,
            "y": 129.62962962962962
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "A2": {
          "id": "A2",
          "label": "A2",
          "type": "analog",
          "direction": "input",
          "position": {
            "x": 130.3076923076923,
            "y": 129.62962962962962
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "A3": {
          "id": "A3",
          "label": "A3",
          "type": "analog",
          "direction": "input",
          "position": {
            "x": 135.33333333333331,
            "y": 129.62962962962962
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "A4": {
          "id": "A4",
          "label": "A4",
          "type": "I2C_SDA",
          "direction": "input",
          "position": {
            "x": 140.35897435897434,
            "y": 129.62962962962962
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "A5": {
          "id": "A5",
          "label": "A5",
          "type": "I2C_SCL",
          "direction": "input",
          "position": {
            "x": 145.38461538461536,
            "y": 129.62962962962962
          },
          "connectedWireIds": [],
          "voltage": 0
        }
      },
      "properties": {},
      "zIndex": 0
    },
    {
      "id": "0922c532-8ead-491f-9e50-f9059b749371",
      "type": "LED",
      "position": {
        "x": 484.9560414766486,
        "y": 154.6461924410307
      },
      "rotation": 0,
      "pins": {
        "ANODE": {
          "id": "ANODE",
          "label": "+",
          "type": "digital",
          "direction": "bidirectional",
          "position": {
            "x": 10,
            "y": 40
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "CATHODE": {
          "id": "CATHODE",
          "label": "-",
          "type": "digital",
          "direction": "bidirectional",
          "position": {
            "x": 30,
            "y": 40
          },
          "connectedWireIds": [
            "ccf4e9fd-6579-47ab-b3e2-6a44a5e1c34a"
          ],
          "voltage": 0
        }
      },
      "properties": {
        "color": "RED",
        "forwardVoltage": 2
      },
      "zIndex": 0
    },
    {
      "id": "da7e4ae9-648c-48f3-97f8-59e2ce4ee060",
      "type": "RESISTOR",
      "position": {
        "x": 381.0304011493481,
        "y": 184.9809423744685
      },
      "rotation": 0,
      "pins": {
        "PIN_1": {
          "id": "PIN_1",
          "label": "1",
          "type": "digital",
          "direction": "bidirectional",
          "position": {
            "x": 0,
            "y": 10
          },
          "connectedWireIds": [],
          "voltage": 0
        },
        "PIN_2": {
          "id": "PIN_2",
          "label": "2",
          "type": "digital",
          "direction": "bidirectional",
          "position": {
            "x": 60,
            "y": 10
          },
          "connectedWireIds": [],
          "voltage": 0
        }
      },
      "properties": {
        "resistance": 220,
        "tolerance": 0.05,
        "wattage": 0.25
      },
      "zIndex": 0
    }
  ],
  "wires": [
    {
      "id": "b1583214-ee62-4d31-810d-f95e3b4312a8",
      "from": {
        "componentId": "acd5227d-06e7-46ce-b8db-a91a48a6f337",
        "pinId": "D13"
      },
      "to": {
        "componentId": "da7e4ae9-648c-48f3-97f8-59e2ce4ee060",
        "pinId": "PIN_1"
      },
      "points": [
        379.6011396011396,
        310.3703703703704,
        381.0304011493481,
        194.9809423744685
      ],
      "color": "red",
      "isSelected": false,
      "isError": false
    },
    {
      "id": "4157d4a8-47ec-4814-ac01-2137bb698c07",
      "from": {
        "componentId": "da7e4ae9-648c-48f3-97f8-59e2ce4ee060",
        "pinId": "PIN_2"
      },
      "to": {
        "componentId": "0922c532-8ead-491f-9e50-f9059b749371",
        "pinId": "ANODE"
      },
      "points": [
        441.0304011493481,
        194.9809423744685,
        494.9560414766486,
        194.6461924410307
      ],
      "color": "red",
      "isSelected": false,
      "isError": false
    },
    {
      "id": "ccf4e9fd-6579-47ab-b3e2-6a44a5e1c34a",
      "from": {
        "componentId": "0922c532-8ead-491f-9e50-f9059b749371",
        "pinId": "CATHODE"
      },
      "to": {
        "componentId": "acd5227d-06e7-46ce-b8db-a91a48a6f337",
        "pinId": "GND_TOP"
      },
      "points": [
        514.9560414766486,
        194.6461924410307,
        374.7008547008547,
        310.3703703703704
      ],
      "color": "red",
      "isSelected": false,
      "isError": false
    }
  ],
  "code": "void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}",
  "viewport": {
    "scale": 2.1435888100000016,
    "x": -363.4550544845463,
    "y": -233.93581257581792
  },
  "thumbnail": "data:image/jpeg;base64,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",
  "tags": []
}) as unknown as SavedProject;
}



export const exampleProjects: SavedProject[] = [
  createBlinkProject()
];
