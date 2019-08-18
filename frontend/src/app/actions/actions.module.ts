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
	MatChipsModule
} from '@angular/material';

import { ActionsRoutingModule } from './actions-routing.module';
import { ActionListComponent } from './action-list/action-list.component';
import { ActionDialogComponent } from './action-dialog/action-dialog.component';


@NgModule({
    declarations: [
		ActionListComponent,
		ActionDialogComponent
	],
	imports: [
		CommonModule,
		ActionsRoutingModule,
		MatToolbarModule,
		MatButtonModule,
		MatCardModule,
		MatInputModule,
		MatDialogModule,
		MatDividerModule,
		MatChipsModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule
	],
	entryComponents: [
		ActionDialogComponent
	]
})
export class ActionsModule { }
