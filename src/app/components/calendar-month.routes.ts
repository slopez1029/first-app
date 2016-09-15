import {RouterConfig} from "@angular/router";
import {CalendarMonthViewComponent} from "./calendar-month-view.component";
import {CalendarDayViewComponent} from "./calendar-day-view.component";


export const MONTH_ROUTES: RouterConfig = [
  {path: ':month', component: CalendarMonthViewComponent},
  {path: ':month/:day', component: CalendarDayViewComponent},
];
