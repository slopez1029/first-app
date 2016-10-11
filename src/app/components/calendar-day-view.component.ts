import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";
import {CalendarService} from "./calendar.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-calendar-day-view',
  templateUrl: './calendar-day-view.component.html',
  styleUrls: ['./calendar-day-view.component.css']
})
export class CalendarDayViewComponent implements OnInit, OnDestroy {

  addForm:FormGroup;
  private subscription:Subscription;
  private currentMonth:string;
  private currentDay:string;
  private dayDetails:string[];
  private atFirstDay:boolean;
  private atLastDay:boolean;

  /**
   * This constructor initializes the private vars based on the current parameters in the route
   * @param activatedRoute
   * @param calendarService
   */
  constructor(private activatedRoute:ActivatedRoute, private calendarService:CalendarService) {
    this.subscription = this.activatedRoute.params.subscribe(
      (param:any)=> {
        this.currentDay = param['day'];
        this.currentMonth = param['month'];
        if(this.calendarService.dayIndexCalc(this.currentMonth, this.currentDay) === 0) {
          this.atFirstDay = true;
        } else {
          this.atFirstDay = false;
        }

        if(this.calendarService.dayIndexCalc(this.currentMonth, this.currentDay) === 303) {
          this.atLastDay = true;
        } else {
          this.atLastDay = false;
        }

        this.dayDetails = this.calendarService.getDaysDetails(param['month'], param['day']);
      }
    );
  }

  /**
   * Adds a form to the view that controls the addition of details to the day.
   */
  ngOnInit() {
    this.addForm = new FormGroup({
      userDetail: new FormControl('', <any>Validators.required)
    })
  }

  /**
   * Unsubscribes to the subscription variable so that we don't get a memory leak
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Makes a call to the service telling it which detail to remove
   * @param month
   * @param day
   * @param index
   */
  removeDetail(month: string, day: string, index: number) {
    this.calendarService.deleteDetail(month, day, index);
  }

  /**
   * Makes a call to the service telling it where a detail should be added
   * @param month
   * @param day
   * @param detail
   */
  onAddTodayDetail(month: string, day: string, detail: string) {
    this.calendarService.addTodayDetail(month, day, detail);
    this.addForm.reset();
  }

  /**
   * Makes a call to the service telling it where a multi day detail should be added
   * @param month
   * @param start date
   * @param end date
   * @param detail
   */
  onAddMultiDetail(month: string, start: string, end:string, detail: string) {
    this.calendarService.addMultiDetail(month, start, end, detail);
    this.addForm.reset();
  }
  /**
   * Makes a call to the service telling it where a weekly detail should be added
   * @param month
   * @param day
   * @param detail
   */
  onAddRepDetail1(month: string, day:string, detail: string) {
    this.calendarService.addRepeatingMonthDetail(month, day, detail);
    this.addForm.reset();
  }
  /**
   * Makes a call to the service telling it where a biweekly detail should be added
   * @param month
   * @param start date
   * @param end date
   * @param detail
   */
  onAddRepDetail2(month: string, day:string, detail: string) {
    this.calendarService.addRepeatingBiWeekDetail(month, day, detail);
    this.addForm.reset();
  }
  /**
   * Makes a call to the service telling it where a monthly detail should be added
   * @param month
   * @param start date
   * @param end date
   * @param detail
   */
  onAddRepDetail3(month: string, day:string, detail: string) {
    this.calendarService.addRepeatingWeekDetail(month, day, detail);
    this.addForm.reset();
  }

  /**
   * Uses the service to check if the day is current
   * @returns {boolean}
   */
  isThisDayCurrent() {
    let index:number = this.calendarService.dayIndexCalc(this.currentMonth, this.currentDay);
    return this.calendarService.isCurrentDay(index);
  }

  /**
   * Uses the service to set the current day
   */
  makeTodayCurrent() {
    let index:number = this.calendarService.dayIndexCalc(this.currentMonth, this.currentDay);
    this.calendarService.setCurrentDay(index);
  }

  /**
   * Returns the appropriate year for this month
   * @returns {number}
   */
  thisMonthsYear() {
    if(this.currentMonth === 'January' || this.currentMonth === 'February' ||this.currentMonth === 'March' || this.currentMonth === 'April' || this.currentMonth === 'May' ) {
      return 2017;
    } else {
      return 2016;
    }
  }

  /**
   * Uses the service to get the next day
   * @returns {string}
   */
  getNextDay() {
    let index = this.calendarService.dayIndexCalc(this.currentMonth, this.currentDay);
    let dayObj = this.calendarService.getMonthAndDate(index+1);

    return '/month/' + dayObj['month'] + '/' + dayObj['date'];
  }

  /**
   * Uses the service to get the previous day
   * @returns {string}
   */
  getPreviousDay() {
    let index = this.calendarService.dayIndexCalc(this.currentMonth, this.currentDay);
    let dayObj = this.calendarService.getMonthAndDate(index-1);

    return '/month/' + dayObj['month'] + '/' + dayObj['date'];
  }

}
