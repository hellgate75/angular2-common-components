import {
  Component, ElementRef, AfterContentInit, Inject, EventEmitter, Output, Input,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';
import { NgModel } from '@angular/forms';

declare var jQuery: any;

/* tslint:disable */
@Component({
  selector: 'filter-box',
  providers: [ NgModel ],
  templateUrl: './filter-box-component.html',
  host: {'style' : 'width: 100%'},
  encapsulation: ViewEncapsulation.None
})
/* tslint:enable */
export class FilterBoxComponent implements AfterContentInit {
  boxListener: Observable<string>;
  /* tslint:disable */
  @Output() searchStart: EventEmitter<boolean>;
  @Output() searchRequest: EventEmitter<string>;
  @Input() requestForChange: any;
  @Input() debounceTime: number;
  @Input() minTextSize: number;
  /* tslint:enable */

  constructor(@Inject(ElementRef) private elementRef: ElementRef) {
    this.searchStart = new EventEmitter<boolean>();
    this.searchRequest = new EventEmitter<string>();
  }

  ngAfterContentInit(): void {
    /* tslint:disable */
    this.boxListener = Observable.fromEvent(this.elementRef.nativeElement, 'keyup')
      .map((e: any) => e.target.value); // extract the value of the input
      // .filter((text: string) => text.length > 2) // filter out if less than 3 characters
    if (!!this.minTextSize) {
      this.boxListener.filter(
        (text: string, index: number) => text.length >= this.minTextSize
      );
    }
    this.boxListener.debounceTime(
      this.debounceTime || 250
    ) // only once every 250ms or number or required ms
      // search, discarding old events if new input comes in
      .subscribe(
        (query: string) => {
           if (!!this.searchStart) {
            this.searchStart.emit(!!query.length);
          }
          if (!!this.searchRequest) {
            this.searchRequest.emit(query);
          }
      });
    /* tslint:enable */
  }

}
