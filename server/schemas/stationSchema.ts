import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
  FID: { type: Number, required: true },
  ID: { type: Number, required: true },
  Name: { type: String, required: true },
  Address: { type: String, required: true },
  Capacity: { type: Number, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  DeparturesCount: Number,
  ReturnsCount: Number,
});

export const Station = mongoose.model("Station", stationSchema);
