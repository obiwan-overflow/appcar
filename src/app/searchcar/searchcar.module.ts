import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchcarPageRoutingModule } from './searchcar-routing.module';

import { SearchcarPage } from './searchcar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchcarPageRoutingModule
  ],
  declarations: [SearchcarPage]
})
export class SearchcarPageModule {}
