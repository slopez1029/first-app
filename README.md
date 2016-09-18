<<<<<<< HEAD
# EECS448_Calendar
A web based calendar / planner for EECS448 group project 1.
Team members: Haaris Chaudhry, Jacob Fustos, Nicholas Robless


## Development server
You'll first need to download NodeJs at NodeJs.org and then install the angular-cli using the command line and entering `npm install angular-cli`.
Download the project, navigate to the directory containing the project in a command line and type `npm install` to install the required dependencies.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

If you want to place this project on a server, then you'll need to create a dist file using `ng build --prod`, remember to uncomment everything that was commented out in the calendar.service.ts file.
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
The dist file contains all that is necessary to get the project up and running.  You'll have to change the http request calls if you want to use a different API to make changes to the calendar.  Currently
we're only using a single shared backend, so anyone can make changes to the same calendar.

## Sources
https://www.udemy.com/the-complete-guide-to-angular-2/ <br />
-A course on Udemy for Angular 2 by Maximilian Schwarzmuller, this course was easily the most used source for the front end aspect of this project. <br />
-the http calls in the calendar.service.ts file were taken almost directly from section 14 of the course.<br />
<br />

http://stackoverflow.com/questions/35198319/angular-2-routing-and-direct-access-to-a-specific-route-how-to-configure-apach <br />
-Source for learning how to distribute an angular 2 project to a server <br />
<br />
 
https://angular.io/docs/ts/latest/ <br />
-Source for learning how to use Angular 2 <br/>
<br />

http://getbootstrap.com/ <br />
-Source for learning about certain bootstrap components <br />
<br />





>>>>>>> 71ad908f91d6a27f6ee0b949b1fc2209c73e15be
