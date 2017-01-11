import { Component, ViewEncapsulation } from '@angular/core';

import { PageNotFoundComponent, UnAuthotorizedComponent } from '../../index';

import { AddressBookComponent } from './addressbook/app.addressbook.component';
import {NavigationBarComponent} from "../../src/common/components/navigation-bar/navigation-bar.component";
import {RouteDescriptor} from '../../src/common/models/models';

declare var $: any;

@Component({
  selector: 'app-root',
  providers: [ PageNotFoundComponent, UnAuthotorizedComponent, AddressBookComponent,
              NavigationBarComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Angular2 Common Components Test Page';
  routes: RouteDescriptor[] = [];
  constructor() {
    this.routes.push(new RouteDescriptor({name: 'Home', url: '/main', description: 'Home Page'}));
    this.routes.push(new RouteDescriptor({name: 'Login', url: '/login', description: 'Login Page'}));
    this.routes.push(new RouteDescriptor({name: 'Login 2', url: '/login', description: 'Login Page'}));
    this.routes.push(new RouteDescriptor({name: 'Home 2', url: '/main', description: 'Home Page'}));
  }
}
