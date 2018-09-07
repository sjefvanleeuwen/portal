import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { StadspasComponent } from './stadspas-individual.component';
import { StadspassenComponent } from './stadspas-batch.component';

// Buttons Routing
import { StadspasRoutingModule } from './stadspas-routing.module';

// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StadspasRoutingModule
  ],
  declarations: [
    StadspasComponent,
    StadspassenComponent
  ]
})
export class StadspasModule { }
