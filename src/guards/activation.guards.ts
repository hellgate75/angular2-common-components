import {Injectable, Inject} from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import {USER_BIND_AUTH_SERVICE} from '../shared/constants';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate, CanActivateChild {

  constructor(@Inject(USER_BIND_AUTH_SERVICE) private authService: AuthService,
              @Inject(Router) private router: Router) {
  }

  canActivate() : boolean {
    let isLoggedIn: boolean = this.authService.isLogged();
    if (!isLoggedIn) {
      this.router.navigate(['/unauthorized']);
    }
    return isLoggedIn;
  }
  canActivateChild(): boolean {
    return this.canActivate();
  }
}
