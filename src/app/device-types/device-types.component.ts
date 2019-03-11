import { DeviceType } from './../_models/deviceType.model';
import { DeviceTypeService } from './../_services/device-type.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTreeNestedDataSource } from '@angular/material';
import { AlertifyService } from '../_services/alertify.service';
import { EditCreateTypeDialog } from './edit-create-type';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-device-types',
  templateUrl: './device-types.component.html',
  styleUrls: ['./device-types.component.css']
})
export class DeviceTypesComponent implements OnInit {
  deviceTypes: DeviceType[];
  treeControl = new NestedTreeControl<DeviceType>(node => node.childrenDeviceType);
  dataSourceTree = new MatTreeNestedDataSource<DeviceType>();

  hasChild = (_: number, node: DeviceType) => !!node.childrenDeviceType && node.childrenDeviceType.length > 0;


  constructor(private deviceTypeService: DeviceTypeService,
    public dialog: MatDialog, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getDeviceTypes();
    this.dataSourceTree.data = this.deviceTypes;

  }

  getDeviceTypes() {
    this.deviceTypeService.getDeviceTypes().subscribe((result) => {
      this.deviceTypes = result;
      this.dataSourceTree.data = this.deviceTypes;
      this.deviceTypeService.sendDeviceTypes(this.deviceTypes);
    });
  }

  onDelete(id) {
    this.alertify.confirm('Are you sure you want to delete this device type?', () => {
      this.deviceTypeService.deleteDeviceType(id)
        .subscribe(() => {

          this.getDeviceTypes();
          this.alertify.success('Device type has been deleted');
        },
          (error) => {
            this.alertify.error('Failed to delete the device type');
          });
    });
  }

  //edit or create dialog

  openDialog(deviceType): void {
    const dialogRef = this.dialog.open(EditCreateTypeDialog, {
      height: 'auto',
      width: '50%',
      data: {
        deviceType: deviceType ? deviceType : new DeviceType()
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getDeviceTypes();
    });
  }
}
