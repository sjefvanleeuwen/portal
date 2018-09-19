/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IrmaComponent } from './irma.component';

describe('IrmaComponent', () => {
  let component: IrmaComponent;
  let fixture: ComponentFixture<IrmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
