import {RouterModule, RouterConfig} from "@angular/router";
import {CalendarMonthViewComponent} from "./components/calendar-month-view.component";
import {CalendarYearViewComponent} from "./components/calendar-year-view.component";

const APP_ROUTES: RouterConfig = [
  {path: 'month/:month', component: CalendarMonthViewComponent },
  {path: 'year', component: CalendarYearViewComponent },
  {path: '', redirectTo: '/month/August', pathMatch: 'full'},
  {path: '**', redirectTo: '/month/August', pathMatch: 'full'}, //ordering matters!
];

export const routing = RouterModule.forRoot(APP_ROUTES);
