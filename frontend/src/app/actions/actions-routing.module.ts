import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionListComponent } from './action-list/action-list.component'


const routes: Routes = [
    {
        path: '',
        component: ActionListComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsRoutingModule { }
