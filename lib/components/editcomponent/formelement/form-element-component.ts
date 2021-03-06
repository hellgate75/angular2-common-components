import {
  Component, ElementRef, AfterContentInit, Inject, Input, Output, EventEmitter, OnChanges,
  SimpleChanges, ViewEncapsulation
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { ItemChange, FormField, Cloneable } from '../../../models/models';

declare var jQuery: any;
declare var JSON: any;

/* tslint:disable */
@Component({
  selector: 'edit-element',
  providers: [ NgModel ],
  templateUrl: './form-element-component.html',
  host: {'style' : 'width: 100%'},
  encapsulation: ViewEncapsulation.None
})
/* tslint:enable */
export class EditElementComponent implements AfterContentInit, OnChanges {
  @Input() value: any;
  @Input() meta: FormField;
  @Input() elements:  Map<string, Cloneable[]>;
  @Output() changed: EventEmitter<ItemChange>;
  required: boolean = false;
  field: string = '';
  type: string = '';
  subType: string = '';
  name: string = '';
  elementsProto: any;
  mapProto: any;

  private _optionValues: any = {};

  constructor(@Inject(ElementRef) private elementRef: ElementRef) {
    this.changed = new EventEmitter<any>();
  }

  isShown(): boolean {
    return this.meta.type !== 'hidden';
  }

  valueChanged(value: any, valid: boolean): void {
    let change: ItemChange = new ItemChange();
    change.key = this.field;
    change.value = value;
    change.valid = valid;
    this.changed.emit(change);
  }

  getLinkedValues(): Cloneable[] {
    if (!!this.elements) {
      return this.elements.get(this.meta.linkedService);
    }
    return [];
  }

  getOptionListKey(option: any, itemId?: any): any {
    if (!!itemId) {
      return option[itemId];
    }
    return option[this.elementsProto.id];
  }

  getOptionListValue(option: any, itemId?: any): any {
    if (!!itemId) {
      return option[itemId];
    }
    return option[this.elementsProto.name];
  }

  getOptionListSelected(option: any, itemId?: any, value?: any): any {
    if (!!itemId) {
      return this.getOptionListValue(option, itemId) === value;
    }
    return option[this.elementsProto.id] === this.value;
  }

  getOptionMapKey(option: any): any {
    let mapMeta = this.mapProto.fields.filter( (item: any) => {
      return item.index === 'id';
    } )[0];
    if (!!mapMeta) {
      return option[mapMeta.field];
    }
    return null;
  }

  getOptionMapValue(option: any): any {
    let mapMeta = this.mapProto.fields.filter( (item: any) => {
      return item.index === 'value';
    } )[0];
    if (!!mapMeta) {
      return option[mapMeta.mapField];
    }
    return null;
  }

  getOptionValueKey(option: any): any {
    let mapMeta = this.mapProto.fields.filter( (item: any) => {
      return item.index === 'value';
    } )[0];
    if (!!mapMeta) {
      return mapMeta.field;
    }
    return null;
  }

  getOptionIdKey(option: any): any {
    let mapMeta = this.mapProto.fields.filter( (item: any) => {
      return item.index === 'id';
    } )[0];
    if (!!mapMeta) {
      return mapMeta.field;
    }
    return null;
  }

  get optionValues(): any {
    return this._optionValues;
  }

  set optionValues(elem: any) {
    if (!!this.value && !!this.value.forEach) {
      this.value.forEach( (option: any, index: number) => {
        let mapMeta = this.mapProto.fields.filter( (item: any) => {
          return item.index === 'value';
        } )[0];
        if (!!mapMeta) {
          this._optionValues[index][mapMeta.field] = elem[mapMeta.field];
          option[mapMeta.field] = elem[mapMeta.field];
        }
      });
    }
  }

  textKeyDown(event: any): void {
    let value: string = event.target.value;
    this.valueChanged(value, (!this.required || !!value.length));
  }
  textMapKeyDown(event: any, index: number, item: any): void {
    let value: string = event.target.value;
    if (!!item) {
      item[this.getOptionValueKey(item)] = value;
    }
    this._optionValues[index][this.getOptionValueKey(item)] = value;
    this.valueChanged(this.value, (!this.required || !!value.length));
  }

  listSelect(event: any): void {
    let value: string = event.target.value;
    this.valueChanged(value, (!this.required || !!value.length));
  }

  listSelectMap(event: any, index: number, item: any): void {
    let value: any = event.target.value;
    if (!!item) {
      item[this.getOptionIdKey(item)] = value;
    }
    this._optionValues[index][this.getOptionIdKey(item)] = value;
  }

  removeItem(index: number, item: any): void {
    if (!!item) {
      this.value.splice(index, 1);
    }
    this._optionValues[index] = undefined;
  }

  addItem(): void {
    let newValue: any = null;
    let mapMetaIndex = this.mapProto.fields.filter( (item: any) => {
      return item.index === 'id';
    } )[0];
    let mapMeta = this.mapProto.fields.filter( (item: any) => {
      return item.index === 'value';
    } )[0];
    if (!!mapMeta && !!mapMetaIndex) {
      newValue = {};
      newValue[mapMeta.field] = null;
      let firstLinked: any = this.getLinkedValues()[0];
      newValue[mapMetaIndex.field] = firstLinked[this.getOptionIdKey(firstLinked)];
    }
    if (!!newValue) {
      this._optionValues[this.value.length] = newValue;
      this.value.push(newValue);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!this.meta && !!this.meta.type) {
      if (this.meta.type === 'map' || this.meta.type === 'list') {
        this.ngAfterContentInit();
      }
    }
  }

  ngAfterContentInit(): void {
    if (!this.meta) {
      throw 'EditElementComponent: unable to load meta data ...';
    }
    this.required = this.meta.required || false;
    this.field = this.meta.id || '';
    this.name = this.meta.name || '';
    this.type = this.meta.type || '';
    this.subType = this.meta.subType || '';
    if (!this.meta.linkedId) {
      this.elementsProto = {id: '', name: ''};
    } else {
      this.elementsProto = {id: this.meta.linkedId, name: (this.meta.linkedDesc || this.meta.linkedId)};
    }
    this.mapProto = {fields: []};
    if ( !!this.meta.mapType) {
      let mapFields: string[] = this.meta.mapType.split(',');
      mapFields.forEach( (next: string) => {
        if (next.indexOf('#') > 0) {
          if (next.indexOf(':') > 0) {
            // linear field link association
            let linearIndex: string[] = next.split('#');
            let fieldMap = linearIndex[1].split(':');
            this.mapProto.fields.push({index: linearIndex[0], field: fieldMap[0], mapField: fieldMap[1]});
          } else if (next.indexOf('@') > 0) {
            // type field association
            let typedIndex: string[] = next.split('#');
            let typeMap = typedIndex[1].split(':');
            let typeElem = typeMap[1].split('@');
            this.mapProto.fields.push({index: typedIndex[0], field: typeMap[0], mapField: typeElem[0], type: typeElem[1]});
          }
        }
      });
      if (!!this.value && !!this.value.forEach) {
        this.value.forEach( (option: any, index: number) => {
          let mapMetaIndex = this.mapProto.fields.filter( (item: any) => {
            return item.index === 'id';
          } )[0];
          let mapMeta = this.mapProto.fields.filter( (item: any) => {
            return item.index === 'value';
          } )[0];
          if (!!mapMeta && !!mapMetaIndex) {
            this._optionValues[index] = {};
            this._optionValues[index][mapMeta.field] = option[mapMeta.field];
            this._optionValues[index][mapMetaIndex.field] = option[mapMetaIndex.field];
          }
        });
      }
    }
  }

}
