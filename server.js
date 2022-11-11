require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const {
  startCronJobs,
  startScheduleJobs,

  stopCronjobs,
} = require("./corn-manager");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
// app.use("/", );
app.post("/", function (req, res) {
  // console.log(req.body);
  startCronJobs(req, res);
});
app.post("/stop", function (req, res) {
  // console.log(req.body);
  stopCronjobs(req, res);
});
app.post("/ScheduleJobs/", function (req, res) {
  console.log(req.body);
  startScheduleJobs(req, res);
});

// global error handler
// app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4001;
app.listen(port, () => console.log("Server listening on port " + port));
