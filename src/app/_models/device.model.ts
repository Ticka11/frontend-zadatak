import { DevicePropertyValue } from './devicePropertyValue.model';

export class Device {
    id: number;
    name: string;
    price: number;
    deviceType: string;
    deviceTypeId: number;
    devicePropertyValues: DevicePropertyValue[];

    constructor(device?: Device) {
        this.id = device ? device.id : null;
        this.name = device ? device.name : '';
        this.price = device ? device.price : 0.00;
        this.devicePropertyValues = device ? device.devicePropertyValues : null;
        this.deviceType = device ? device.deviceType : '';
        this.deviceTypeId = device ? device.deviceTypeId : null;

    }

}
