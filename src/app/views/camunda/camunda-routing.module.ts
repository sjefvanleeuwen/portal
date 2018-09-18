import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { CamundaComponent } from './camunda.component';

const routes: Routes = [
  {
    path: '',
    component: CamundaComponent,
    data: {
      title: 'Processes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamundaRoutingModule {}
