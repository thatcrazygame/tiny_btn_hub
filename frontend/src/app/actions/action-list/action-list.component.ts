import * as Auth0 from 'auth0-web';
import { ROLES_URL } from '../../env'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ActionsApiService } from '../actions-api.service';
import { Action } from '../action.model'
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css']
})
export class ActionListComponent implements OnInit {

    actionListSubs: Subscription;
	actionList: Action[];
	authenticated = false;

	constructor(
		private api: ActionsApiService,
		private dialog: MatDialog
	) { }

	refreshList() {
		this.actionListSubs = this.api
			.getActions()
			.subscribe(res => {
				this.actionList = res;
			},
				console.error
			)
	}

	openDialog() {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = { name: "" };
		// dialogConfig.height = '400px';
		// dialogConfig.width = '600px';

		const dialogRef = this.dialog.open(ActionDialogComponent, dialogConfig);
		dialogRef.afterClosed().subscribe(
			data => this.closeDialog(data)
		);
	}

	closeDialog(data) {
		if (data !== undefined) {
			this.api
				.saveAction(data)
				.subscribe(() => this.refreshList(), console.error);
		} else {
			console.log("undefined data");
		}
	}

	delete(actionId: number) {
		this.api
			.deleteAction(actionId)
			.subscribe(() => this.refreshList(), console.error);
	}

	ngOnInit() {
		this.refreshList();
		const self = this;
		Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
	}


	ngOnDestroy() {
		this.actionListSubs.unsubscribe();
	}

	isAdmin() {
		if (!Auth0.isAuthenticated()) return false;

		const roles = Auth0.getProfile()[`${ROLES_URL}`];
		return roles.includes('admin');
	}

}
