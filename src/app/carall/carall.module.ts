import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarallPageRoutingModule } from './carall-routing.module';

import { CarallPage } from './carall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarallPageRoutingModule
  ],
  declarations: [CarallPage]
})
export class CarallPageModule {}
