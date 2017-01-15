import {Component, ViewEncapsulation, Inject} from '@angular/core';
import {AuthService} from '../../services/auth-service';
import {USER_BIND_AUTH_SERVICE} from '../../shared/constants';

@Component({
  selector: 'app-welcome-page',
  providers: [  ],
  templateUrl: './app.welcome.component.html',
  encapsulation: ViewEncapsulation.None
})
export class WelcomeComponent {
  title: string = 'Welcome ';
  title2: string = '!';
  description: string = `This is a simple Router navigation application. 
This app is adaptative but it is not completely mobile-friendly`;
  constructor(
    /*@Inject(AuthService) private authService: AuthService*/ ) {
  }
  username(): string {
    return 'Fabrizio';
    //return this.authService.getUserName() || 'Guest';
  }
}
