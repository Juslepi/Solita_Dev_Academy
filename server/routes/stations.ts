import express from "express";
import { Station } from "../schemas/stationSchema";

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

export { router as stationRouter };
