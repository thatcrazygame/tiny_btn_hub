import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import * as Auth0 from 'auth0-web';
// import { Subscription } from 'rxjs/Subscription';
import {
    MatExpansionPanel,
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
import { BtnAction } from '../btnaction.model';
import { BtnsApiService } from '../btns-api.service';

import { Action } from '../../actions/action.model'
import { Command } from '../../commands/command.model'
import { Group } from '../../groups/group.model'

@Component({
	selector: 'app-btn-action-panel',
	templateUrl: './btn-action-panel.component.html',
	styleUrls: ['./btn-action-panel.component.css']
    ,
    viewProviders: [MatExpansionPanel]
})
export class BtnActionPanelComponent implements OnInit {

	@Input() btn: Btn;
	@Input() action: Action;

	@Input() commandList: Command[];
	@Input() groupList: Group[];

	btnAction: BtnAction;
	btnActionForm: FormGroup;
	argForm: FormGroup;
	authenticated = false;

	constructor(
		private btnApi: BtnsApiService,
		private snack: MatSnackBar
	) { }

	ngOnInit() {
		this.btnAction = this.btn.btn_actions.find(
			ba => ba.action_id === this.action.id
		)

		let cmd_id = null;
		let grp_id = null;

		if (this.btnAction !== undefined) {
			cmd_id = this.btnAction.command_id;
			grp_id = this.btnAction.group_id;

			if (cmd_id !== undefined) {
				this.argForm = this.newArgForm(cmd_id);
			}
		}

		this.btnActionForm = new FormGroup({
			command_id: new FormControl({
				value: cmd_id,
				disabled: false
			}),
			group_id: new FormControl({
				value: grp_id,
				disabled: false
			})
		});

		Auth0.subscribe((authenticated) => {
			// self.disableForms(!authenticated);
			this.authenticated = authenticated;
		});

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

    newArgForm(command_id: number) {
		let argForm = new FormGroup({});
		let command = this.commandList.find(c => c.id === command_id)
		let btnaction = this.btnAction;
		command.args.forEach(function(arg) {
			let new_control = new FormControl();
			let argvalue = null;
			if (btnaction
				&& btnaction.command_id == command.id
				&& btnaction.argvalues
				&& btnaction.argvalues.length > 0
			) {
				argvalue = btnaction.argvalues.find(
					av => av.arg_id === arg.id
				).value;

				if (arg.type == 'boolean') {
					if (Number(argvalue) > 0) {
						argvalue = true;
					} else {
						argvalue = false;
					}
				}
				new_control.setValue(argvalue);
			}
			argForm.addControl(arg.id.toString(), new_control);
		});

		return argForm;
	}

    getCommand(command_id): Command {
        return this.commandList.find(c => c.id === command_id);
    }

    commandSelectChange(event) {
		let command_id = event.value;
		this.argForm = this.newArgForm(command_id);
	}

	saveBtnAction() {
		let new_btnaction = this.btnActionForm.value;
		new_btnaction["btn_id"] = this.btn.id;
		new_btnaction["action_id"] = this.action.id;

		let arg_values = this.argForm.value;
		this.btnApi
			.saveBtnAction(new_btnaction, arg_values)
			.subscribe(resp => {
				this.btnAction = resp.body;
				this.statusPopup(resp.status);
			}, console.error);
	}

	updateBtnAction() {
		let btnaction = this.btnActionForm.value;
		btnaction["btn_id"] = this.btn.id;
		btnaction["action_id"] = this.action.id;
		let arg_values = this.argForm.value;
		this.btnApi.updateBtnAction(
			this.btn.id, this.action.id, btnaction, arg_values
		)
			.subscribe(resp => {
				this.btnAction = resp.body;
				this.statusPopup(resp.status);
			}, console.error);

	}

	deleteBtnAction() {
		this.btnApi
			.deleteBtnAction(this.btn.id, this.action.id)
			.subscribe(resp => {
				this.btnAction = null;
				this.argForm = null;
				this.btnActionForm.reset();
				this.statusPopup(resp.status);
			}, console.error);
	}

}
