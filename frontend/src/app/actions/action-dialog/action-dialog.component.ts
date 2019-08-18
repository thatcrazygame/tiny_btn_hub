import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelectModule } from "@angular/material";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ActionsApiService } from '../actions-api.service';
import { Action } from '../action.model'

@Component({
	selector: 'app-action-dialog',
	templateUrl: './action-dialog.component.html',
	styleUrls: ['./action-dialog.component.css']
})
export class ActionDialogComponent implements OnInit {

	form: FormGroup;

	constructor(
		private api: ActionsApiService,
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<ActionDialogComponent>,
		@Inject(MAT_DIALOG_DATA) { name }: Action
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
