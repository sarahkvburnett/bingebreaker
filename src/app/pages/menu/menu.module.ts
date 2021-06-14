import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import {WelcomePageModule} from '../welcome/welcome.module';

const routes: Routes = [
  {
    path:'',
    component: MenuPage,
    children: [
      {
        path: 'welcome',
        loadChildren: () => import('../welcome/welcome.module').then(m => m.WelcomePageModule)
      }, {
        path: 'ground-yourself',
        loadChildren: () => import('../ground-yourself/ground-yourself.module').then(m => m.GroundYourselfPageModule)
      }, {
        path: 'deep-breaths',
        loadChildren: () => import('../deep-breaths/deep-breaths.module').then(m => m.DeepBreathsPageModule)
      }, {
        path: 'gallery',
        loadChildren: () => import('../gallery/gallery.module').then(m => m.GalleryPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    RouterModule.forChild(routes),
    WelcomePageModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
