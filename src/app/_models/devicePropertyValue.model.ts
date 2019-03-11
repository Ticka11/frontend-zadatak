
    export class DevicePropertyValue {
        value: string;
        deviceTypeProperty: string;
        deviceTypePropertyId: number;
        deviceId: number;

        constructor(devicePropertyValue?: DevicePropertyValue) {
            this.value = devicePropertyValue ? devicePropertyValue.value : '';
            this.deviceTypeProperty = devicePropertyValue ? devicePropertyValue.deviceTypeProperty : '';
            this.deviceTypePropertyId = devicePropertyValue ? devicePropertyValue.deviceTypePropertyId : null;
            this.deviceId = devicePropertyValue ? devicePropertyValue.deviceId : null;
        }
    }