import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar-month-view.component';
import {routing} from "./app.routes";
import { CalendarYearComponent } from './components/calendar-year-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarYearComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
