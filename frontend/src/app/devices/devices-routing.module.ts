import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceListComponent } from './device-list/device-list.component'
import { DeviceTypesComponent } from './device-types/device-types.component'

const routes: Routes = [
    {
        path: '',
        component: DeviceListComponent
    },
    {
        path: 'types',
        component: DeviceTypesComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
