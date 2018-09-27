import { IrmaRoutingModule } from './irma-routing.module';
import { NgModule } from '@angular/core';
import { IrmaComponent } from './irma.component';
import { NgxKjuaModule } from 'ngx-kjua';

@NgModule({
  imports: [
    IrmaRoutingModule,
    NgxKjuaModule
  ],
  exports: [
    IrmaComponent
  ],
  declarations: [ IrmaComponent ]
})
export class IrmaModule { }
