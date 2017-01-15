import {Component, ElementRef, Inject, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import { AuthService } from '../../../index';
import {Input} from "@angular/core";
import {EventEmitter} from "@angular/core";
import { DialogOpenEvent, EventItem } from '../../models/base-model';

@Component({
  selector: 'app-user-status',
  providers: [],
  templateUrl: './user.status.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UserStatusComponent {
  @Input() loginActivator: EventEmitter<DialogOpenEvent>;
  title: string = 'SlamRe';
  constructor(/*@Inject(AuthService) private authService: AuthService,*/
              @Inject(Router) private router: Router,
              @Inject(ElementRef) private elementRef: ElementRef) {
  }

  logout(): void {
    //this.authService.logout();
    this.router.navigate(['/main']);

  }
  userName(): string {
     //return this.authService.getUserName() || 'Guest';
    return  'Guest';
  }
  isLoggedOut(): boolean {
    //return !this.authService.isLogged();
    return true;
  }
  askForLogin(): void {
    if (!!this.loginActivator) {
      this.loginActivator.emit(new DialogOpenEvent({buttons: 2, buttonNames: [
        new EventItem('login', 'Login'),
        new EventItem('cancel', 'Cancel')
      ],
        width: 500,
        height: 400}));
    }
    console.log('Required Login');
  }
}
