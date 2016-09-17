import { Component } from '@angular/core';
import {CalendarService} from "./components/calendar.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  private currentDateAndMonth = {};

  constructor(private calendarService:CalendarService) {

  }
  
  get currentDate() :any {
    return this.calendarService.getMonthAndDate(this.calendarService.getCurrentDay());
  }

}
