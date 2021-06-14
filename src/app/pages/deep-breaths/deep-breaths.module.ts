import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeepBreathsPageRoutingModule } from './deep-breaths-routing.module';

import { DeepBreathsPage } from './deep-breaths.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeepBreathsPageRoutingModule
  ],
  declarations: [DeepBreathsPage]
})
export class DeepBreathsPageModule {}
