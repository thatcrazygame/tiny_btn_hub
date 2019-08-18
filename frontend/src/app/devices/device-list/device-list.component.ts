import * as Auth0 from 'auth0-web';
import { ROLES_URL } from '../../env'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogConfig, MatChipsModule } from "@angular/material";
import { DevicesApiService } from '../devices-api.service';
import { Device } from '../device.model'
import { DeviceDialogComponent } from '../device-dialog/device-dialog.component';

@Component({
	selector: 'app-device-list',
	templateUrl: './device-list.component.html',
	styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
	deviceListSubs: Subscription;
	deviceList: Device[];
	authenticated = false;

    constructor(
		private api: DevicesApiService,
		private dialog: MatDialog
	) { }

    refreshList() {
        this.deviceListSubs = this.api
            .getDevices()
            .subscribe(res => {
                this.deviceList = res;
            },
                console.error
            )
    }

    openDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { name: "New Device" };
        // dialogConfig.height = '400px';
        // dialogConfig.width = '600px';

        const dialogRef = this.dialog.open(DeviceDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data => this.closeDialog(data)
        );
    }

    closeDialog(data) {
		if (data !== undefined) {
			this.api
				.saveDevice(data)
				.subscribe(() => this.refreshList(), console.error);
		} else {
			console.log("undefined data");
		}
	}

    delete(deviceId: number) {
        this.api
            .deleteDevice(deviceId)
            .subscribe(() => this.refreshList(), console.error);
    }

    ngOnInit() {
		this.refreshList();
		const self = this;
		Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
	}

    ngOnDestroy() {
        this.deviceListSubs.unsubscribe();
    }

    isAdmin() {
        if (!Auth0.isAuthenticated()) return false;

        const roles = Auth0.getProfile()[`${ROLES_URL}`];
        return roles.includes('admin');
    }

}
