import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-page-not-found-page',
  templateUrl: './pagenotfound.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PageNotFoundComponent {
  title: string = 'Page Not Found!';
  description: string = 'Please follow-up the menu';
}
