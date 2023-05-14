import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { journeyRouter } from "./routes/journeys";
import { stationRouter } from "./routes/stations";
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const db_uri = process.env.MONGODB_URI || "";
let db;

(async () => {
  try {
    db = await mongoose.connect(db_uri);
    console.log("DB Connected");
  } catch (e) {
    console.error("DB Connection Failed");
    console.error(e);
  }
})();

// Middleware
app.use(cors());

// Routes
app.use("/journeys", journeyRouter);
app.use("/stations", stationRouter);
app.use("*", (req, res) => {
  res.send("Page not found").status(404);
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
