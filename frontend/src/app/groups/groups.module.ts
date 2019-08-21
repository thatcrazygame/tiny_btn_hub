import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatToolbarModule,
	MatButtonModule,
	MatCardModule,
	MatInputModule,
	MatDialogModule,
	MatDividerModule,
	MatSelectModule,
	MatChipsModule,
	MatGridListModule,
	MatSnackBarModule,
	MatProgressSpinnerModule
} from '@angular/material';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDialogComponent } from './group-dialog/group-dialog.component';
import { GroupFormComponent } from './group-form/group-form.component';

@NgModule({
  declarations: [GroupListComponent, GroupDialogComponent, GroupFormComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatDividerModule,
    MatChipsModule,
    MatSelectModule,
	MatSelectModule,
	MatGridListModule,
	MatSnackBarModule,
	MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
      GroupDialogComponent
  ]
})
export class GroupsModule { }
