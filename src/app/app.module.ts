import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CalendarMonthViewComponent } from './components/calendar-month-view.component';
import {routing} from "./app.routes";
import { CalendarYearViewComponent } from './components/calendar-year-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarMonthViewComponent,
    CalendarYearViewComponent,
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
