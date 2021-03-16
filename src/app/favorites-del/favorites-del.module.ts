import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesDelPageRoutingModule } from './favorites-del-routing.module';

import { FavoritesDelPage } from './favorites-del.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesDelPageRoutingModule
  ],
  declarations: [FavoritesDelPage]
})
export class FavoritesDelPageModule {}
