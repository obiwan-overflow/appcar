import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialServicePage } from './special-service.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialServicePageRoutingModule {}
