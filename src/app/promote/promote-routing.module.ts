import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromotePage } from './promote.page';

const routes: Routes = [
  {
    path: '',
    component: PromotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromotePageRoutingModule {}
