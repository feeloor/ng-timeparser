import { Injectable } from '@angular/core';

@Injectable()
export class TimeParserService {

  constructor() { }

  /**
   * Parses given time-string to a correct 4 digit time or empty if it's an invalid time
   * @param inputTime Time-string to parse
   * @param militaryTime Use military time (24 hour format)
   */
  public parseTime(inputTime: string, militaryTime: boolean = false): string {
    let returnTime = '';
    let correctFormat = false;
    let time = inputTime;

    // English (12 hours pattern)
    if (!militaryTime) {
      if (new RegExp(/^[2-9][0-9].*$/).test(time) && (time.match(/\d/g) || []).length !== 3) {
        // Matches 22 or 22 PM but not 321 or 321 PM/AM
        correctFormat = false;
        time = '';
      } else if (new RegExp(/^[0-1][0-9]:[0-5][0-9].*$/).test(time)) {
        // Matches for example 07:30 or 07:30 PM/AM
        correctFormat = true;
        time = this.addAMorPM(time, 0, 5);
      } else if (new RegExp(/^[0-1][0-9][0-5][0-9].*$/).test(time)) {
        // Matches for example 0730 or 0730 PM/AM
        correctFormat = true;
        time = this.addAMorPM(time, 0, 4);
      } else if (new RegExp(/^[0-9]:[0-5][0-9].*$/).test(time)) {
        // Matches for example 9:33 and 9:33 PM/AM
        correctFormat = true;
        time = `0${this.addAMorPM(time, 0, 4)}`;
      } else if (new RegExp(/^[0-9][0-5][0-9].*$/).test(time)) {
        // Matches for example 933 and 933 PM/AM
        correctFormat = true;
        time = `0${this.addAMorPM(time, 0, 3)}`;
      } else if (new RegExp(/^[0-1][0-2].*$/).test(time)) {
        // Matches 12 or 12 PM/AM
        correctFormat = true;
        time = this.addAMorPM(time, 0, 2);
      } else if (new RegExp(/^[0-9].*$/).test(time)) {
        // Matches for example 3 and 3 PM/AM
        correctFormat = true;
        time = this.addAMorPM(time, 0, 1);
      }
      // French / Military Time (24 hours pattern)
    } else {
      if (new RegExp(/^[0-2][0-9]:[0-5][0-9]$/).test(time)) {
        // Matches 17:30
        correctFormat = true;
      } else if (new RegExp(/^[0-2][0-9][0-5][0-9]$/).test(time)) {
        // Matches 1730
        correctFormat = true;
      } else if (new RegExp(/^[0-2][0-9]:[0-5]$/).test(time)) {
        // Matches 22:3
        correctFormat = true;
        time = `${time}0`;
      } else if (new RegExp(/^[0-2][0-9][0-5]$/).test(time)) {
        // Matches 223
        correctFormat = true;
        time = `${time}0`;
      } else if (new RegExp(/^[0-9]:[0-5][0-9]$/).test(time)) {
        // Matches 7:30
        correctFormat = true;
        time = `0${time}`;
      } else if (new RegExp(/^[0-9][0-5][0-9]$/).test(time)) {
        // Matches 730
        correctFormat = true;
        time = `0${time}`;
      } else if (new RegExp(/^[0-2][0-9]/).test(time)) {
        // Matches 19
        correctFormat = true;
        time = `${time}00`;
      } else if (new RegExp(/^[0-9]/).test(time)) {
        // Matches 9
        correctFormat = true;
        time = `0${time}00`;
      }
    }

    // Create return data
    if (correctFormat) {
      time = time.toUpperCase();
      time = this.makeTime4Digit(time);
      returnTime = this.addColonIfMissing(time);

      if (militaryTime) {
        returnTime = returnTime.substring(0, 5);
      }
    } else {
      returnTime = '';
    }

    return returnTime;
  }

  /**
   * Parses a valid time to a 4 digit time
   * For example 4 PM to 04:00 PM or 4:30 PM to 04:30 PM
   * @param time Time-string to parse to 4 digit
   */
  private makeTime4Digit(time: string): string {
    let preAMorPM = '';
    let parsed = time;

    // Get any existing AM/PM
    if (new RegExp(/PM/i).test(time)) {
      preAMorPM = 'PM';
      parsed = parsed.replace(/PM/i, '');
    } else if (new RegExp(/AM/i).test(time)) {
      preAMorPM = 'AM';
      parsed = parsed.replace(/AM/i, '');
    }

    parsed = parsed.replace(':', '');
    parsed = parsed.replace(/ /g, '');
    if (parsed.length === 1) {
      parsed = `0${parsed}00`;
    } else if (parsed.length === 2) {
      parsed = `${parsed}00`;
    } else if (parsed.length === 3) {
      if (new RegExp(/^[0-1][0-9][0-5]/).test(parsed)) {
        parsed = `${parsed}0`;
      } else if (new RegExp(/^[0-9][0-5][0-9]/).test(parsed)) {
        parsed = `0${parsed}`;
      }
    }

    return `${parsed}${preAMorPM ? ' ' + preAMorPM : ''}`;
  }

  /**
   * Adds a colon if it's missing to given time-string
   * For example 0400 to 04:00
   * @param time Time-string to add missing colon to
   */
  private addColonIfMissing(time: string): string {
    if (time.indexOf(':') === -1) {
      return `${time.substring(0, 2)}:${time.substring(2)}`;
    }
    return time;
  }

  /**
   * Takes start and end of time-string and then adds correct AM/PM
   * @param time Time-string to add AM or PM too
   * @param start Where time starts in string
   * @param end Where time ends in string
   */
  private addAMorPM(time: string, start: number, end: number): string {
    if (new RegExp(/PM/i).test(time)) {
      return `${time.substring(start, end)} PM`;
    } else if (new RegExp(/AM/i).test(time)) {
      return `${time.substring(start, end)} AM`;
    } else {
      return `${time.substring(start, end)} PM`;
    }
  }
}
