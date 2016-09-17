import {Component, OnInit, OnDestroy} from '@angular/core';
import {CalendarService} from "./calendar.service";
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-calendar-week-view',
  templateUrl: './calendar-week-view.component.html',
  styleUrls: ['./calendar-week-view.component.css']
})
export class CalendarWeekViewComponent implements OnInit, OnDestroy{

  private monthAbbreviations = {
    "January": "Jan",
    "February": "Feb",
    "March": "Mar",
    "April": "Apr",
    "May": "May",
    "June": "Jun",
    "July": "Jul",
    "August": "Aug",
    "September": "Sep",
    "October": "Oct",
    "November": "Nov",
    "December": "Dec"
  };

  private day:string;
  private month:string;

  private startDate:number;
  private endDate:number;
  private startMonth:string;
  private endMonth:string;
  private atFirstMonth:boolean;
  private atLastMonth:boolean;

  private dummyWeek:number[] = [];
  private weekArray:any[] = [];

  private subscription:Subscription;


  constructor(private calendarService:CalendarService,
              private activatedRoute:ActivatedRoute) {

    this.atFirstMonth = false;
    this.atLastMonth = false;
    this.dummyWeek = [];

    this.subscription = this.activatedRoute.params.subscribe(
      (param:any)=> {
        this.month=param['month'];
        this.day=param['day'];

        this.weekBuilder(this.month, this.day);

      });
  }

  ngOnInit() {
  }

  weekBuilder(month:string, day:string) {
    let index:number = this.calendarService.dayIndexCalc(month, day);

    let startDateIndex:number;

    if (index >= 0 && index <= 5) {
      this.atFirstMonth = true;
      this.startDate = 31;
      this.endDate = 6;
      this.startMonth = "Jul";
      this.endMonth = "Aug";

      let weekIndex:number=0;

      for(let i=0; i<=5; i++) {
        this.weekArray[i] = this.calendarService.getMonthAndDate(weekIndex);
        weekIndex++;
      }
    } else if (index >= 300 && index <= 303) {
      this.atLastMonth = true;
      this.dummyWeek = [1,2,3];
      this.startDate = 28;
      this.endDate = 3;
      this.startMonth = "May";
      this.endMonth = "Jun";

      let weekIndex:number=300;

      for(let i=0; i<=3; i++) {
        this.weekArray[i] = this.calendarService.getMonthAndDate(weekIndex);
        weekIndex++;
      }
    } else {
      for (let i = index; i >= 0; i--) {
        if ((i + 1) % 7 === 0) {
          startDateIndex = i;
          break;
        }
      }

      let weekIndex:number=startDateIndex;

      for(let i=0; i<=6; i++) {
        this.weekArray[i] = this.calendarService.getMonthAndDate(weekIndex);
        weekIndex++;
      }

      this.startMonth = this.monthAbbreviations[this.weekArray[0]["month"]];
      this.startDate = this.weekArray[0]["date"];
      this.endMonth = this.monthAbbreviations[this.weekArray[6]["month"]];
      this.endDate = this.weekArray[6]["date"];
    }
  }

  hasDetails(index:string) {
    return (this.calendarService.getDetails(index).length > 0);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isThisDayCurrent(index: number) {
    return this.calendarService.isCurrentDay(index);
  }
}
