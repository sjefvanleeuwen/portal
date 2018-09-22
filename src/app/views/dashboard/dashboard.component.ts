import { DefaultLayoutComponent } from './../../containers/default-layout/default-layout.component';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private layout: DefaultLayoutComponent) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
}
