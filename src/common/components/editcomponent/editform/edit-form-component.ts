import {Component, ElementRef, AfterContentInit, Inject, Input } from '@angular/core';
import { EditElementComponent } from '../formelement/form-element-component';
import { Cloneable, ItemChange, FormField } from '../../../models/models';

declare var jQuery: any;

/* tslint:disable */
@Component({
  selector: 'edit-form',
  providers: [ EditElementComponent ],
  templateUrl: './edit-form-component.html',
  styleUrls: ['./edit-form-component.scss'],
  host: {'style' : 'width: 100%'}
})
/* tslint:enable */
export class EditFormComponent implements AfterContentInit {
  @Input() metaList: FormField[];
  @Input() linkedMap:  Map<string, Cloneable[]>;
  @Input() value: Cloneable;
  validityMap: any = {};

  constructor(@Inject(ElementRef) private elementRef: ElementRef) {
  }

  fieldChanged(change: ItemChange): void {
    if (!!change && this.value.hasOwnProperty(change.key)) {
      this.value[change.key] = change.value;
      this.validityMap[change.key] = change.valid;
    }
  }

  getReferenceValue(meta: any): any {
    return this.value.hasOwnProperty(meta.id) ? this.value[meta.id] : null;
  }

  evaluateRequiredValidity(field: FormField, value: any): boolean {
    if (field.type === 'map') {
      if (!!(<any[]>value).length) {
        return false;
      }
      (<any[]>value).filter(
        (value: any) => {
          let valid: boolean = true;
          let key: any;
          for(key in value) {
            if (value[key] === undefined || value[key] === '' || value[key] === null) {
              valid = false;
              break;
            }
          }
          return valid;
        }
      );
    }
    return (''+value[field.id]).length > 0;
  }

  ngAfterContentInit(): void {
    this.metaList.forEach(
      (field: FormField) => {
        this.validityMap[field.id] = (field.required ? this.evaluateRequiredValidity(field, this.value[field.id])  : true);
      }
    );
  }

}
