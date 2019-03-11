import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
//material imports

import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ParticlesModule } from 'angular-particle';


 
import { AppComponent } from './app.component';
import { DevicesComponent} from './devices/devices.component';
import { DeviceService } from './_services/device.service';
import { DeviceTypeService } from './_services/device-type.service';
import { LayoutComponent } from './layout/layout.component';
import { EditCreateDialog } from './devices/edit-create-dialog';
import { FormsModule } from '@angular/forms';
import { AlertifyService } from './_services/alertify.service';
import { ViewDialog } from './devices/view-dialog';
import { MatSortModule } from '@angular/material/sort';
import { DeviceTypesComponent } from './device-types/device-types.component';
import { MatListModule } from '@angular/material';
import { EditCreateTypeDialog } from './device-types/edit-create-type';

@NgModule({
   declarations: [
      AppComponent,
      DevicesComponent,
      LayoutComponent,
      DeviceTypesComponent,
      EditCreateDialog,
      ViewDialog,
      EditCreateTypeDialog
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      MatTabsModule,
      MatSidenavModule,
      MatTreeModule,
      MatListModule,
      MatPaginatorModule,
      MatTooltipModule,
      MatInputModule,
      MatIconModule,
      ParticlesModule,
      MatSortModule,
      MatChipsModule,
      MatSelectModule,
      MatDialogModule,
      FormsModule,
      MatButtonModule,
      MatFormFieldModule,
      MatTableModule,
      BrowserAnimationsModule,
      ModalModule.forRoot(),
      FlexLayoutModule
   ],
   providers: [
      DeviceService,
      DeviceTypeService,
      AlertifyService
   ],
   entryComponents: [EditCreateDialog, ViewDialog, EditCreateTypeDialog],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
