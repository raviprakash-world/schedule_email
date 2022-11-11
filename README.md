"# schedule_email" 



-> The first thing you need to do is install node mailer and node cron.

-> You now need to import nodemailer and node cron into your app.js file.

-> Create the nodemailer authentication object and mail object. 

-> Provide your id and password for the authentication.


Jobs and Scheduling
Every scheduled job in Node Schedule is represented by a Job object. You can create jobs manually, then execute the schedule() method to apply a schedule, or use the convenience function scheduleJob() as demonstrated below.

Job objects are EventEmitters, and emit the following events:

A run event after each execution.
A scheduled event each time they're scheduled to run.
A canceled event when an invocation is canceled before it's executed.
Note that canceled is the single-L American spelling.
An error event when a job invocation triggered by a schedule throws or returns a rejected Promise.
A success event when a job invocation triggered by a schedule returns successfully or returns a resolved Promise. In any case, the success event receives the value returned by the callback or in case of a promise, the resolved value.
(Both the scheduled and canceled events receive a JavaScript date object as a parameter).
Note that jobs are scheduled the first time immediately, so if you create a job using the scheduleJob() convenience method, you'll miss the first scheduled event, but you can query the invocation manually (see below).

Cron-style Scheduling
The cron format consists of:

*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
