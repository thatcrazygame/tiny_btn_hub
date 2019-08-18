import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import * as Auth0 from 'auth0-web';
import { ROLES_URL } from '../../env'

import {
	MatSelectModule,
	MatSnackBar
} from "@angular/material";

import {
	FormBuilder,
	Validators,
	FormGroup,
	FormControl
} from "@angular/forms";

import { GroupsApiService } from '../groups-api.service';
import { Group } from '../group.model'
import { Device } from '../../devices/device.model'

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {

    @Input() group: Group;
    @Input() deviceList: Device[];

    @Output() onGroupDeleted: EventEmitter<any> = new EventEmitter<any>();

    groupForm: FormGroup;

    authenticated = false;

  constructor(
      private groupApi: GroupsApiService,
      private snack: MatSnackBar
  ) { }

  ngOnInit() {
      this.updateGroupForm();

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

  updateGroupForm() {
      let device_select_list = null;

      if (this.group.devices.length > 0) {
          device_select_list = this.group.devices.map(d => d.id);
      }

      this.groupForm = new FormGroup({
          devices: new FormControl(device_select_list)
      });
  }


  updateGroupDevices() {
      let devices = this.groupForm.value;
      this.groupApi
          .updateGroupDevices(this.group.id, devices)
          .subscribe(resp => {
              let updated_devices = resp.body.devices;
              this.group.devices = updated_devices;
              this.statusPopup(resp.status);
          }, console.error);
  }

  deleteGroup() {
      this.groupApi
          .deleteGroup(this.group.id)
          .subscribe(resp => {
              this.statusPopup(resp.status);
              this.onGroupDeleted.emit(this.group.id);
          }, console.error);
  }
}
