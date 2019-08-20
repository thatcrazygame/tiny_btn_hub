import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import * as Auth0 from 'auth0-web';
import { ROLES_URL } from '../../env'
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

import { CommandsApiService } from '../commands-api.service';
import { Command } from '../command.model'
import { Arg } from '../arg.model'

@Component({
	selector: 'app-command-arg-panel',
	templateUrl: './command-arg-panel.component.html',
	styleUrls: ['./command-arg-panel.component.css']
})
export class CommandArgPanelComponent implements OnInit {

	@Input() command: Command;
	@Input() arg: Arg;
    @Input() index: number;

	@Output() onArgDeleted: EventEmitter<any> = new EventEmitter<any>();

	argForm: FormGroup;

	authenticated = false;

	constructor(
		private commandApi: CommandsApiService,
		private snack: MatSnackBar
	) { }

	ngOnInit() {
        this.updateArgForm();
		Auth0.subscribe((authenticated) => {
			// self.disableForms(!authenticated);
			this.authenticated = authenticated;
		});
	}

    isAdmin() {
        if (!Auth0.isAuthenticated()) return false;

        const roles = Auth0.getProfile()[`${ROLES_URL}`];
        return roles.includes('admin');
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

    updateArgForm() {
        let arg = this.arg;
        this.argForm = new FormGroup({
            name: new FormControl(arg.name),
            type: new FormControl(arg.type),
            required: new FormControl(arg.required)
        });


    }

	saveNewArg() {
		let new_arg = this.argForm.value;
		this.commandApi
            .saveCommandArg(this.command.id, new_arg)
            .subscribe(resp => {
				this.arg = resp.body;
				this.statusPopup(resp.status);
			}, console.error);
	}

	cancelNewArg() {
		this.onArgDeleted.emit(
			{command_id: this.command.id, index: this.index}
		)
	}

	deleteArg() {
		this.commandApi
			.deleteCommandArg(this.arg.id)
			.subscribe(resp => {
				this.statusPopup(resp.status);
				this.onArgDeleted.emit(
					{command_id: this.command.id, index: this.index}
				)
			}, console.error);
	}

}
