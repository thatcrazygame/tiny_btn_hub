import * as Auth0 from 'auth0-web';
import { ROLES_URL } from '../../env'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import {
	MatDialog,
	MatDialogConfig,
	MatSelectModule,
	MatGridListModule,
	MatSnackBar
} from "@angular/material";

import {
	FormBuilder,
	Validators,
	FormGroup,
	FormControl
} from "@angular/forms";

import { GroupsApiService } from '../groups-api.service';
import { Group } from '../group.model'
import { GroupDialogComponent } from '../group-dialog/group-dialog.component';
import { GroupFormComponent } from '../group-form/group-form.component';

import { Device } from '../../devices/device.model'
import { DevicesApiService } from '../../devices/devices-api.service'

@Component({
	selector: 'app-group-list',
	templateUrl: './group-list.component.html',
	styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
	groupList: Group[];
	deviceList: Device[];

	authenticated = false;

	constructor(
		private api: GroupsApiService,
		private devicesApi: DevicesApiService,
		private dialog: MatDialog,
		private snack: MatSnackBar
	) { }

	refreshAll() {
		let self = this;
		forkJoin([
			this.api.getGroups(),
			this.devicesApi.getDevices()
		])
			.subscribe(data => {
				let groups = data[0];
				let devices = data[1];

				self.groupList = groups;
				self.deviceList = devices;
			}, console.error);
	}

	statusPopup(status_code: number, duration?: number) {
		if (duration === undefined) {
			duration = 2000;
		}
		if (status_code > 199 && status_code < 300) {
			this.snack.open("Success", "", { duration: duration });
		} else if (status_code > 399 && status_code < 500) {
			this.snack.open("Fail", "", { duration: duration });
		} else {
			this.snack.open("Status code: " + status_code, "", { duration: duration })
		}
	}

	openDialog() {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = { name: "" };
		// dialogConfig.height = '400px';
		// dialogConfig.width = '600px';

		const dialogRef = this.dialog.open(GroupDialogComponent, dialogConfig);
		dialogRef.afterClosed().subscribe(
			data => this.closeDialog(data)
		);
	}

	closeDialog(data) {
		if (data !== undefined) {
			this.saveGroup(data);
		}
	}

	saveGroup(newGroup: Group) {
		this.api
			.saveGroup(newGroup)
			.subscribe(resp => {
				this.refreshAll();
				this.statusPopup(resp.status);
			}, console.error);
	}

	removeFromGroupList(group_id: number) {
		this.groupList = this.groupList.filter(function(group) {
			return group.id !== group_id;
		});
	}

	ngOnInit() {
		this.refreshAll();
		const self = this;
		Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
	}


	ngOnDestroy() {

	}

	isAdmin() {
		if (!Auth0.isAuthenticated()) return false;

		const roles = Auth0.getProfile()[`${ROLES_URL}`];
		return roles.includes('admin');
	}

}
