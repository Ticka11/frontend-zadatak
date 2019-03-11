export class DeviceTypeProperty {
    id: number;
    name: string;
    deviceTypeId: number;

    constructor(deviceTypeProperty?: DeviceTypeProperty) {
        this.name = deviceTypeProperty ? deviceTypeProperty.name : '';
        this.id = deviceTypeProperty ? deviceTypeProperty.id : null;
        this.deviceTypeId = deviceTypeProperty ? deviceTypeProperty.deviceTypeId : null;
    }
}