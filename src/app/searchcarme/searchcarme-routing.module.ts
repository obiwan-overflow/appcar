import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchcarmePage } from './searchcarme.page';

const routes: Routes = [
  {
    path: '',
    component: SearchcarmePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchcarmePageRoutingModule {}
