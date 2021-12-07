import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { eventsControllerMethods } from "./controllers/events";
import makeCallback from "./express-callback";
import { process } from "babel-jest";

const Database = require("../db/db.js");

dotenv.config();

const apiRoot = process.env.API_ROOT;
const app = express();
app.use(bodyParser.json());
app.use((_, res, next) => {
  res.set({ Tk: "!" });
  next();
});

Database.connect({
  username: process.env.DB_USER,
  password: process.env.DB_USER_PASSWORD,
  dbname: process.env.EVENTS_DB_NAME,
});

//TODO : for each controller create init() method and map routes to controller methods inside. then, loop and call all init methods here

app.post(`/event/create`, makeCallback(eventsControllerMethods.postEvent));
app.get(`/event/:id`, makeCallback(eventsControllerMethods.getEvent));
app.get(`/events`, makeCallback(eventsControllerMethods.getEventsInSlot));

//TODO: add NOT FOUND

// listen for requests
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

export default app;
