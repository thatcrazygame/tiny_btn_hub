import * as Auth0 from 'auth0-web';
import { ROLES_URL } from '../../env'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {
	MatDialog,
    MatDialogConfig,
    MatExpansionModule,
	MatSelectModule
} from "@angular/material";
import { CommandsApiService } from '../commands-api.service';
import { Command } from '../command.model'
import { Arg } from '../arg.model'
import { CommandDialogComponent } from '../command-dialog/command-dialog.component';


@Component({
	selector: 'app-command-list',
	templateUrl: './command-list.component.html',
	styleUrls: ['./command-list.component.css']
})
export class CommandListComponent implements OnInit {

	commandListSubs: Subscription;
	commandList: Command[];
	authenticated = false;

	constructor(
		private api: CommandsApiService,
		private dialog: MatDialog
	) { }

	refreshList() {
        const self = this;
        let tempForms = [];

		this.commandListSubs = this.api
			.getCommands()
			.subscribe(res => {
                let commands = res;
				this.commandList = commands;
			}, console.error);
	}

	openDialog() {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = { name: "" };
		// dialogConfig.height = '400px';
		// dialogConfig.width = '600px';

		const dialogRef = this.dialog.open(CommandDialogComponent, dialogConfig);
		dialogRef.afterClosed().subscribe(
			data => this.closeDialog(data)
		);
	}

	closeDialog(data) {
		if (data !== undefined) {
			this.api
				.saveCommand(data)
				.subscribe(() => this.refreshList(), console.error);
		} else {
			console.log("undefined data");
		}
	}

	delete(commandId: number) {
		this.api
			.deleteCommand(commandId)
			.subscribe(() => this.refreshList(), console.error);
	}

    newArg(command_id) {
        let command = this.commandList.find(c => c.id === command_id);
        let new_arg = new Arg("", "", command_id, false);
        command.args.push(new_arg);
    }

	removeFromArgList(event: any) {
		let command_id = event.command_id;
		let arg_index = event.index;
		let command = this.commandList.find(c => c.id === command_id);

		command.args.splice(arg_index, 1);
	}


	ngOnInit() {
		this.refreshList();
		const self = this;
		Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
	}


	ngOnDestroy() {
		this.commandListSubs.unsubscribe();
	}

	isAdmin() {
		if (!Auth0.isAuthenticated()) return false;

		const roles = Auth0.getProfile()[`${ROLES_URL}`];
		return roles.includes('admin');
	}


}
