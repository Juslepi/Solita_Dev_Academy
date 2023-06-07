"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Station = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const stationSchema = new mongoose_1.default.Schema({
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
exports.Station = mongoose_1.default.model("Station", stationSchema);
