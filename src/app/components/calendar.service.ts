export class CalendarService {

  private calendarData = {
    "curDay": "12",
    "days": [[" This is the first event", "This is the second"], [], ["Go to the Beach!!", "Go to the Beach!!"], [], [], [], [], [], ["more events on this day.", "Better make it to this."], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], ["This is index 33"], [], [], [], [], [], [], ["Eat Chicken"], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], ["this is the last detail", "just kidding maybe this one", "okay okay it's this one"] ],
    "error": "NONE"
  };

  private currentDayIndex:number;



  constructor() {
    
  }

  dayHasDetails(month: string, day: string) {
    if(this.calendarData.days[this.dayIndexCalc(month, day)]) {
      return false;
    } else {
      return true;
    }
  }

  dayIndexCalc(month: string, day: string) {
    if(month === "August") {
      return +day-1;
    } else if (month === "September") {
      return +day+30;
    } else if (month === "October") {
      return +day+60;
    } else if (month === "November") {
      return +day+91;
    } else if (month === "December") {
      return +day+121;
    } else if (month === "January") {
      return +day+152;
    } else if (month === "February") {
      return +day+183;
    } else if (month === "March") {
      return +day+211;
    } else if (month === "April") {
      return +day+242;
    } else if (month === "May") {
      return +day+272;
    }
  }

  getMonthAndDate(index: number) {
    let month:string;
    let date:number;

    if(index >= 0 && index <= 30) {
      month = "August";
      date = index+1;

    } else if (index >= 31 && index <= 60) {
      month = "September";
      date=index-30;

    } else if (index >= 61 && index <= 91) {
      month = "October";
      date=index-60;

    } else if (index >= 92 && index <= 121) {
      month = "November";
      date=index-91;

    } else if (index >= 122 && index <= 152) {
      month = "December";
      date=index-121;

    } else if (index >= 153 && index <= 183) {
      month = "January";
      date=index-152;

    } else if (index >= 184 && index <= 211) {
      month = "February";
      date=index-183;

    } else if (index >= 212 && index <= 242) {
      month = "March";
      date=index-211;

    } else if (index >= 243 && index <= 272) {
      month = "April";
      date=index-242;

    }  else if (index >= 273 && index <= 303) {
      month = "May";
      date=index-272;
    }

    let monthObj = {
      "month":month,
      "date": date,
      "index": index
    };

    return monthObj;
  }



  deleteDetail(month: string, day: string, index) {
    let dayIndex: number = this.dayIndexCalc(month, day);
    this.calendarData.days[dayIndex].splice(index, 1);
  }

  addDetail(month: string, day: string, detail) {
    let dayIndex: number=this.dayIndexCalc(month, day);
    this.calendarData.days[dayIndex].push(detail);
  }


  getDaysDetails(month: string, day: string) {
    return this.calendarData.days[this.dayIndexCalc(month, day)];
  }

  getDetails(index: string) {
    return this.calendarData.days[+index];
  }

  setCurrentDay(index:number) {
    this.currentDayIndex = index;
  }

  isCurrentDay(index:number) {
    return this.currentDayIndex === index;
  }
}
