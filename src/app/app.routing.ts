import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'professional',
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: 'irma',
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'professional',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'stadspas',
        loadChildren: './views/stadspas/stadspas.module#StadspasModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'processes',
        loadChildren: './views/camunda/camunda.module#CamundaModule'
      },
      {
        path: 'irma',
        loadChildren: './views/irma/irma.module#IrmaModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
