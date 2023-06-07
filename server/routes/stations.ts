import express from "express";
import { Station } from "../schemas/stationSchema";

const router = express.Router();

// GET Stations
router.get("/:page/:limit", async (req, res) => {
  const sortBy = req.query.sortBy?.toString() || "Name";
  const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

  const page = Number.parseInt(req.params.page) || 1;
  const limit = Number.parseInt(req.params.limit) || 10;
  const stations = await Station.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort([[sortBy, sortOrder]]);

  res.send(stations);
});

// Get Single Station
router.get("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send({ msg: "Invalid query" });
  }

  const station = await Station.aggregate([
    {
      $match: {
        ID: id,
      },
    },
    {
      $lookup: {
        from: "journeys",
        localField: "ID",
        foreignField: "Departure station id",
        as: "Departures",
      },
    },
    {
      $lookup: {
        from: "journeys",
        localField: "ID",
        foreignField: "Return station id",
        as: "Returns",
      },
    },
    {
      $addFields: {
        DeparturesCount: { $size: "$Departures" },
        ReturnsCount: { $size: "$Returns" },
        AvgDeparturingLength: { $avg: "$Departures.Covered distance (m)" },
        AvgReturningLength: { $avg: "$Returns.Covered distance (m)" },
      },
    },
    {
      $project: {
        Departures: 0,
        Returns: 0,
      },
    },
  ]);

  if (station === null || station === undefined)
    return res.status(404).send({ msg: "Station not found" });

  res.send(station[0]);
});

export { router as stationRouter };
