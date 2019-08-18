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
	MatListModule,
	MatCheckboxModule,
	MatSnackBarModule
} from '@angular/material';

// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptor } from '../auth/token.interceptor';


import { BtnsRoutingModule } from './btns-routing.module';
import { BtnListComponent } from './btn-list/btn-list.component';
import { BtnDialogComponent } from './btn-dialog/btn-dialog.component';
import { BtnSnackComponent } from './btn-snack/btn-snack.component';
import { BtnActionPanelComponent } from './btn-action-panel/btn-action-panel.component';

@NgModule({
	declarations: [
		BtnListComponent,
		BtnDialogComponent,
		BtnSnackComponent,
		BtnActionPanelComponent
	],
	imports: [
		CommonModule,
		BtnsRoutingModule,
		MatToolbarModule,
		MatButtonModule,
		MatCardModule,
		MatInputModule,
		MatDialogModule,
		MatDividerModule,
		MatChipsModule,
		MatSelectModule,
		MatExpansionModule,
		MatListModule,
		MatCheckboxModule,
		MatSnackBarModule,
		FormsModule,
		ReactiveFormsModule
	],
	// providers: [
	// 	{
	// 		provide: HTTP_INTERCEPTORS,
	// 		useClass: TokenInterceptor,
	// 		multi: true
	// 	}
	// ],
	entryComponents: [
		BtnDialogComponent
	]
})
export class BtnsModule { }
