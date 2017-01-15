import { uuid } from '../utils/uuid';
import {Subject} from 'rxjs/Rx';
import {Injectable} from '@angular/core';

export class Cloneable {
  id: string;
  constructor(object: any) {
    this.id = object.id               || uuid();
  }
  clone(): Cloneable {
    return new Cloneable(this);
  }
}
export interface Reversible {
  reverse(object: any): void;
}
export class ItemChange {
  key: string;
  value: any;
  valid: boolean;
}
export interface ICloneableConstructor<T extends Cloneable> {
  new(object: any): T;
}
export class CloneableCreator<T extends Cloneable> {
  constructor(private newInstance: ICloneableConstructor<T>) {
  }
  getNewInstance(object: any): T {
    return new this.newInstance(object);
  }
}
export class Factory {

  static newCloneable<T extends Cloneable>(object: any, creator: CloneableCreator<T>): T {
    return creator.getNewInstance(object);
  }
}
export class SortMeta {
  id: string;
  name: string;
  sort: number;
  default: boolean;
  cortocircuit: boolean;
}
export class FormField {
  id: string;
  name: string;
  type: string;
  required: boolean;
  subType: string;
  mapType: string;
  linkedService: string;
  linkedId: string;
  linkedDesc: string;
}
export class FormMeta {
  service: string;
  fields: FormField[];
}
export class Metadata {
  sorting: SortMeta[];
  meta: FormMeta;
}
let routeConvertion: Function = function(object: any): RouteDescriptor[] {
  if (!!object) {
    if ( typeof object.forEach === 'function' ) {
      let newRoutes: RouteDescriptor[] = [] ;
      object.forEach( (item: any) => {
        newRoutes.push(new RouteDescriptor(item));
      });
      return newRoutes;
    } else {
      return [new RouteDescriptor(object)];
    }
  }
  return null;
};

export class RouteChangeNotification {
  routeId: string;
  routeEnabled: boolean;
}

export class RouteDescriptor {
  id: string;
  name: string;
  url: string;
  description: string;
  subRoutes: RouteDescriptor[];
  routeChangeSubject: Subject<RouteChangeNotification>;
  disabled: boolean = false;
  hidden: boolean = false;

  constructor(object: any) {
    this.id = object.id                                 || uuid();
    this.name = object.name                             || '';
    this.url = object.url                               || '';
    this.description = object.description               || '';
    this.subRoutes = routeConvertion(object.subRoutes)  || [];
    this.routeChangeSubject = object.routeChangeSubject || null;
  }

  applyNotification(): Subject<RouteChangeNotification> {
    if (!this.routeChangeSubject) {
      this.routeChangeSubject = new Subject<RouteChangeNotification>();
    }
    return this.routeChangeSubject;
  }

  removeNotification(): void {
    if (this.routeChangeSubject) {
      this.routeChangeSubject = null;
    }
  }

  clone(): RouteDescriptor {
    return new RouteDescriptor(this);
  }

}
export class EventItem {
  name: string;
  description: string;
  constructor(name: string, description?: string) {
    this.name = name                      || '';
    this.description = description        || this.name;
  }
}
export class DialogOpenEvent {
  buttons: number;
  buttonNames: EventItem[];
  width: number;
  height: number;
  openEffectDuration: number;
  openEffectType: string;
  openEffectDiretion: string;
  closeEffectDuration: number;
  closeEffectType: string;
  closeEffectDiretion: string;

  constructor(object: any) {
      this.buttons = object.buttons                                || 1;
      this.buttonNames = object.buttonNames                        || [new EventItem("close", "Close")];
      this.width = object.width                                    || 100;
      this.height = object.height                                  || 100;
      this.openEffectDuration = object.openEffectDuration          || 250;
      this.openEffectType = object.openEffectType                  || 'slide';
      this.openEffectDiretion = object.openEffectDiretion          || 'up';
      this.closeEffectDuration = object.closeEffectDuration        || this.openEffectDuration;
      this.closeEffectType = object.closeEffectType                || this.openEffectType;
          this.closeEffectDiretion = object.closeEffectDiretion    || this.openEffectDiretion;
  }
}
@Injectable()
export class DescriptorFactory {
  constructor() {

  }
  loadRouteDescriptors(): RouteDescriptor[] {
    let routeDescriptors: RouteDescriptor[] = [];
    let routeObjects: any[] = [
      {
        id: 'main',
        name: 'Home',
        url: '/main',
        description: 'Go to the Login',
        subRoutes: [
          {
            id: 'login',
            name: 'Login',
            url: '/login',
            description: 'Go to the Login',
            subRoutes: [ ]
          }    ]
      }
    ];
    routeObjects.forEach( (item: any) => { routeDescriptors.push(new RouteDescriptor(item)); });
    return routeObjects;
  }
}
