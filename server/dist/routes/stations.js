"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stationRouter = void 0;
const express_1 = __importDefault(require("express"));
const stationSchema_1 = require("../schemas/stationSchema");
const router = express_1.default.Router();
exports.stationRouter = router;
// GET Stations
router.get("/:page/:limit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sortBy = ((_a = req.query.sortBy) === null || _a === void 0 ? void 0 : _a.toString()) || "Name";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
    const page = Number.parseInt(req.params.page) || 1;
    const limit = Number.parseInt(req.params.limit) || 10;
    const stations = yield stationSchema_1.Station.find({})
        .skip((page - 1) * limit)
        .limit(limit)
        .sort([[sortBy, sortOrder]]);
    res.send(stations);
}));
// Get Single Station
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number.parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ msg: "Invalid query" });
    }
    const station = yield stationSchema_1.Station.aggregate([
        {
            $match: {
                ID: id,
            },
        },
        {
            $lookup: {
                from: "journeys",
                localField: "ID",
                foreignField: "Departure station id",
                as: "Departures",
            },
        },
        {
            $lookup: {
                from: "journeys",
                localField: "ID",
                foreignField: "Return station id",
                as: "Returns",
            },
        },
        {
            $addFields: {
                DeparturesCount: { $size: "$Departures" },
                ReturnsCount: { $size: "$Returns" },
                AvgDeparturingLength: { $avg: "$Departures.Covered distance (m)" },
                AvgReturningLength: { $avg: "$Returns.Covered distance (m)" },
            },
        },
        {
            $project: {
                Departures: 0,
                Returns: 0,
            },
        },
    ]);
    if (station === null || station === undefined)
        return res.status(404).send({ msg: "Station not found" });
    res.send(station[0]);
}));
