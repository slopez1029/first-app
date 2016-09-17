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

  constructor(private activatedRoute:ActivatedRoute, private calendarService:CalendarService) {
    this.subscription = this.activatedRoute.params.subscribe(
      (param:any)=> {
        this.currentDay = param['day'];
        this.currentMonth = param['month'];
        this.dayDetails = this.calendarService.getDaysDetails(param['month'], param['day']);
      }
    );
  }

  ngOnInit() {
    this.addForm = new FormGroup({
      userDetail: new FormControl('', <any>Validators.required)
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeDetail(month: string, day: string, index: number) {
    this.calendarService.deleteDetail(month, day, index);
  }

  onAddDetail(month: string, day: string, detail: string) {
    this.calendarService.addDetail(month, day, detail);
    this.addForm.reset();
  }

  isThisDayCurrent() {
    let index:number = this.calendarService.dayIndexCalc(this.currentMonth, this.currentDay);
    return this.calendarService.isCurrentDay(index);
  }

  makeTodayCurrent() {
    let index:number = this.calendarService.dayIndexCalc(this.currentMonth, this.currentDay);
    this.calendarService.setCurrentDay(index);
  }

  thisMonthsYear() {
    if(this.currentMonth === 'January' || this.currentMonth === 'February' ||this.currentMonth === 'March' || this.currentMonth === 'April' || this.currentMonth === 'May' ) {
      return 2017;
    } else {
      return 2016;
    }
  }

}
