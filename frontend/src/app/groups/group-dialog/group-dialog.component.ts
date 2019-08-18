import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelectModule } from "@angular/material";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { GroupsApiService } from '../groups-api.service';
import { Group } from '../group.model'

@Component({
	selector: 'app-group-dialog',
	templateUrl: './group-dialog.component.html',
	styleUrls: ['./group-dialog.component.css']
})
export class GroupDialogComponent implements OnInit {

	form: FormGroup;

	constructor(
		private api: GroupsApiService,
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<GroupDialogComponent>,
		@Inject(MAT_DIALOG_DATA) { name }: Group
	) {
		this.form = fb.group({
			name: [name, Validators.required]
		});
	}

	ngOnInit() {
	}

	save() {
		let new_group = this.form.value
		this.dialogRef.close(new_group);
	}

	close() {
		this.dialogRef.close();
	}


}
