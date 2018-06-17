import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';

import { TimeParserService } from './../services';

@Directive({
  selector: '[timeParser]'
})
export class TimeParserDirective {
  @Input() militaryTime: boolean;
  @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private timeParserService: TimeParserService) {
    this.militaryTime = this.militaryTime || false;
  }

  @HostListener('blur', ['$event']) onBlur(event) {
    this.ngModelChange.emit(this.timeParserService.parseTime(event.target.value, this.militaryTime));
  }
}
