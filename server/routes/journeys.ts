import express from "express";
import { Journey } from "../schemas/journeySchema";

const router = express.Router();

// GET journeys
router.get("/:page/:limit", async (req, res) => {
  const page = Number.parseInt(req.params.page) || 1;
  const limit = Number.parseInt(req.params.limit) || 10;
  const { orderBy } = req.query;

  const journeys = await Journey.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ Departure: -1 });

  res.send(journeys);
});

export { router as journeyRouter };
