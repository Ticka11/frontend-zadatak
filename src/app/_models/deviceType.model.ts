import { DeviceTypeProperty } from './deviceTypeProperty.model';

export class DeviceType {
    id: number;
    name: string;
    parentDeviceType: string;
    deviceTypeProperties: DeviceTypeProperty[];
    childrenDeviceType: DeviceType[];
    parentTypeProperties: DeviceTypeProperty[];
    parentId: number;

    constructor(deviceType?: DeviceType) {
        this.id = deviceType ? deviceType.id : null;
        this.name = deviceType ? deviceType.name : '';
        this.parentDeviceType = deviceType ? deviceType.parentDeviceType : '';
        this.deviceTypeProperties = deviceType ? deviceType.deviceTypeProperties : null;
        this.childrenDeviceType = deviceType ? deviceType.childrenDeviceType : null;
        this.parentTypeProperties = deviceType ? deviceType.parentTypeProperties : null;
        this.parentId = deviceType ? deviceType.parentId : null;
    }

}