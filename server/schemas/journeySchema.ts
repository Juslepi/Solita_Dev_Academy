import mongoose from "mongoose";
const { Schema } = mongoose;

const journeySchema = new Schema({
  Departure: { type: Date, required: true },
  Return: { type: Date, required: true },
  "Departure station id": { type: Number, required: true },
  "Departure station name": { type: String, required: true },
  "Return station id": { type: Number, required: true },
  "Return station name": { type: String, required: true },
  "Covered distance (m)": { type: Number, required: true },
});

export const Journey = mongoose.model("Journey", journeySchema);
