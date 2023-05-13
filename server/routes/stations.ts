import express from "express";
import { Station } from "../schemas/stationSchema";
import { Journey } from "../schemas/journeySchema";

const router = express.Router();

// GET Stations
router.get("/:page/:limit", async (req, res) => {
  const page = Number.parseInt(req.params.page) || 1;
  const limit = Number.parseInt(req.params.limit) || 10;
  const stations = await Station.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ ID: 1 });

  res.send(stations);
});

// Get Single Station
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const station = await Station.findOne({ ID: id });

  if (station === null || station === undefined) {
    return res.send({ msg: "Station not found" }).status(404);
  }

  // Journeys starting from location
  const departuresCount = await Journey.find({
    ["Departure station id"]: id,
  })
    .count()
    .exec();
  station.DeparturesCount = departuresCount;

  // Journeys ending at location
  const returnsCount = await Journey.find({
    ["Return station id"]: id,
  }).count();
  station.ReturnsCount = returnsCount;

  res.send(station).status(200);
});

export { router as stationRouter };
