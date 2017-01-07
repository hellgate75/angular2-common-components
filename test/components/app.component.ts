import { Component, ViewEncapsulation } from '@angular/core';

import { PageNotFoundComponent, UnAuthotorizedComponent } from '../../index';

import { AddressBookComponent } from './addressbook/app.addressbook.component';

declare var $: any;

@Component({
  selector: 'app-root',
  providers: [ PageNotFoundComponent, UnAuthotorizedComponent, AddressBookComponent ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Angular2 Common Components Test Page';

  constructor() {
  }
}
