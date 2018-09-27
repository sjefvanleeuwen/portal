import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { StadspasBurgerComponent } from './stadspas-burger.component';
import { StadspasProfessionalComponent } from './stadspas-professional.component';
import { StadspassenComponent } from './stadspas-batch.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Stadspas'
    },
    children: [
      {
        path: 'stadspas-prof',
        component: StadspasProfessionalComponent,
        data: {
          title: 'Professional'
        }
      },
      {
        path: 'stadspas-burger',
        component: StadspasBurgerComponent,
        data: {
          title: 'Burger'
        }
      },
      {
        path: 'stadspassen',
        component: StadspassenComponent,
        data: {
          title: 'Batch'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StadspasRoutingModule {}
