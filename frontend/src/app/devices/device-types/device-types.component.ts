import * as Auth0 from 'auth0-web';
import { ROLES_URL } from '../../env'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DevicesApiService } from '../devices-api.service';
import { DeviceType } from '../devicetype.model'
import { DeviceTypeDialogComponent } from '../device-type-dialog/device-type-dialog.component';


@Component({
	selector: 'app-device-types',
	templateUrl: './device-types.component.html',
	styleUrls: ['./device-types.component.css']
})
export class DeviceTypesComponent implements OnInit {
	deviceTypeListSubs: Subscription;
	deviceTypeList: DeviceType[];
	authenticated = false;

	constructor(
		private api: DevicesApiService,
		private dialog: MatDialog
	) { }

	refreshList() {
		this.deviceTypeListSubs = this.api
			.getDeviceTypes()
			.subscribe(res => {
				this.deviceTypeList = res;
			},
				console.error
			)
	}

	openDialog() {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = { name: "New Device Type" };
		// dialogConfig.height = '400px';
		// dialogConfig.width = '600px';

		const dialogRef = this.dialog.open(DeviceTypeDialogComponent, dialogConfig);
		dialogRef.afterClosed().subscribe(
			data => this.closeDialog(data)
		);
	}

	closeDialog(data) {
		if (data !== undefined) {
			this.api
				.saveDeviceType(data)
				.subscribe(() => this.refreshList(), console.error);
		} else {
			console.log("undefined data");
		}
	}

	delete(deviceTypeId: number) {
		this.api
			.deleteDeviceType(deviceTypeId)
			.subscribe(() => this.refreshList(), console.error);
	}

	ngOnInit() {
		this.refreshList();
		const self = this;
		Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
	}


	ngOnDestroy() {
		this.deviceTypeListSubs.unsubscribe();
	}

	isAdmin() {
		if (!Auth0.isAuthenticated()) return false;

		const roles = Auth0.getProfile()[`${ROLES_URL}`];
		return roles.includes('admin');
	}

}
