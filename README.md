﻿# instaMinutes-assignment

## Problem Statement

### Build a scheduler in JS/GoLang (JS preferred with NodeJS framework) and a script to run it for 10 events.
### The event will consist of a text (string) and a date time at which it will run.
### The scheduler must schedule the event to trigger a function at the date time mentioned in the event body.
### The trigger function (API) much accept the text as input, sleep for duration of text length and return text backwards.

## Example
Let say list of events is
```yaml 
{
    "eventQueue": [
        {
            "text": "textOne",
            "dateTime": "2021-12-03 17: 57: 50.000"
        },
        {
            "text": "texttwo",
            "dateTime": "2021-12-03 17: 57: 55.000"
        },
        {
            "text": "textthree",
            "dateTime": "2021-12-03 17: 57: 45.000"
        }

    ]
}
```

So, the script must go through this list and for each event item, hit NodeJS scheduler API asking it to schedule the event (let us say event 1) to trigger the function at “2020-07-10 15:00:00.000”. The function must take the text as param (textOne) sleep for (7 seconds) and return/console log (enotxet)

Expected Solution (Github public repo link/ zip file)
1.	Github link preferrable
2.	The script to loop
3.	NodeJS app hosting scheduling API and trigger function
4.	One text file explaining your choice of framework/languages, your approach, problems you faced, and how you solved them.


  

