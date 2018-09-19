import { IrmaRoutingModule } from './irma-routing.module';
import { NgModule } from '@angular/core';
import { IrmaComponent } from './irma.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from '../buttons/buttons.module';

@NgModule({
  imports: [
    IrmaRoutingModule,
    FormsModule,
  ],
  declarations: [ IrmaComponent ]
})
export class IrmaModule { }
