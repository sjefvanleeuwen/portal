import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { StadspasComponent } from './stadspas-individual.component';
import { StadspassenComponent } from './stadspas-batch.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Stadspas'
    },
    children: [
      {
        path: 'stadspas',
        component: StadspasComponent,
        data: {
          title: 'Persoonlijk'
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
