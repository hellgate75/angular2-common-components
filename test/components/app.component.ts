import { Component, ViewEncapsulation } from '@angular/core';

import { PageNotFoundComponent, UnAuthotorizedComponent } from '../../index';

declare var $: any;

@Component({
  selector: 'app-root',
  providers: [ PageNotFoundComponent, UnAuthotorizedComponent ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Angular2 Common Components Test Page';

  constructor() {
  }
}
