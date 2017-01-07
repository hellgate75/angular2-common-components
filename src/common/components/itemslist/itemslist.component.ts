import { Component, OnInit, Input, Output, Inject, EventEmitter, ElementRef } from '@angular/core';
import { Cloneable, Metadata, FormField } from '../../models/base-model';

declare var jQuery: any;


@Component({
  selector: 'app-address-book-table',
  providers: [],
  templateUrl: './itemslist.component.html',
  styleUrls: ['./itemslist.component.scss']
})
export class ItemListComponent implements OnInit {
  @Input() elements: Cloneable[];
  @Input() metadata: Metadata;
  @Input() references: Map<String, Cloneable[]>;

  @Output() update: EventEmitter<Cloneable>;
  @Output() delete: EventEmitter<Cloneable>;

  referenceMap: Map<string, string>;

  constructor(@Inject() private elementRef: ElementRef) {
    this.update = new EventEmitter<Cloneable>();
    this.delete = new EventEmitter<Cloneable>();
    this.referenceMap = new Map<string, string>();
  }



  ngOnInit(): void {
    if (!this.metadata) {
      throw 'ItemListComponent::ngOnInit() : Unable to access object metadata ....';
    }
    this.metadata.meta.fields.forEach(
      (field: FormField) => {
        if (field.type === 'list' || field.type === 'map') {
          this.referenceMap.set(field.id,  field.linkedService);
        }
      }
    );
  }

  getFieldValue(value: Cloneable, field: FormField): any {
    if (!!value && !!field) {
      return field.hasOwnProperty(field.id) ? field[field.id] : 'Undefined';
    }
    return 'Undefined'
  }

  getlistItemValue(value: Cloneable, field: FormField): any {
    if (!!value && !!field) {
      return field.hasOwnProperty(field.linkedId) ? field[field.linkedId] : 'Undefined';
    }
    return 'Undefined'
  }

  getListItemDesc(value: Cloneable, field: FormField): any {
    if (!!value && !!field) {
      if (this.references.has(field.linkedService)) {
        return field.hasOwnProperty(field.linkedDesc) ? field[field.linkedDesc] : 'Undefined';
      }
    }
    return 'Undefined';
  }

  isList(field: FormField): boolean {
    if (!!field) {
      return field.type === 'list';
    }
    return false;
  }

  isMap(field: FormField): boolean {
    if (!!field) {
      return field.type === 'map';
    }
    return false;
  }

  isShown(field: FormField): boolean {
    if (!!field) {
      return field.type !== 'hidden';
    }
    return false;
  }

  deleteItem(itemtId: string): void {
    let contact: Cloneable = this.elements.filter( (item: Cloneable) => { return item.id === itemtId; } )[0];
    this.delete.emit(contact);
  }
  updateItem(itemtId: string): void {
    let contact: Cloneable = this.elements.filter( (item: Cloneable) => { return item.id === itemtId; } )[0];
    this.update.emit(contact);
  }
}
