import { AlertifyService } from './../_services/alertify.service';
import { DeviceTypeProperty } from './../_models/deviceTypeProperty.model';
import { DeviceType } from './../_models/deviceType.model';
import { DeviceTypeService } from './../_services/device-type.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-edit-create-type',
    templateUrl: 'edit-create-type.html',
    styleUrls: ['device-types.component.css'],
})

export class EditCreateTypeDialog {

    deviceTypes: DeviceType[];
    subDeviceType: DeviceType = new DeviceType();
    newProperty = new DeviceTypeProperty();
    newProperties: DeviceTypeProperty[] = [];
    newCategory = new DeviceType();
    newCategories: DeviceType[] = [];
    showNewProperty: boolean = false;
    showNewCategory: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<EditCreateTypeDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private typeService: DeviceTypeService,
        private alertify: AlertifyService
    ) { }


    onSubmit() {
        this.typeService.createOrUpdateDeviceType(this.data.deviceType).subscribe((res) => {
            if (this.data.deviceType.id === null && this.data.deviceType.childrenDeviceType != null) {
                this.data.deviceType.childrenDeviceType.forEach(newCategory => {
                    newCategory.parentId = res.id;
                    this.typeService.createOrUpdateDeviceType(newCategory).subscribe(() => { });
                });
            } else if (this.data.deviceType.id != null && this.data.deviceType.childrenDeviceType != null) {
                this.data.deviceType.childrenDeviceType.forEach(newCategory => {
                    newCategory.parentId = this.data.deviceType.id;
                    this.typeService.createOrUpdateDeviceType(newCategory).subscribe(() => { });
                });
            }
            this.alertify.success('Device type has been saved successfully!');

            this.dialogRef.close();
        }, () => {
            this.alertify.error('Error!');
        });
    }

    addNewProperty() {
        this.showNewProperty = true;
    }

    addNewSubCategory() {
        this.showNewCategory = true;
    }

    saveCategory() {
        if (this.data.deviceType.id != null) {
            this.newCategory.parentId = this.data.deviceType.id;
            this.data.deviceType.childrenDeviceType.push(this.newCategory);
            this.newCategory = new DeviceType();
            this.showNewCategory = false;
        } else {
            this.newCategories.push(this.newCategory);
            this.data.deviceType.childrenDeviceType = this.newCategories;
            this.newCategory = new DeviceType();
            this.showNewCategory = false;
        }
    }

    saveProperty() {
        if (this.data.deviceType.id != null) {
            this.newProperty.deviceTypeId = this.data.deviceType.id;
            this.data.deviceType.deviceTypeProperties.push(this.newProperty);
            this.newProperty = new DeviceTypeProperty();
            this.showNewProperty = false;

        } else {
            this.newProperties.push(this.newProperty);
            this.data.deviceType.deviceTypeProperties = this.newProperties;
            this.newProperty = new DeviceTypeProperty();
            this.showNewProperty = false;
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
