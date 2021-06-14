import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeepBreathsPage } from './deep-breaths.page';

const routes: Routes = [
  {
    path: '',
    component: DeepBreathsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeepBreathsPageRoutingModule {}
