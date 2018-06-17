# NgTimeparser

[![npm version](https://badge.fury.io/js/ng-timeparser.svg)](https://badge.fury.io/js/ng-timeparser) [![Build Status](https://travis-ci.org/feeloor/ng-timeparser.svg?branch=master)](https://travis-ci.org/feeloor/ng-timeparser)

NgTimeparser is a Angular 5 service that helps you parse any time from a input field to a correct time.
It can handle both 12/24 hour formats.

## Install

***Install from npm***
```
npm i ng-timeparser
```

***Include in NgModule***

```typescript
@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    TimeParserModule
  ]
```

## Usage

You can either use the service directly or use the directive on your input-field.

### By Directive

***12 hour format***
```html
<input type="text" [(ngModel)]="inputTime" timeParser />
```

***24 hour format***
```html
<input type="text" [(ngModel)]="inputTime" timeParser militaryTime='true' />
```

### By Service

***Include service to component***
```typescript
constructor(private timeParserService: TimeParserService) {}
```

***12 hour format***
```typescript  
this.time = this.timeParserService.parseTime(this.time, false);
```

***24 hour format***
```typescript  
this.time = this.timeParserService.parseTime(this.time, true);
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

