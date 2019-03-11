import { ViewDialog } from './view-dialog';
import { DeviceType } from './../_models/deviceType.model';
import { DeviceTypeService } from './../_services/device-type.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DeviceService } from '../_services/device.service';
import { Device } from '../_models/device.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DevicePropertyValue } from '../_models/devicePropertyValue.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { EditCreateDialog } from './edit-create-dialog';
import { MatDialog, MatSort } from '@angular/material';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  @ViewChild('viewModal') childModal: ModalDirective;
  encapsulation: ViewEncapsulation.None;

  searchParams: any = {};
  devices: Device[];
  deviceTypes: DeviceType[];
  deviceProperties: DevicePropertyValue[];

  pageIndex = 0;
  pageNumber = 1;
  pageSize = 5;
  name: string;
  property: string;
  type: string = null;
  operator: string;
  price: number;
  totalDevicesCount = 0;

  displayedColumns = ['DeviceName', 'DevicePrice', 'DeviceType', 'DeviceId'];
  dataSource = new MatTableDataSource<Device>();

  treeControl = new NestedTreeControl<DeviceType>(node => node.childrenDeviceType);
  dataSourceTree = new MatTreeNestedDataSource<DeviceType>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private deviceService: DeviceService, private deviceTypeService: DeviceTypeService,
    public dialog: MatDialog, private alertify: AlertifyService) {
  }

  hasChild = (_: number, node: DeviceType) => !!node.childrenDeviceType && node.childrenDeviceType.length > 0;


  ngOnInit() {
    this.getDeviceTypes();
    this.getDevices();
  }

  getDevices() {
    this.deviceService.getDevices(this.pageNumber, this.pageSize,
      this.name, this.type, this.property, this.operator, this.price).subscribe((result: any) => {
        this.devices = result.devices;
        this.totalDevicesCount = result.totalDevicesCount;
        this.dataSource.data = this.devices;
        this.dataSourceTree.data = this.deviceTypes;
      });
  }

  getDeviceTypes() {
    this.deviceTypeService.currentDeviceTypes.subscribe((res) => {
      this.deviceTypes = res;
      this.dataSourceTree.data = this.deviceTypes;
    });
  }

  applyFilter() {
    this.getDevices();
  }

  resetFilter() {
    this.pageNumber = 1;
    this.pageSize = 5;
    this.name = '';
    this.property = '';
    this.type = '';
    this.operator = '';
    this.price = null;
    this.getDevices();
  }

  onDelete(id) {
    this.alertify.confirm('Are you sure you want to delete this device?', () => {
      this.deviceService.deleteDevice(id)
        .subscribe(() => {
          this.devices.splice(this.devices.findIndex(d => d.id === id), 1);
          this.dataSource.data = this.devices;
          this.alertify.success('Device has been deleted');
        },
          () => {
            this.alertify.error('Failed to delete the device');
          });
    });
  }

  onPageChange(event: MatPaginator) {
    this.pageIndex = event.pageIndex;
    this.pageNumber = this.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getDevices();
  }

  //edit or create dialog

  openDialog(device): void {
    const dialogRef = this.dialog.open(EditCreateDialog, {
      height: 'auto',
      width: '30%',
      data: {
        device: device ? device : new Device(),
        deviceTypes: this.deviceTypes
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getDevices();
    });
  }

  // view dialog
  openViewDialog(device): void {
    const dialogRef = this.dialog.open(ViewDialog, {
      height: 'auto',
      width: '40%',
      data: device
    });
  }

  filterCategory(node) {
    this.type = node.name;
    this.getDevices();
  }

}
