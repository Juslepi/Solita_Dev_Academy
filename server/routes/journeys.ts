import express from "express";
import { Journey } from "../schemas/journeySchema";

const router = express.Router();

// GET journeys
router.get("/", async (req, res) => {
  const journey = await Journey.findOne({ _id: "645e3dbd021a01bf14bc3e88" });
  res.send(journey);
});

export { router as journeyRouter };
