import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService, User } from './services/auth-service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedInUser
      .pipe(
        take(1),
        map((user: User) => {
          if (!user.loggedIn) {
            this.router.navigate(['/login']);
          }
          return user.loggedIn;
        })
      );
  }
}
