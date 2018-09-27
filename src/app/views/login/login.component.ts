import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
})

export class LoginComponent {

  constructor(private authService: AuthService) {
  }

  public login() {
    this.authService.loginProfessional(826125);
  }
}
