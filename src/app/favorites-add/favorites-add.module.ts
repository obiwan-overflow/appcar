import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesAddPageRoutingModule } from './favorites-add-routing.module';

import { FavoritesAddPage } from './favorites-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesAddPageRoutingModule
  ],
  declarations: [FavoritesAddPage]
})
export class FavoritesAddPageModule {}
