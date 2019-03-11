
import { DeviceTypeProperty } from './../_models/deviceTypeProperty.model';
import { DevicePropertyValue } from './../_models/devicePropertyValue.model';
import { DeviceType } from './../_models/deviceType.model';
import { DeviceTypeService } from './../_services/device-type.service';
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DeviceService } from '../_services/device.service';
import { Device } from '../_models/device.model';

@Component({
    selector: 'app-view-dialog',
    templateUrl: 'view-dialog.html',
    styleUrls: ['devices.component.css'],
  })

export class ViewDialog{

    deviceTypes: DeviceType[];
    singleType: DeviceType;
    deviceProperties: DevicePropertyValue[];
    properties: DeviceTypeProperty[];
    deviceToSend: Device;

    constructor(
        public dialogRef: MatDialogRef<ViewDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private typeService: DeviceTypeService,
        private deviceService: DeviceService) {}

      getTypes() {
        this.typeService.getDeviceTypes().subscribe((response: any) => {
          this.deviceTypes = response;
        });
      }
   
      onNoClick(): void {
        this.dialogRef.close();
      }
}