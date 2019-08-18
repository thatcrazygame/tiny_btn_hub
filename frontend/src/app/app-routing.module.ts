import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './callback.component';


const routes: Routes = [
	{
		path: 'btns',
		loadChildren: () => import('./btns/btns.module').then(mod => mod.BtnsModule)
	},
	{
		path: 'devices',
		loadChildren: () => import('./devices/devices.module').then(mod => mod.DevicesModule)
	},
	{
		path: 'actions',
		loadChildren: () => import('./actions/actions.module').then(mod => mod.ActionsModule)
	},
	{
		path: 'groups',
		loadChildren: () => import('./groups/groups.module').then(mod => mod.GroupsModule)
	},
	{
		path: 'commands',
		loadChildren: () => import('./commands/commands.module').then(mod => mod.CommandsModule)
	},
	{
		path: '',
		redirectTo: 'btns',
		pathMatch: 'full'
	},
	{
		path: 'callback',
		component: CallbackComponent
	}
];

@NgModule({
    declarations: [
        CallbackComponent,
    ],
	imports: [
        RouterModule.forRoot(routes)
    ],
	exports: [RouterModule]
})
export class AppRoutingModule { }
