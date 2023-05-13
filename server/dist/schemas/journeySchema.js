"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Journey = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const journeySchema = new Schema({
    Departure: { type: Date, required: true },
    Return: { type: Date, required: true },
    "Departure station id": { type: Number, required: true },
    "Departure station name": { type: String, required: true },
    "Return station id": { type: Number, required: true },
    "Return station name": { type: String, required: true },
    "Covered distance (m)": { type: Number, required: true },
});
exports.Journey = mongoose_1.default.model("Journey", journeySchema);
