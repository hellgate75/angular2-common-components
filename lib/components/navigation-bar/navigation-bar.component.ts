import {Component, AfterContentInit, Inject, Input, ElementRef, ViewEncapsulation} from '@angular/core';
import { Location } from '@angular/common';

import { RouteDescriptor, DescriptorFactory } from '../../models/base-model';

@Component( {
  selector: 'navigation-bar',
  providers: [],
  templateUrl: './navigation-bar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NavigationBarComponent implements AfterContentInit {

  @Input() routes: RouteDescriptor[];

  constructor(
    private location: Location,
    @Inject(ElementRef) private elementRef: ElementRef ) {
  }

  getLinkStyle(route: RouteDescriptor): boolean {

    if (route.url === this.location.path()) {
      return true;
    } else if (route.url.length > 0) {
      return this.location.path().indexOf(route.url) > -1;
    }
  }

  ngAfterContentInit(): void {

  }
}
