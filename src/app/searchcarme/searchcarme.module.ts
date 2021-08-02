import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchcarmePageRoutingModule } from './searchcarme-routing.module';

import { SearchcarmePage } from './searchcarme.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchcarmePageRoutingModule
  ],
  declarations: [SearchcarmePage]
})
export class SearchcarmePageModule {}
