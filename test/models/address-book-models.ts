import { uuid } from '../../src/common/utils/uuid';
import { Cloneable, Reversible } from '../../src/common/models/base-model';

export class Item extends  Cloneable implements Reversible {
  type: string;
  value: string;
  constructor(object: any) {
    super(object);
    this.type = object.type    || '';
    this.value = object.value  || '';
  }
  toString(): string {
    return '{id: "' + this.id + '", type: "' + this.type + '", value: "' + this.value + '"}';
  }
  clone(): Item {
    return new Item(this);
  }
  reverse(object: any): void {
    this.id = object.id        || uuid();
    this.type = object.type    || '';
    this.value = object.value  || '';
  }
}

export class ContactType extends  Cloneable implements Reversible {
  type: string;
  value: string;
  constructor(object: any) {
    super(object);
    this.type = object.type        || '';
    this.value = object.value      || '';
  }
  toString(): string {
    return '{type: "' + this.type + '", value: "' + this.value + '"}';
  }
  clone(): ContactType {
    return new ContactType(this);
  }
  reverse(object: any): void {
    this.id = object.id            || uuid();
    this.type = object.type        || '';
    this.value = object.value      || '';
  }
}

export class Contact extends  Cloneable implements Reversible {
  firstname: string;
  surname: string;
  address: string;
  city: string;
  county: string;
  country: string;
  contacts: ContactType[];
  constructor(object: any) {
    super(object);
    this.firstname = object.firstname      || '';
    this.surname = object.surname          || '';
    this.address = object.address          || '';
    this.city = object.city                || '';
    this.county = object.county            || '';
    this.country = object.country          || 'IT';
    this.contacts = object.contacts ? object.contacts.map((current: any) => { return new ContactType(current); } ) : []  || [];
  }
  getName(): string {
    return this.surname + ' ' + this.firstname;
  }
  clone(): Contact {
    return new Contact(this);
  }
  reverse(object: any): void {
    this.id = object.id                    || uuid();
    this.firstname = object.firstname      || '';
    this.surname = object.surname          || '';
    this.address = object.address          || '';
    this.city = object.city                || '';
    this.county = object.county            || '';
    this.country = object.country          || 'IT';
    this.contacts = object.contacts ? object.contacts.map((current: any) => { return new ContactType(current); } ) : []  || [];
  }
  /* tslint:disable*/
  static empty(): Contact {
    return new Contact( { });
  }
  /* tslint:enable*/
}
