import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamundaComponent } from './camunda.component';
import { CamundaRoutingModule } from './camunda-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    CamundaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [CamundaComponent]
})
export class CamundaModule { }
