import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BtnListComponent } from './btn-list/btn-list.component';

const routes: Routes = [
	{
		path: '',
		component: BtnListComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BtnsRoutingModule { }
