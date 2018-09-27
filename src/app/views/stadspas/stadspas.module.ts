import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { StadspasProfessionalComponent } from './stadspas-professional.component';
import { StadspasBurgerComponent } from './stadspas-burger.component';
import { StadspasListComponent } from './stadspas-list.component';
import { StadspassenComponent } from './stadspas-batch.component';
import { StadspasLetterComponent } from './letters/stadspas-letter.component';

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
    StadspasBurgerComponent,
    StadspasProfessionalComponent,
    StadspasListComponent,
    StadspasLetterComponent,
    StadspassenComponent
  ]
})
export class StadspasModule { }
