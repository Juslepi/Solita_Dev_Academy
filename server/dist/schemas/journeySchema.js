"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Journey = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
exports.Journey = mongoose_1.default.model("Journey", journeySchema);
