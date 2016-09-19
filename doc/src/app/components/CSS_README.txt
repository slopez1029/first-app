calendar-day-view.component.css
    .list-group-item
        Ensures that excessively long words wrap before running out of
        the box.



calendar-month-view.component.css
    table
        Centers the table and positions it at a desired distance from top.

    #month-title-heading
    #month-title-heading h1
        Displays the month title as inline with the prev/next arrows.

    @media screen and (max-width: 860px)
        Removes week table headers before they overflow, so days can be 
        more easily visible.



calendar-week-view.component.css
    Basic styling - see file for effects.



calendar-year-view.component.css
    table
        Centers the table and positions it at a desired distance from top.
        
    table td
    table tr:first-child td
    table tr:last-child td
    table tr td:first-child
    table tr td:last-child
        These rules force the table to only show borders on the inside of
        the table.
