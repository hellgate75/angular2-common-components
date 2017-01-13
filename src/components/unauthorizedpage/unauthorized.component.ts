import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-unauthorized-page',
  templateUrl: './unauthorized.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UnAuthotorizedComponent {
  title: string = 'Page Not Authorized!';
  description: string = 'Please login before access this content!!';
  constructor() {
   }
}
