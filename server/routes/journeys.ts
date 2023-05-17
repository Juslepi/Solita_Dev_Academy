import express from "express";
import { Journey } from "../schemas/journeySchema";

const router = express.Router();

// GET journeys
router.get("/:page/:limit", async (req, res) => {
  let sort = req.query.sort?.toString() || "Name";
  sort = sort.replace("+", " ");
  console.log(sort);

  const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
  const page = Number.parseInt(req.params.page) || 1;
  const limit = Number.parseInt(req.params.limit) || 10;

  const journeys = await Journey.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort([[sort, sortOrder]]);

  res.send(journeys);
});

export { router as journeyRouter };
