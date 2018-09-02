import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
})

// Adapted from: https://damienbod.com/2016/03/02/angular2-openid-connect-implicit-flow-with-identityserver4/
// https://github.com/damienbod/AspNet5IdentityServerAngularImplicitFlow/tree/master/src/AngularClient
export class LoginComponent { 
  login() {
    alert("Please implement IdentityServer4");
  }
}
