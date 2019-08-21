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
	MatExpansionModule,
	MatCheckboxModule,
	MatSnackBarModule,
	MatProgressSpinnerModule
} from '@angular/material';

import { CommandsRoutingModule } from './commands-routing.module';
import { CommandListComponent } from './command-list/command-list.component';
import { CommandDialogComponent } from './command-dialog/command-dialog.component';
import { CommandArgPanelComponent } from './command-arg-panel/command-arg-panel.component';

@NgModule({
	declarations: [
		CommandListComponent,
		CommandDialogComponent,
		CommandArgPanelComponent
	],
	imports: [
		CommonModule,
		CommandsRoutingModule,
		MatToolbarModule,
		MatButtonModule,
		MatCardModule,
		MatInputModule,
		MatDialogModule,
		MatDividerModule,
		MatChipsModule,
		MatSelectModule,
		MatExpansionModule,
		MatCheckboxModule,
		MatSnackBarModule,
		MatProgressSpinnerModule,
		FormsModule,
		ReactiveFormsModule
	],
	entryComponents: [
		CommandDialogComponent
	]
})
export class CommandsModule { }
