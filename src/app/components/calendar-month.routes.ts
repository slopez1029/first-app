import {RouterConfig, Routes} from "@angular/router";
import {CalendarMonthViewComponent} from "./calendar-month-view.component";
import {CalendarDayViewComponent} from "./calendar-day-view.component";
import {CalendarWeekViewComponent} from "./calendar-week-view.component";


export const MONTH_ROUTES: Routes = [
  {path: ':month', component: CalendarMonthViewComponent},
  {path: ':month/:day', component: CalendarDayViewComponent},
];
