const express = require("express");
const app = express();
const tasks = require("./Starter/Routes/Tasks");
const connectDatabase = require("./Starter/db/connect");
const notFound = require("./Starter/middleware/not-found");
const errorHandlerMiddleware = require("./Starter/middleware/error-handler");
require("dotenv").config({ path: `./Starter/.env` }); // for .env to store secret variables

// app.get("/api/ids", (req, res) => {}); //get all the tasks
// app.post("/api/ids", (req, res) => {}); //create a new task
// app.get("/api/ids/:id", (req, res) => {}); //get single task
// app.patch("/api/ids/:id", (req, res) => {}); //update task
// app.delete("/api/ids/:id", (req, res) => {}); //delete task

//middleware
app.use(
  express.static(`C:/Prem/LearnNodeJS/Projects/TaskManager/Starter/public`)
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDatabase(process.env.MONGO_URI);
    app.listen(4000, () => {
      console.log("Started listening");
    });
  } catch (error) {
    console.log("error ", process.env.MONGO_URI, error);
  }
};
start();