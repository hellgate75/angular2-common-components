import {
  Component, ElementRef, AfterContentInit, Inject, EventEmitter, Output, Input,
  ViewEncapsulation
} from '@angular/core';
import { DialogOpenEvent, EventItem } from '../../models/models';

declare var jQuery: any;
declare var JSON: any;

/* tslint:disable */
@Component({
  selector: 'dialog',
  providers: [  ],
  templateUrl: './dialog-component.html',
  host: {'style' : 'width: 100%'},
  encapsulation: ViewEncapsulation.None
})
/* tslint:enable */
export class GenericDialogComponent implements AfterContentInit {
  @Input() activation: EventEmitter<DialogOpenEvent>;
  @Output() close: EventEmitter<string>;
  contentjQueryElement: any;
  eventDescriptor: DialogOpenEvent;

  constructor(@Inject(ElementRef) private elementRef: ElementRef) {
    this.close = new EventEmitter<string>();
    this.eventDescriptor = new DialogOpenEvent({buttons: 0, buttonNames: null});
  }

  closeEmit(name: string): void {
    // No local save
     if (!!this.close) {
      this.close.emit(name);
    }
    this.hide();
  }

  show(): void {
    if (!this.contentjQueryElement) {
      this.create();
    }
    else {
      this.adjust();
    }
    this.contentjQueryElement.dialog('open');
  }

  hide(): void {
    this.contentjQueryElement.dialog('close');
  }

  ngAfterContentInit(): void {
    if (!!this.activation) {
      this.activation.subscribe(
          (next: DialogOpenEvent) => {
            if (!!next) {
              this.eventDescriptor = next;
              this.show();
            }
          }
      );
    }
  }

  adjust(): void {
    let contentElement: any = jQuery(this.elementRef.nativeElement).find('#dialog-content');
    contentElement.width(this.eventDescriptor.width);
    contentElement.height(this.eventDescriptor.height);
    this.contentjQueryElement.dialog().width(this.eventDescriptor.width);
    this.contentjQueryElement.dialog().height(this.eventDescriptor.height);
  }
  create(): void {
//    let contentElement: any = this.contentjQueryElement = jQuery(this.elementRef.nativeElement);
    let contentElement: any = jQuery(this.elementRef.nativeElement).find('#dialog-content');
    contentElement.width(this.eventDescriptor.width);
    contentElement.height(this.eventDescriptor.height);
    let buttons: any[] = [];
    let filteredItems: EventItem[] = this.eventDescriptor.buttonNames.
              filter((elem: EventItem, index: number) => { return index <= (this.eventDescriptor.buttons -1); } );
 //   let closeFunc: Function = this.closeEmit;
    filteredItems.forEach((elem: EventItem, index: number, items: EventItem[]) => {
      buttons.push({
        text: elem.description,
        click: function() {
          this.closeEmit(elem.name);
        }.bind(this)
      });
    });
    this.contentjQueryElement = jQuery(contentElement).dialog({
      modal: true,
      autoOpen: false,
      width: this.eventDescriptor.width,
      height: this.eventDescriptor.height,
      dialogClass: 'no-close',
      open: (event: any, ui: any) => {
        jQuery('.ui-dialog-titlebar', ui.dialog | ui).hide();
        let idx: number = 0;
        jQuery('button', ui.dialog | ui).each((index: number, item: any) => {
          if (item.className === '') {
            let btn: any = jQuery(item);
            item.className='btn';
            btn.addClass((!idx) ? 'btn-primary' : 'btn-secondary');
            idx++;
          }
        });
      },
      buttons: buttons,
      show: {effect: this.eventDescriptor.openEffectType, direction: this.eventDescriptor.openEffectDiretion,
        duration: this.eventDescriptor.openEffectDuration},
      hide: {effect: this.eventDescriptor.closeEffectType, direction: this.eventDescriptor.closeEffectDiretion,
        duration: this.eventDescriptor.closeEffectDuration},
      closeOnEscape: false,
      draggable: false,
      resizable: false
    });
  }

}
