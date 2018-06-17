import { Component } from '@angular/core';

import { TimeParserService } from './time-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputTime: string;
  inputTimeMilitary: string;
  inputTimeService: string;
  inputTimeServiceMilitary: string;

  constructor(private timeParserService: TimeParserService) {}

  parseTime(time: string, military: boolean = false) {
    this[time] = this.timeParserService.parseTime(this[time], military);
  }
}
