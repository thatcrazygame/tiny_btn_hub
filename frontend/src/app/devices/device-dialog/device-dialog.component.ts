import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelectModule } from "@angular/material";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { DevicesApiService } from '../devices-api.service';
import { Device } from '../device.model'
import { DeviceType } from '../devicetype.model'

@Component({
	selector: 'app-device-dialog',
	templateUrl: './device-dialog.component.html',
	styleUrls: ['./device-dialog.component.css']
})
export class DeviceDialogComponent implements OnInit {
    deviceTypeListSubs: Subscription;
	deviceTypeList: DeviceType[];
    selectedDeviceType: number;

	form: FormGroup;

	constructor(
        private api: DevicesApiService,
        private fb: FormBuilder,
		private dialogRef: MatDialogRef<DeviceDialogComponent>,
		@Inject(MAT_DIALOG_DATA) { name, deviceTypeID }: Device
	) {
		this.form = fb.group({
			name: [name, Validators.required],
            device_type_id: [deviceTypeID, Validators.required]
		});
	}

    refreshList() {
		this.deviceTypeListSubs = this.api
			.getDeviceTypes()
			.subscribe(res => {
				this.deviceTypeList = res;
                if (this.deviceTypeList.length == 1) {
                    this.selectedDeviceType = this.deviceTypeList[0].id;
                }
			},
				console.error
			)
	}


	ngOnInit() {
        this.refreshList();
	}

	save() {
		this.dialogRef.close(this.form.value);
	}

	close() {
		this.dialogRef.close();
	}

}
