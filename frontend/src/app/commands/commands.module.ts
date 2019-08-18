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
	MatCheckboxModule
} from '@angular/material';

import { CommandsRoutingModule } from './commands-routing.module';
import { CommandListComponent } from './command-list/command-list.component';
import { CommandDialogComponent } from './command-dialog/command-dialog.component';

@NgModule({
  declarations: [CommandListComponent, CommandDialogComponent],
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
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
      CommandDialogComponent
  ]
})
export class CommandsModule { }
