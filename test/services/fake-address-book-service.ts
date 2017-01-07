import {Injectable} from '@angular/core';
import {Contact, Item, ContactType} from '../models/address-book-models';
import {Request, Filter, FILTER_TYPE, Sorter, Pager, REQUEST_TYPE} from '../../src/common/models/back-end-model';
import {Cloneable} from '../../src/common/models/base-model';
import {Subject} from 'rxjs';
import { CONTACTS_SERVICE, CONTACT_TYPES_SERVICE, COUNTRIES_SERVICE } from '../../src/common/shared/constants';

let requiredContacts: any[] = require('../samples/address-book.json');
let requiredContactTypes: any[] = require('../samples/contacts.json');
let requiredCountries: any[] = require('../samples/countries.json');

@Injectable()
export class FakeAddressBookService {
  contacts: Contact[];
  contactTypes: Item[];
  countries: Item[];
    constructor() {
      this.reload();
    }

  reload(): void {
    this.contacts = [];
    /* tslint:disabled */
    requiredContacts['people'].forEach(
      (contact: any, index: number) => { this.contacts.push(new Contact(contact)); }
    );
    this.contactTypes = [];
    requiredContactTypes['contacts'].forEach(
      (item: any, index: number) => { this.contactTypes.push(new Item(item)); }
    );
    this.countries = [];
    requiredCountries['countries'].forEach(
      (item: any, index: number) => { this.countries.push(new Item(item)); }
    );
    /* tslint:enabled */
  }

  filterCollection(list: Cloneable[], request: Request): Cloneable[] {
    let newCollection: Cloneable[] = list;
    if (request.requestType === REQUEST_TYPE.QUERY) {
      if (!!request.filter) {
        if (request.filter.type === FILTER_TYPE.FULL_TEXT) {
          newCollection = newCollection.filter(
              (next: Cloneable) => {
                let found: boolean = false;
                for (let attr: any in next ) {
                  if (next.hasOwnProperty(attr)) {
                    if ( ('' + next[attr]).indexOf(request.filter.fullText) >= 0 ) {
                      found = true;
                    }
                  }
                }
                return found;
              }
            );
        }
        else if (request.filter.type === FILTER_TYPE.KEYVALUE) {
          newCollection = newCollection.filter(
            (next: Cloneable) => {
              let found: boolean = false;
              if (next.hasOwnProperty(request.filter.searchKey)) {
                if ( ('' + next[request.filter.searchKey]).indexOf(request.filter.searchValue) >= 0 ) {
                  return true;
                }
              }
              return false;
            }
          );
        }
      }
    }
    newCollection = (request.sorter ? newCollection.filter((keyword: any, index: number) => newCollection.lastIndexOf(keyword) === index).sort (
      (prev: Cloneable, next: Cloneable) => {
        if ( next.hasOwnProperty(request.sorter.key) ) {
          if (!!request.sorter.ascending) {
            return next[request.sorter.key] < prev[request.sorter.key] ? 1 : (next[request.sorter.key] > prev[request.sorter.key] ? -1 : 0);
          } else {
            return next[request.sorter.key] > prev[request.sorter.key] ? 1 : (next[request.sorter.key] < prev[request.sorter.key] ? -1 : 0);
          }
        }
        return 0;
      }
    ) : newCollection);
    if (!!request.paging) {
      let currentIndex = ((request.paging.current()-1)*request.paging.size);
      if (currentIndex<0) {
        currentIndex = 0;
      }
      newCollection = newCollection.slice(currentIndex, currentIndex + request.paging.size);
    }
    return newCollection;
  }

  getContacts(sortRule?: Sorter, pager?: Pager): Subject<Contact[]> {
    let request: Request = Request.AsFullItemList(CONTACT_TYPES_SERVICE, sortRule, pager);
    let create: Subject<Contact[]> = new Subject<Contact[]>();
    setTimeout(function () {
      create.next(this.filterCollection(this.contacts, request));
    }.bind(this), 1500);
    return create;
  }

  getContactFullTextSize(text: string): Subject<number> {
    let notifier: Subject<number> = new Subject<number>();
    let filter: Filter = new Filter(FILTER_TYPE.FULL_TEXT);
    filter.fullText = text;
    let request: Request = Request.AsQuery(CONTACTS_SERVICE, filter);
    setTimeout(function () {
        notifier.next(this.filterCollection(this.contacts, request).length);
    }.bind(this), 1500);
    return notifier;
  }

  getContactSize(): Subject<number> {
    let notifier: Subject<number> = new Subject<number>();
    setTimeout(function () {
      notifier.next(this.contacts.length);
    }.bind(this), 1500);
    return notifier;
  }

  addContact(contact: Cloneable): Subject<boolean> {
    let create: Subject<boolean> = new Subject<boolean>();
    this.contacts.push(<Contact>contact.clone());
    setTimeout(function () {
      create.next(true);
    }, 1500);
    return create;
  }

  updateContact(contact: Cloneable): Subject<boolean> {
    let create: Subject<boolean> = new Subject<boolean>();
    let contactOrig: Contact = <Contact>this.contacts.filter(
      ( item, Cloneable ) => {
        return item.id === contact.id;
      }
    )[0];
    let index: number = this.contacts.indexOf(contactOrig);
    if (index >= 0 ) {
      this.contacts[index] = <Contact>contact.clone();
    }
    setTimeout(function () {
      create.next(index >= 0);
    }, 1500);
    return create;
  }

  deleteContact(contact: Cloneable): Subject<boolean> {
    let create: Subject<boolean> = new Subject<boolean>();
    let contactOrig: Contact = <Contact>this.contacts.filter(
      ( item, Cloneable ) => {
        return item.id === contact.id;
      }
    )[0];
    let index: number = this.contacts.indexOf(contactOrig);
    if (index >= 0 ) {
      this.contacts.splice(index, 1);
    }
    setTimeout(function () {
      create.next(index >= 0);
    }, 1500);
    return create;
  }

  getContactsByFullText(text: string, sortRule?: Sorter, pager?: Pager): Subject<Contact[]> {
    if (!text || !text.length) {
      return this.getContacts(sortRule, pager);
    } else {
      let create: Subject<Contact[]> = new Subject<Contact[]>();
      let filter: Filter = new Filter(FILTER_TYPE.FULL_TEXT);
      filter.fullText = text;
      let request: Request = Request.AsQuery(CONTACTS_SERVICE, filter, sortRule, pager);
      setTimeout(function () {
        create.next(this.filterCollection(this.contacts, request));
      }.bind(this), 1500);
      return create;
    }
  }

  getContactTypes(): Subject<Item[]> {
      let create: Subject<Item[]> = new Subject<Item[]>();
      let request: Request = Request.AsFullItemList(CONTACT_TYPES_SERVICE);
    setTimeout(function () {
      create.next(this.filterCollection(this.contactTypes, request));
    }.bind(this), 1500);
      return create;
    }

    getCountries(): Subject<Item[]> {
      let create: Subject<Item[]> = new Subject<Item[]>();
      let request: Request = Request.AsFullItemList(COUNTRIES_SERVICE);
      setTimeout(function () {
        create.next(this.filterCollection(this.countries, request));
      }.bind(this), 1500);
      return create;
    }

}
