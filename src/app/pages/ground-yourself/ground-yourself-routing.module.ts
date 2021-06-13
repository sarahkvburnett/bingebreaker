import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroundYourselfPage } from './ground-yourself.page';

const routes: Routes = [
  {
    path: '',
    component: GroundYourselfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroundYourselfPageRoutingModule {}
