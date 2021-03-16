import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarallPage } from './carall.page';

const routes: Routes = [
  {
    path: '',
    component: CarallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarallPageRoutingModule {}
