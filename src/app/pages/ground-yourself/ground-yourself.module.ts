import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroundYourselfPageRoutingModule } from './ground-yourself-routing.module';

import { GroundYourselfPage } from './ground-yourself.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroundYourselfPageRoutingModule
  ],
  declarations: [GroundYourselfPage]
})
export class GroundYourselfPageModule {}
