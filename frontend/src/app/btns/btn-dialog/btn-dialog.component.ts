import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelectModule } from "@angular/material";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { BtnsApiService } from '../btns-api.service';
import { Btn } from '../btn.model'

@Component({
	selector: 'app-btn-dialog',
	templateUrl: './btn-dialog.component.html',
	styleUrls: ['./btn-dialog.component.css']
})
export class BtnDialogComponent implements OnInit {

	form: FormGroup;

	constructor(
		private api: BtnsApiService,
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<BtnDialogComponent>,
		@Inject(MAT_DIALOG_DATA) { id, name, counter }: Btn
	) {
		this.form = fb.group({
			name: [name, Validators.required],
            id: [id, Validators.required],
            counter: [counter, Validators.required]
		});
	}

	ngOnInit() {
	}

	save() {
		let new_btn = this.form.value
		this.dialogRef.close(new_btn);
	}

	close() {
		this.dialogRef.close();
	}


}
