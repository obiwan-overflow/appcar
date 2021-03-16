import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritesAddPage } from './favorites-add.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritesAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesAddPageRoutingModule {}
