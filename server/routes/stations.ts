import express from "express";
import { Station } from "../schemas/stationSchema";

const router = express.Router();

// GET Stations
router.get("/", async (req, res) => {
  const stations = await Station.find({});

  res.send(stations);
});

export { router as stationRouter };
