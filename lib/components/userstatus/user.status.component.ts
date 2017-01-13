import {Component, ElementRef, Inject, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {USER_BIND_AUTH_SERVICE} from '../../shared/constants';

import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-user-status',
  providers: [],
  templateUrl: './user.status.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UserStatusComponent {
  elementRef: ElementRef;
  constructor(@Inject(USER_BIND_AUTH_SERVICE) public authService: AuthService,
              @Inject(Router) private router: Router,
              @Inject(ElementRef) elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  logout(): boolean {
    this.authService.logout();
    this.router.navigate(['/main'])
     return false;
  }
}
