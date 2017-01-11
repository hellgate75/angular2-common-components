import {
  Component, ElementRef, AfterContentInit, Inject, EventEmitter, Output, Input,
  ViewEncapsulation
} from '@angular/core';
import {Cloneable, Metadata} from '../../models/models';
import { EditFormComponent } from './editform/edit-form-component';

declare var jQuery: any;
declare var JSON: any;

/* tslint:disable */
@Component({
  selector: 'edit-dialog',
  providers: [ EditFormComponent ],
  templateUrl: './edit-dialog-component.html',
  host: {'style' : 'width: 100%'},
  encapsulation: ViewEncapsulation.None
})
/* tslint:enable */
export class EditDialogComponent implements AfterContentInit {
  @Input() metadata: Metadata;
  @Input() linkeddata:  Map<string, Cloneable[]>;
  @Input() activation: EventEmitter<Cloneable>;
  @Input() height: number;
  @Input() width: number;
  @Input() effectDuration: number;
  @Input() effectType: string;
  @Input() effectDiretion: string;
  @Output() changed: EventEmitter<Cloneable>;
  reference: Cloneable;
  model: Cloneable;
  contentjQueryElement: any

  constructor(@Inject(ElementRef) private elementRef: ElementRef) {
    this.changed = new EventEmitter<Cloneable>();
    if (this.effectDuration === undefined) {
      this.effectDuration = 250;
    }
    if (!this.effectDiretion) {
      this.effectDiretion = 'up';
    }
    if (!this.effectType || this.effectType === '' ) {
      this.effectType = 'slide';
      this.effectDiretion = 'up';
    }
  }

  save(): void {
    // No local save
    // (<any>this.reference).reverse(this.model);
    this.changed.emit(this.model.clone());
    this.hide();
  }

  cancel(): void {
    this.hide();
  }

  show(): void {
    jQuery(this.elementRef.nativeElement).dialog('open');
  }

  hide(): void {
    jQuery(this.elementRef.nativeElement).dialog('close');
  }

  ngAfterContentInit(): void {
    let contentElement: any = this.contentjQueryElement = jQuery(this.elementRef.nativeElement).find('#dialog-content');
    contentElement.width(this.width);
    contentElement.height(this.height);
    jQuery(this.elementRef.nativeElement).dialog({
      modal: true,
      autoOpen: false,
      width: this.width,
      height: this.height,
      dialogClass: 'no-close',
      open: (event: any, ui: any) => {
        jQuery('.ui-dialog-titlebar', ui.dialog | ui).hide();
        jQuery('button', ui.dialog | ui).each((index: number, item: any) => {
          let btn: any = jQuery(item);
          if (item.className === '') {
            btn.addClass('btn').addClass((item.innerHTML === 'Confirm') ? 'btn-primary' : 'btn-secondary');
          }
        });
        jQuery(this).add(contentElement);
        jQuery(contentElement).show();
      },
      buttons: [
        {
          text: 'Confirm',
          click: function() {
            this.save();
          }.bind(this)
        },
        {
          text: 'Cancel',
          click: function() {
            this.cancel();
          }.bind(this)
        }
      ],
      show: {effect: this.effectType, direction: this.effectDiretion, duration: this.effectDuration},
      hide: {effect: this.effectType, direction: this.effectDiretion, duration: this.effectDuration},
      closeOnEscape: false,
      draggable: false,
      resizable: false
    });
    if (!!this.activation) {
      this.activation.subscribe(
        (next: Cloneable) => {
          this.reference = next;
          this.model = next.clone();
          this.show();
        }
      );
    }
  }

}
