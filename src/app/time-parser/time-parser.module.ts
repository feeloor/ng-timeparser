import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeParserService } from './services';
import { TimeParserDirective } from './directives';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TimeParserDirective],
  providers: [TimeParserService],
  exports: [TimeParserDirective]
})
export class TimeParserModule { }
