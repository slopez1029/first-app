import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs/Rx";
import {Router, ActivatedRoute} from "@angular/router";
import {CalendarService} from "./calendar.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar-month-view.component.html',
  styleUrls: ['./calendar-month-view.component.css']
})
export class CalendarMonthViewComponent implements OnInit, OnDestroy {

  private subscription:Subscription;

  private weeks:any[] = [[], [], [], [], [], []];
  private sixthWeekExists:boolean;
  private fifthWeekExists:boolean;

  private monthArr:string[] = ["July", "August", "September", "October", 'November', "December", "January", "February", "March", "April", "May"];
  private daysInMonth:number[] = [31, 31, 30, 31, 30, 31, 31, 28, 31, 30, 31];
  private startDay:number[] = [5, 1, 4, 6, 2, 4, 0, 3, 3, 6, 1];
  private prevMonthDays:number[];
  private nextMonthDays:number[];
  private nextMonthExists:boolean;
  private previousMonthExists:boolean;

  month:string = "";

  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
              private calendarService:CalendarService) {
    this.subscription = this.activatedRoute.params.subscribe(
      (param:any)=> {
        this.sixthWeekExists = false;
        this.fifthWeekExists = false;
        this.prevMonthDays = [];
        this.nextMonthDays = [];

        this.month = param['month'];
        let monthIndex:number = 0;
        let curWeek:number[] = [];
        let weekNum:number = 0;
        let endDayOfMonth:number = 0;

        for (let i = 0; i < this.monthArr.length; i++) {
          if (this.monthArr[i] === this.month) {
            monthIndex = i;
          }
        }

        if (this.month=== 'August') {
          this.previousMonthExists = false;
        } else {
          this.previousMonthExists = true;
        }

        if(this.month ==='May') {
          this.nextMonthExists = false;
        } else {
          this.nextMonthExists = true;
        }

        if (this.daysInMonth[monthIndex] === 31) {
          if (this.startDay[monthIndex] >= 5) {
            endDayOfMonth = this.startDay[monthIndex] - 5;
          } else {
            endDayOfMonth = this.startDay[monthIndex] + 2;
          }
        }

        if (this.daysInMonth[monthIndex] === 30) {
          if (this.startDay[monthIndex] === 6) {
            endDayOfMonth = this.startDay[monthIndex] - 6;
          } else {
            endDayOfMonth = this.startDay[monthIndex] + 1;
          }
        }

        if (this.daysInMonth[monthIndex] === 28) {
          endDayOfMonth = 2;
        }

        let numDaysForward = 6 - endDayOfMonth;
        let numDaysBack:number = this.startDay[monthIndex] - 1;

        for (let i = 0; i < numDaysForward; i++) {
          this.nextMonthDays[i] = i + 1;
        }
        for (let i = 0; i <= numDaysBack; i++) {
          this.prevMonthDays[i] = this.daysInMonth[monthIndex - 1] - (numDaysBack - i);
        }

        if ((this.startDay[monthIndex] >= 5 && this.daysInMonth[monthIndex] === 31) || (this.startDay[monthIndex] >= 6 && this.daysInMonth[monthIndex] === 30)) {
          this.sixthWeekExists = true;
        }

        let weekStart:number = this.prevMonthDays.length + 1;

        for (let i = 1; i <= this.daysInMonth[monthIndex]; i++) {
          curWeek.push(i);
          if (weekStart % 7 === 0) {
            this.weeks[weekNum] = curWeek;
            curWeek = [];
            weekNum++;
          }
          if (weekNum === 4 && curWeek[0]) {
            this.fifthWeekExists = true;
          }
          weekStart++;
        }
        this.weeks[weekNum] = curWeek;
      }
    );


  }


  getNextMonth() {
    //this.router.navigate([this.monthArr[this.monthArr.indexOf(this.month) + 1]]);
    //console.log([this.monthArr[this.monthArr.indexOf(this.month) + 1]].toString());
    return [this.monthArr[this.monthArr.indexOf(this.month) + 1]].toString();
  }

  getPreviousMonth() {
    return [this.monthArr[this.monthArr.indexOf(this.month) - 1]].toString();
  }

  getCurrentMonth() {
    return this.month;
  }

  getThisDay(day: number) {
    return day+'';
  }

  hasDetails(month: string, day: string) {
    return (this.calendarService.getDaysDetails(month, day).length > 0);
  }
  
  isThisDayCurrent(month: string, day: string) {
    let index = this.calendarService.dayIndexCalc(month, day);
    return this.calendarService.isCurrentDay(index);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
