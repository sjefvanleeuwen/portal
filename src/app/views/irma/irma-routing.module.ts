import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { IrmaComponent } from './irma.component';

const routes: Routes = [
  {
    path: '',
    component: IrmaComponent,
    data: {
      title: 'IRMA'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IrmaRoutingModule {}
