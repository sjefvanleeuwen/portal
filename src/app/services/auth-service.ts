import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { global } from '../app.globals';

export class User {
    public loggedIn: boolean;
    public isInwoner: boolean;
    public isProfessional: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
  private loggedInUser = new BehaviorSubject<User>(new User());

  get isLoggedInUser() {
    return this.loggedInUser.asObservable();
  }

  constructor(private router: Router) {}

  loginInwoner(bsn: number) {
    if (bsn) {
        const user = new User();
        user.loggedIn = true;
        user.isInwoner = true;
        this.loggedInUser.next(user);
        global.loggedInUser = user;
        this.router.navigate(['/stadspas/stadspas-burger']);
    }
  }

  loginProfessional(bsn: number) {
    if (bsn) {
        const user = new User();
        user.loggedIn = true;
        user.isProfessional = true;
        this.loggedInUser.next(user);
        global.loggedInUser = user;
        this.router.navigate(['/stadspas/stadspas-prof']);
        console.log('loginProfessional = ' + bsn);
    }
  }

  logout() {
    this.loggedInUser.next(new User());
    this.router.navigate(['/login']);
  }
}
