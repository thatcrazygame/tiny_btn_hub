import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { DeviceType } from '../devicetype.model'

@Component({
	selector: 'app-device-type-dialog',
	templateUrl: './device-type-dialog.component.html',
	styleUrls: ['./device-type-dialog.component.css']
})
export class DeviceTypeDialogComponent implements OnInit {

	form: FormGroup;

	constructor(
        private fb: FormBuilder,
		private dialogRef: MatDialogRef<DeviceTypeDialogComponent>,
		@Inject(MAT_DIALOG_DATA) { name }: DeviceType
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
