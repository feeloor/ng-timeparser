import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TimeParserModule } from './time-parser';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TimeParserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
