/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CamundaComponent } from './camunda.component';

describe('CamundaComponent', () => {
  let component: CamundaComponent;
  let fixture: ComponentFixture<CamundaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamundaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamundaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
