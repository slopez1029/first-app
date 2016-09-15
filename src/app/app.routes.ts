import {RouterModule, RouterConfig} from "@angular/router";
import {CalendarYearViewComponent} from "./components/calendar-year-view.component";
import {CalendarComponent} from "./components/calendar.component";
import {MONTH_ROUTES} from "./components/calendar-month.routes";

const APP_ROUTES: RouterConfig = [
  {path: 'month', component: CalendarComponent, children: MONTH_ROUTES},
  {path: 'year', component: CalendarYearViewComponent },
  {path: '', redirectTo: '/month/August', pathMatch: 'full'},
  {path: '**', redirectTo: '/month/August', pathMatch: 'full'}, //ordering matters!
];

export const routing = RouterModule.forRoot(APP_ROUTES);
