import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class CalendarService {

  private calendarData = {
    "curDay": "0",
    "days": [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
    "error": "NONE"
  };

  private currentDayIndex:number = 0;

  private dateReqObject = {"name":"getDates"};


  /**
   * Initializes the calendar data by using an angular http service
   * @param http an injected angular service that's used to make http calls
   * @returns       Returns the calendar data
   */
  constructor(private http: Http) {
    this.getData();
  }

  /**
   * Gets the calendar data by utilizing the resource and then assigning the data to the calendarData object.
   */
  getData() {
    this.dataResource(this.dateReqObject)
      .subscribe(
        data => {
          this.calendarData = data;
          this.currentDayIndex=+this.calendarData['curDay'];
        },
        error => console.log(error)
      );
  }

  /**
   * Deletes a detail from the server.
   * @param deleteReq A parameter that contains information on which detail to delete
   */
  deleteDetailFromServer(deleteReq) {
    this.dataResource(deleteReq)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
  }

  /**
   * Adds a detail on to the calendar on the server
   * @param addReq A parameter that constains information about the detail that needs to be added and where it should be added
   */
  addDetailOnServer(addReq) {
    this.dataResource(addReq)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
  }

  /**
   * Sets the day
   * @param setDayReq Contains information about which day should be set to the current day.
   */
  setDayOnServer(setDayReq) {
    this.dataResource(setDayReq)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
  }
  /**
   * A method that directly accesses the server
   * @param user A request body that tells the server what needs to be done (add, set, delete)
   * @returns {Observable<R>} The observable is converted to json before being passed back
   */
  dataResource(user:any) {
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://people.eecs.ku.edu/~slopez/cgi-bin/Calendar.cgi', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      // .catch(this.handleError);
  }

  /**
   * handles any errors that occurred while calling the server, currently not utilized.
   */
  handleError() {
    console.log("There was an error");
  }

  /**
   * Checks if the day has details
   * @param month month that the day resides in
   * @param day the date that the day is (kind of a misnamed...oops)
   * @returns {boolean}
   */
  dayHasDetails(month:string, day:string) {
    if (this.calendarData.days[this.dayIndexCalc(month, day)]) {
      return false;
    } else {
      return true;
    }
  }


  /**
   * Converts month number to name for dayIndexCalc
   * @param month
   * @param day The date of the day
   * @returns {string} month name
   */
  monthConverter(month:number){
    if (month === 7){
      return "August";
    }
    else if (month === 8){
      return "September";
    }
    else if (month === 9){
      return "October";
    }
    else if (month === 10){
      return "November";
    }
    else if (month === 11){
      return "December";
    }
    else if (month === 0){
      return "January";
    }
    else if (month === 1){
      return "February";
    }
    else if (month === 2){
      return "March";
    }
    else if (month === 3){
      return "April";
    }
    else if (month === 4){
      return "May";
    }
}

  /************************************************
   * Converts month name to a number allowing incrementing
   * @param month name
   * @returns {number} month number based on calendar
   */
  reverseMonthConverter(month:string){
    if (month === "August"){
      return 1;
    }
    else if (month === "September"){
      return 2;
    }
    else if (month === "October"){
      return 3;
    }
    else if (month === "November"){
      return 4;
    }
    else if (month === "December"){
      return 5;
    }
    else if (month === "January"){
      return 6;
    }
    else if (month === "February"){
      return 7;
    }
    else if (month === "March"){
      return 8;
    }
    else if (month === "April"){
      return 9;
    }
    else if (month === "May"){
      return 10;
    }
  }

  /************************************************
   * Converts month name to a number allowing incrementing
   * @param month name
   * @returns {number} month number based on calendar
   */
  reverseMonthReConverter(month:number){
    if (month === 1){
      return "August";
    }
    else if (month === 2){
      return "September";
    }
    else if (month === 3){
      return "October";
    }
    else if (month === 4){
      return "November";
    }
    else if (month === 5){
      return "December";
    }
    else if (month === 6){
      return "January";
    }
    else if (month === 7){
      return "February";
    }
    else if (month === 8){
      return "March";
    }
    else if (month === 9){
      return "April";
    }
    else if (month === 10){
      return "May";
    }
  }

  /**
   * Calculates the index of the day
   * @param month the month that the day resides in
   * @param day The date of the day
   * @returns {number} The index
   */
  dayIndexCalc(month:string, day:string) {
    if (month === "August") {
      return +day - 1;
    } else if (month === "September") {
      return +day + 30;
    } else if (month === "October") {
      return +day + 60;
    } else if (month === "November") {
      return +day + 91;
    } else if (month === "December") {
      return +day + 121;
    } else if (month === "January") {
      return +day + 152;
    } else if (month === "February") {
      return +day + 183;
    } else if (month === "March") {
      return +day + 211;
    } else if (month === "April") {
      return +day + 242;
    } else if (month === "May") {
      return +day + 272;
    } else {
      return 404;
    }

  }

  /**
   * Returns an object containing the month, date, and index of the day that is passed in by index.
   * @param index
   * @returns {{month: string, date: number, index: number}}
   */
  getMonthAndDate(index:number) {
    let month:string;
    let date:number;

    if (index >= 0 && index <= 30) {
      month = "August";
      date = index + 1;

    } else if (index >= 31 && index <= 60) {
      month = "September";
      date = index - 30;

    } else if (index >= 61 && index <= 91) {
      month = "October";
      date = index - 60;

    } else if (index >= 92 && index <= 121) {
      month = "November";
      date = index - 91;

    } else if (index >= 122 && index <= 152) {
      month = "December";
      date = index - 121;

    } else if (index >= 153 && index <= 183) {
      month = "January";
      date = index - 152;

    } else if (index >= 184 && index <= 211) {
      month = "February";
      date = index - 183;

    } else if (index >= 212 && index <= 242) {
      month = "March";
      date = index - 211;

    } else if (index >= 243 && index <= 272) {
      month = "April";
      date = index - 242;

    } else if (index >= 273 && index <= 303) {
      month = "May";
      date = index - 272;

    }

    let monthObj = {
      "month": month,
      "date": date,
      "index": index
    };

    return monthObj;
  }


  /**
   * deletes a detail both on the frontend and back end
   * @param month
   * @param day
   * @param index
   */
  deleteDetail(month:string, day:string, index:number) {
    let dayIndex:number = this.dayIndexCalc(month, day);
    this.calendarData['days'][dayIndex].splice(index, 1);
    this.deleteDetailFromServer({"name":"removeDetail","day":""+dayIndex,"detailNum":""+index})
  }

  /**
   * Adds a detail both on the frontend and backend
   * @param index
   * @param detail
   * @param time
   * @param timeEnd
   */
  addDetail(index:number, detail:string, time:string, timeEnd:string) {
    this.calendarData.days[index].push(time + "-" + timeEnd + " " + detail);
    this.addDetailOnServer({"name":"addDetail","day":""+index,"detail":detail,"time":time,"timeEnd":timeEnd});
  }

  /**
   * Adds a today detail
   * @param month
   * @param day
   * @param detail
   * @param time
   * @param timeEnd
   */
  addTodayDetail(month:string, day:string, detail:string, time:string, timeEnd:string) {
    let dayIndex:number = this.dayIndexCalc(month, day);
    this.addDetail(dayIndex, detail, time, timeEnd);
  }

  /**
   * Adds a multi day detail
   * @param month
   * @param start date
   * @param end date
   * @param detail
   */
  addMultiDetail(month:string, start:string, end:string, detail:string) {
    let time:string = "00:00";
    let timeEnd:string ="24:59";
    let dayIndex:number = this.dayIndexCalc(month, start);
    let endDate = new Date(end);
    let endMonth:string = this.monthConverter(endDate.getMonth());
    let endDay:string = (endDate.getDate()+1).toString();
    let endIndex:number = this.dayIndexCalc(endMonth, endDay);
    if(endIndex === 404){
        alert("Please pick a valid date on this calendar \n(August 1, 2016 to May 31, 2017)");
    } else if(dayIndex>endIndex){
      alert("End date must be after current date");
    } else {
        while (dayIndex <= endIndex) {
        this.addDetail(dayIndex, detail, time, timeEnd);
        dayIndex++;
       }
    }
  }


  /*******************************************
   * Adds a monthly detail
   * @param month
   * @param day
   * @param detail
   * @param time
   * @param timeEnd
   */
  addRepeatingMonthDetail(month:string, day:string, detail:string, time:string, timeEnd:string) {
    let reMonth:number = this.reverseMonthConverter(month);//a number, month
    while(reMonth <=10){
      let reMonthName = this.reverseMonthReConverter(reMonth);//back to month name
      let dayIndex:number = this.dayIndexCalc(reMonthName, day);//dayindex
      this.addDetail(dayIndex, detail, time, timeEnd);
      reMonth++;
    }
  }

  /*******************************************
   * Adds a weekly detail
   * @param month
   * @param day
   * @param detail
   * @param time
   * @param timeEnd
   */
  addRepeatingWeekDetail(month:string, day:string, detail:string,time:string, timeEnd:string) {
    let dayIndex:number = this.dayIndexCalc(month, day);
    while(dayIndex <=303){
      this.addDetail(dayIndex, detail,time, timeEnd);
      dayIndex = dayIndex+7;
    }
  }

  /*******************************************
   * Adds a biweek detail
   * @param month
   * @param day
   * @param detail
   * @param time
   * @param timeEnd
   */
  addRepeatingBiWeekDetail(month:string, day:string, detail:string, time:string, timeEnd:string) {
    let dayIndex:number = this.dayIndexCalc(month, day);
    while(dayIndex <=303){
      this.addDetail(dayIndex, detail, time, timeEnd);
      dayIndex = dayIndex+14;
    }
  }

  /**
   * Gets the details of the day using month/day params
   * @param month
   * @param day
   * @returns {any}
   */
  getDaysDetails(month:string, day:string) {
    return this.calendarData.days[this.dayIndexCalc(month, day)];
  }

  /**
   * gets the details of the day using the day's index
   * @param index
   * @returns {any}
   */
  getDetails(index:string) {
    return this.calendarData.days[+index];
  }

  /**
   * Sets the current day
   * @param index
   */
  setCurrentDay(index:number) {
    this.currentDayIndex = index;
    this.setDayOnServer({"name":"setCurDay","newDay":""+index});
  }

  /**
   * Checks if the passed in day is the current day
   * @param index
   * @returns {boolean}
   */
  isCurrentDay(index:number) {
    return this.currentDayIndex === index;
  }

  /**
   * returns the current day
   * @returns {number}
   */
  getCurrentDay() {
    return this.currentDayIndex;
  }

  /**
   * returns the year associated with the passed in month
   * @param index
   * @returns {number}
   */
  getYear(index: number) {
    return (index > 152 ? 2017:2016)
  }
}
