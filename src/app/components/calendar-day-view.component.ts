import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-calendar-day-view',
  templateUrl: './calendar-day-view.component.html',
  styleUrls: ['./calendar-day-view.component.css']
})
export class CalendarDayViewComponent implements OnInit {

  private subscription:Subscription;
  private currentMonth:string;
  private currentDay:string;

  constructor(private activatedRoute:ActivatedRoute) {
    this.subscription = this.activatedRoute.params.subscribe(
      (param:any)=> {
        this.currentDay = param['day'];
        this.currentMonth = param['month']
      }
  );
  }

  ngOnInit() {
  }

}
