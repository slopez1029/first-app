export class CalendarService {

  private calendarData = {
    "curDay": "12",
    "days": [[" This is the first event", "This is the second"], [], ["Go to the Beach!!", "Go to the Beach!!"], [], [], [], [], [], ["more events on this day.", "Better make it to this."], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], ["This is index 33"], [], [], [], [], [], [], ["Eat Chicken"], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], ["this is the last detail", "just kidding maybe this one", "okay okay it's this one"] ],
    "error": "NONE"
  };



  constructor() {
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
}
