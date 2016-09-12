import {RouterModule, RouterConfig} from "@angular/router";
import {CalendarComponent} from "./components/calendar-month-view.component";

const APP_ROUTES: RouterConfig = [
  {path: 'month/:month', component: CalendarComponent },
  {path: '', redirectTo: '/month/August', pathMatch: 'full'},
  {path: '**', redirectTo: '/month/August', pathMatch: 'full'}, //ordering matters!
];

export const routing = RouterModule.forRoot(APP_ROUTES);
