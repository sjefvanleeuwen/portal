import { User } from './../../models/dto/user';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})

export class LoginComponent {
  public model: User = new User();

  constructor(private authService: AuthService) {
  }

  public login() {
    this.authService.loginProfessional(this.model.userName, this.model.password);
  }
}
