import { Component, AfterContentInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { Cloneable, Metadata, FormField } from '../../models/base-model';

declare var jQuery: any;


@Component({
  selector: 'item-list-table',
  providers: [ NgSwitch ],
  templateUrl: './itemslist.component.html',
  styleUrls: ['./itemslist.component.scss'],
})
export class ItemListComponent implements AfterContentInit, OnChanges {
  @Input() elements: Cloneable[];
  @Input() metadata: Metadata;
  @Input() references: Map<String, Cloneable[]>;

  @Output() update: EventEmitter<Cloneable>;
  @Output() delete: EventEmitter<Cloneable>;

  referenceMap: Map<string, string>;

  constructor() {
    this.update = new EventEmitter<Cloneable>();
    this.delete = new EventEmitter<Cloneable>();
    this.referenceMap = new Map<string, string>();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterContentInit(): void {
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

  getMetaFields(): FormField[] {
    return this.metadata.meta.fields;
  }

  getFieldValue(value: Cloneable, field: FormField): any {
    if (!!value && !!field) {
      return value[field.id] || 'Undefined';
    }
    return [];
  }

  getListItemValue(value: Cloneable, field: FormField): any {
    if (!!value && !!field) {
      let list: Cloneable[] = this.references.get(field.linkedService);
      if (!!list) {
        let selected: Cloneable = list.filter(
          (item: Cloneable) => {
            return field.hasOwnProperty(field.linkedId) ? item[field.linkedId] === value : false;
          }
        )[0];
        if (!! selected ) {
          return selected[field.linkedDesc];
        }
      }
    }
    return 'Undefined';
  }

  getMapItemValue(value: Cloneable, field: FormField): any {
    if (!!value && !!field) {
      let mapRef: any = {};
      let mapFields: string[] = field.mapType.split(',');
      mapFields.forEach( (next: string) => {
        if (next.indexOf('#') > 0) {
          if (next.indexOf(':') > 0) {
            // linear field link association
            let linearIndex: string[] = next.split('#');
            let fieldMap = linearIndex[1].split(':');
            mapRef[linearIndex[0]] = {field: fieldMap[0], mapField: fieldMap[1]};
          } else if (next.indexOf('@') > 0) {
            // type field association
            let typedIndex: string[] = next.split('#');
            let typeMap = typedIndex[1].split(':');
            let typeElem = typeMap[1].split('@');
            mapRef[typedIndex[0]] = {field: typeMap[0], mapField: typeElem[0], type: typeElem[1]};
          }
        }
      });
      return value[mapRef.value.field] || 'Undefined';
    }
    return 'Undefined';
  }

  getMapItemDesc(value: Cloneable, field: FormField): any {
    if (!!value && !!field) {
      let mapRef: any = {};
      let mapFields: string[] = field.mapType.split(',');
      mapFields.forEach( (next: string) => {
        if (next.indexOf('#') > 0) {
          if (next.indexOf(':') > 0) {
            // linear field link association
            let linearIndex: string[] = next.split('#');
            let fieldMap = linearIndex[1].split(':');
            mapRef[linearIndex[0]] = {field: fieldMap[0], mapField: fieldMap[1]};
          } else if (next.indexOf('@') > 0) {
            // type field association
            let typedIndex: string[] = next.split('#');
            let typeMap = typedIndex[1].split(':');
            let typeElem = typeMap[1].split('@');
            mapRef[typedIndex[0]] = {field: typeMap[0], mapField: typeElem[0], type: typeElem[1]};
          }
        }
      });
      let list: Cloneable[] = this.references.get(field.linkedService);
      if (!!list) {
        let selected: Cloneable = list.filter(
          (item: Cloneable) => {
            return field.hasOwnProperty(field.linkedId) ? item[field.linkedId] === value[mapRef.id.field] : false;
          }
        )[0];
        if (!! selected ) {
          return selected[field.linkedDesc];
        }
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
    return true;
  }

  deleteItem(itemtId: string): void {
    let item: Cloneable = this.elements.filter( (item: Cloneable) => { return item.id === itemtId; } )[0];
    this.delete.emit(item);
  }
  updateItem(itemtId: string): void {
    let item: Cloneable = this.elements.filter( (item: Cloneable) => { return item.id === itemtId; } )[0];
    this.update.emit(item.clone());
  }
}
