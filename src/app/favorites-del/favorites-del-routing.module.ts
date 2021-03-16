import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritesDelPage } from './favorites-del.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritesDelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesDelPageRoutingModule {}
