import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialServicePageRoutingModule } from './special-service-routing.module';

import { SpecialServicePage } from './special-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialServicePageRoutingModule
  ],
  declarations: [SpecialServicePage]
})
export class SpecialServicePageModule {}
