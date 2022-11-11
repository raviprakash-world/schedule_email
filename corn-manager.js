const cron = require("node-cron");
var randf = require("randomstring");
var schedule = require("node-schedule");
const url_taskMap = {};

module.exports.startScheduleJobs = startScheduleJobs;
module.exports.startCronJobs = startCronjobs;
module.exports.stopScheduleJobs = StopScheduleJobs;
module.exports.stopCronjobs = stopCronjobs;

// cron jobs

async function startCronjobs(req, res) {
  //recurring timely
  const task = cron.schedule(
    "* * * * * * ",
    () => {
      console.log(new Date());
    },
    {
      scheduled: false,
    }
  );
  const url = Object.keys(url_taskMap).length;
  url_taskMap[url] = task;
  console.log(url);
  console.log("url_taskMap :", url_taskMap[url]);
  let my_job = url_taskMap[url];
  my_job.start();
  return res.json({
    message: "Scheduler started!",
    tastId: url,
  });
}
async function stopCronjobs(req, res) {
  console.log(req.body.taskName);
  try {
    let url = req.body.taskName;
    console.log("url_taskMap :", url_taskMap[url]);
    if ("cancel" in url_taskMap[url]) {
      console.log("stoped schedule");
      url_taskMap[url].cancel();
    } else {
      url_taskMap[url].stop();
    }
    res.json({ message: `Task ${url} successfully terminated` });
  } catch (error) {
    console.log(error);
    res.status(403).send({ error: error.message });
  }
}
async function startScheduleJobs(req, res) {
  //recurring once
  const date = new Date(2022, 11, 11, 20, 34, 0);
  console.log(date.toString());
  try {
    const job = schedule.scheduleJob(` * * * * * *`, async function () {
      console.log("once");
    });
    const idx = Object.keys(url_taskMap).length;
    console.log("idx", idx);
    url_taskMap[idx] = job;
    console.log("url_taskMap :", url_taskMap[idx]);
    if ("cancel" in url_taskMap[idx]) {
      console.log("cncl is a key");
    }

    res.status(200);
    res.json({ task_id: idx, message: "Scheduled your mail successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(403)
      .send({ error: "we are facing issue in sending your email" });
    // next();
  }
}
