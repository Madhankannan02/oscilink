export interface I2CDevice {
  read?(length: number): Uint8Array;
  write?(data: Uint8Array): void;
}

export class I2CBus {
  private devices = new Map<number, I2CDevice>();

  registerDevice(address: number, device: I2CDevice) {
    this.devices.set(address, device);
  }

  write(address: number, data: Uint8Array) {
    const device = this.devices.get(address);
    if (device && device.write) {
      device.write(data);
    }
  }

  read(address: number, length: number): Uint8Array {
    const device = this.devices.get(address);
    if (device && device.read) {
      return device.read(length);
    }
    return new Uint8Array(length);
  }
}
