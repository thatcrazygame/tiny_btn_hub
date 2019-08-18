import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatToolbarModule,
	MatButtonModule,
	MatCardModule,
	MatInputModule,
	MatDialogModule,
	MatDividerModule,
	MatSelectModule,
	MatChipsModule
} from '@angular/material';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { DevicesRoutingModule } from './devices-routing.module';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceTypesComponent } from './device-types/device-types.component';
import { DeviceTypeDialogComponent } from './device-type-dialog/device-type-dialog.component';
import { DeviceDialogComponent } from './device-dialog/device-dialog.component';

@NgModule({
	declarations: [
		DeviceListComponent,
		DeviceTypesComponent,
		DeviceTypeDialogComponent,
		DeviceDialogComponent
	],
	imports: [
		CommonModule,
		DevicesRoutingModule,
		MatToolbarModule,
		MatButtonModule,
		MatCardModule,
		MatInputModule,
		MatDialogModule,
		MatDividerModule,
		MatChipsModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule
	],
	entryComponents: [
		DeviceTypeDialogComponent,
		DeviceDialogComponent
	]
})
export class DevicesModule { }
