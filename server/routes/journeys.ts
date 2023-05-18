import express from "express";
import { Journey } from "../schemas/journeySchema";

const router = express.Router();

// GET journeys
router.get("/:page/:limit", async (req, res) => {
  let sortBy = req.query.sortBy?.toString() || "Name";
  sortBy = sortBy.replace("+", " ");

  const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
  const page = Number.parseInt(req.params.page) || 1;
  const limit = Number.parseInt(req.params.limit) || 10;

  const journeys = await Journey.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort([[sortBy, sortOrder]]);

  res.send(journeys);
});

export { router as journeyRouter };
