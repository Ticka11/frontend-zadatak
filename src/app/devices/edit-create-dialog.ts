import { AlertifyService } from './../_services/alertify.service';
import { DeviceTypeProperty } from './../_models/deviceTypeProperty.model';
import { DevicePropertyValue } from './../_models/devicePropertyValue.model';
import { DeviceType } from './../_models/deviceType.model';
import { DeviceTypeService } from './../_services/device-type.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeviceService } from '../_services/device.service';
import { Device } from '../_models/device.model';

@Component({
  selector: 'app-edit-create-dialog',
  templateUrl: 'edit-create-dialog.html',
  styleUrls: ['devices.component.css'],
})

export class EditCreateDialog {

  deviceTypes: DeviceType[];
  deviceProperties: DevicePropertyValue[];
  properties: DeviceTypeProperty[] = [];
  deviceToSend: Device;
  subCategories: DeviceType[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditCreateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private typeService: DeviceTypeService,
    private deviceService: DeviceService,
    private alertify: AlertifyService) { }


  getTypes() {
    this.typeService.getDeviceTypes().subscribe((response: any) => {
      this.deviceTypes = response;
    });
  }

  onTypeChanged($event) {
    this.data.device.devicePropertyValues = [];
  }

  getSelectedCategory(id: number) {
    this.typeService.getDeviceType(id).subscribe((deviceType: DeviceType) => {
      this.properties = deviceType.deviceTypeProperties.concat(deviceType.parentTypeProperties);
      for (const prop of this.properties) {
        this.data.device.devicePropertyValues.push({
          deviceTypePropertyId: prop.id,
          deviceTypeProperty: prop.name,
          value: null,
          deviceId: null
        });
      }
    });
  }

  onSubmit() {
    this.deviceService.createOrUpdateDevice(this.data.device).subscribe((response: Device) => {
      this.dialogRef.close();
      this.alertify.success('Successfully saved!');
    }, error => {
      this.alertify.error('Error!');
    });
  }

  onCategoryChanged(event) {
    this.typeService.getDeviceType(event.value).subscribe((deviceType: DeviceType) => {
      this.subCategories = deviceType.childrenDeviceType;
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
