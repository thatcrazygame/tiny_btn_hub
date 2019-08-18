import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelectModule } from "@angular/material";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { CommandsApiService } from '../commands-api.service';
import { Command } from '../command.model'

@Component({
  selector: 'app-command-dialog',
  templateUrl: './command-dialog.component.html',
  styleUrls: ['./command-dialog.component.css']
})
export class CommandDialogComponent implements OnInit {

    form: FormGroup;

	constructor(
		private api: CommandsApiService,
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<CommandDialogComponent>,
		@Inject(MAT_DIALOG_DATA) { name }: Command
	) {
		this.form = fb.group({
			name: [name, Validators.required]
		});
	}

	ngOnInit() {
	}

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

}
