import * as Auth0 from 'auth0-web';
import { ROLES_URL } from '../../env'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Subscription } from 'rxjs/Subscription';
import {
	MatDialog,
	MatDialogConfig,
	MatExpansionModule,
	MatSelectModule,
	MatSnackBar
} from "@angular/material";
import {
	FormBuilder,
	Validators,
	FormGroup,
	FormControl
} from "@angular/forms";

import { Btn } from '../btn.model';
import { BtnsApiService } from '../btns-api.service';
import { BtnDialogComponent } from '../btn-dialog/btn-dialog.component';
import { BtnSnackComponent } from '../btn-snack/btn-snack.component';
import { BtnActionPanelComponent } from '../btn-action-panel/btn-action-panel.component';

import { Action } from '../../actions/action.model'
import { ActionsApiService } from '../../actions/actions-api.service'

import { Command } from '../../commands/command.model'
import { CommandsApiService } from '../../commands/commands-api.service'

import { Group } from '../../groups/group.model'
import { GroupsApiService } from '../../groups/groups-api.service'

@Component({
	selector: 'app-btn-list',
	templateUrl: './btn-list.component.html',
	styleUrls: ['./btn-list.component.css']
})
export class BtnListComponent implements OnInit {

	// btnsListSubs: Subscription;
	btnsList: Btn[];

	// actionsListSubs: Subscription;
	actionList: Action[];

	// commandListSubs: Subscription;
	commandList: Command[];

	// groupListSubs: Subscription;
	groupList: Group[];



	authenticated = false;

	constructor(
		private api: BtnsApiService,
		private actionApi: ActionsApiService,
		private commandApi: CommandsApiService,
		private groupApi: GroupsApiService,
		private dialog: MatDialog,
		private snack: MatSnackBar
	) { }

	ngOnInit() {
		this.refreshAll();
	}

	ngOnDestroy() {
		// this.btnsListSubs.unsubscribe();
		// this.actionsListSubs.unsubscribe();
		// this.commandListSubs.unsubscribe();
		// this.groupListSubs.unsubscribe();
	}

	isAdmin() {
		if (!Auth0.isAuthenticated()) return false;

		const roles = Auth0.getProfile()[`${ROLES_URL}`];
		return roles.includes('admin');
	}

	refreshAll() {
		const self = this;

		forkJoin([
			this.api.getBtns(),
			this.actionApi.getActions(),
			this.commandApi.getCommands(),
			this.groupApi.getGroups()
		])
			.subscribe(data => {
				let btns = data[0];
				let actions = data[1];
				let commands = data[2];
				let groups = data[3];

				self.btnsList = btns;
				self.actionList = actions;
				self.commandList = commands;
				self.groupList = groups;

				Auth0.subscribe((authenticated) => {
					self.authenticated = authenticated;
				});

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
		dialogConfig.data = { id: null, name: "" };
		// dialogConfig.height = '400px';
		// dialogConfig.width = '600px';

		const dialogRef = this.dialog.open(BtnDialogComponent, dialogConfig);
		dialogRef.afterClosed().subscribe(
			data => this.closeDialog(data)
		);
	}

	closeDialog(data) {
		if (data !== undefined) {
			this.saveBtn(data);
		}
	}

	saveBtn(newBtn: Btn) {
		this.api
			.saveBtn(newBtn)
			.subscribe(resp => {
				console.log(resp.body);
				// let newBtn = resp.body;
				// this.btnsList.push(newBtn);
				this.refreshAll();
				this.statusPopup(resp.status);
			}, console.error);
	}

	deleteBtn(btnId: number) {
		this.api
			.deleteBtn(btnId)
			.subscribe(resp => {
				this.refreshAll();
				this.statusPopup(resp.status);
			}, console.error);
	}

	btnHasAction(btnId: number, actionId: number) {
		let hasAction = false;
		let btn = this.btnsList.find(b => b.id === btnId);
		if (btn !== undefined) {
			let btn_action = btn.btn_actions.find(
				ba => ba.action_id === actionId
			)
			if (btn_action !== undefined && btn_action.group_id !== null) {
				return btn_action;
			}
		}
		return null;
	}


}
