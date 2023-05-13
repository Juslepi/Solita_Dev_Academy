import mongoose from "mongoose";
const { Schema } = mongoose;

const journeySchema = new Schema({
  depature: String,
  returnDate: String,
  departureStationId: Number,
  departureStationName: String,
  returnStationId: Number,
  returnStationName: String,
  distance: Number,
  duration: Number,
});

export const Journey = mongoose.model("Journey", journeySchema);
