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
import {
	FormBuilder,
	Validators,
	FormGroup,
	FormControl
} from "@angular/forms";

@Component({
	selector: 'app-command-list',
	templateUrl: './command-list.component.html',
	styleUrls: ['./command-list.component.css']
})
export class CommandListComponent implements OnInit {

	commandListSubs: Subscription;
	commandList: Command[];
	authenticated = false;

	argForms: FormGroup[][];

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

                commands.forEach(function(c){
                    tempForms[c.id] = [];
                    c.args.forEach(function(a){
                        let argForm = new FormGroup({
                            id: new FormControl(a.id),
                            command_id: new FormControl(a.command_id),
                            name: new FormControl(a.name),
                            type: new FormControl(a.type),
                            required: new FormControl(a.required)
                        });
                        tempForms[c.id].push(argForm);
                    });
                });
                this.argForms = tempForms;
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
        let new_arg = new Arg("", "test", command_id, false);
        let arg_form = new FormGroup({
            id: new FormControl(),
            command_id: new FormControl(command_id),
            name: new FormControl(),
            type: new FormControl(),
            required: new FormControl(false)
        });
        this.argForms[command_id].push(arg_form);
        command.args.push(new_arg);
    }

    saveNewArg(command_id, index) {
        let new_arg = this.argForms[command_id][index].value;
        this.api
            .saveCommandArg(command_id, new_arg)
            .subscribe(() => this.refreshList(), console.error);
    }

    cancelNewArg(command_id, argIdx) {
        let command = this.commandList.find(c => c.id === command_id);
        command.args.splice(argIdx, 1);
        this.argForms[command_id].splice(argIdx, 1);
    }

    deleteArg(argId) {
        this.api
            .deleteCommandArg(argId)
            .subscribe(() => this.refreshList(), console.error);
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
