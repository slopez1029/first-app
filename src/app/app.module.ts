import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CalendarMonthViewComponent } from './components/calendar-month-view.component';
import {routing} from "./app.routes";
import { CalendarYearViewComponent } from './components/calendar-year-view.component';
import { CalendarDayViewComponent } from './components/calendar-day-view.component';
import {CalendarComponent} from "./components/calendar.component";
import {CalendarService} from "./components/calendar.service";
import { CalendarWeekViewComponent } from './components/calendar-week-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarMonthViewComponent,
    CalendarYearViewComponent, CalendarDayViewComponent, CalendarComponent, CalendarWeekViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule,
    routing,
    ReactiveFormsModule
  ],
  providers: [CalendarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
