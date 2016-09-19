calendar-day-view.component.html
    div#container
    div#content
    div#main-content
        Containers for div elements.
    
        div#view-menu
        div.view-item
            Menu to return to a higher view corresponding to the day you
            are currently at.
        
        div#selected-menu
        div#selected
            Shows the current date (month day, year).
        
        div#calendar
        div#details-interface
            Contains the interface for viewing and storing day details.
        
            ul
                List of added details and the delete details buttons.
            
            form
                Simple text-box and submit button to insert details.
            
            button
                Saves the user's current day. 



calendar-month-view.component.html
    div#table-responsive
        Bootstrap container for responsive table.

        table
            Primary structure for this page.

            Row 1
                Allows user to access year view.

            Row 2
                Displays current month and span buttons to access prev/
                next months.

            Row 3
                Displays day-of-the-week headers for the following month
                calendar.

            Row 4 - End
                Generates week header plus all seven days in each week for
                remaining weeks in month (see angular-docs). All items here
                provide a link to dynamically generate week or day views.



calendar-week-view.component.html
    div#container
    div#content
    div#main-content
        Containers for div elements.
    
        div#view-menu
        div.view-item
            Menu to return to a higher view corresponding to the week you
            are currently at.
        
        div#selected-menu
        div#selected
            Shows the current week (start date - end date).
        
        div#calendar
        table
            Contains the interface for viewing and accessing day views.
        
            Row 1
                Displays day-of-the-week headers.

            Row 2
                Generates all days of the current week. Each cell provides 
                a link to dynamically generate week or day views.



calendar-year-view.component.html
    table
        Centered, positioned responsive table to contain month cells.
    
        td
            Each table cell provides a routerLink to dynamically generate
            the corresponding month view.