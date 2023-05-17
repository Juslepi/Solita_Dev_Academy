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
const journeySchema_1 = require("../schemas/journeySchema");
const router = express_1.default.Router();
exports.stationRouter = router;
// GET Stations
router.get("/:page/:limit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sort = ((_a = req.query.sort) === null || _a === void 0 ? void 0 : _a.toString()) || "Name";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
    const page = Number.parseInt(req.params.page) || 1;
    const limit = Number.parseInt(req.params.limit) || 10;
    const stations = yield stationSchema_1.Station.find({})
        .skip((page - 1) * limit)
        .limit(limit)
        .sort([[sort, sortOrder]]);
    res.send(stations);
}));
// Get Single Station
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number.parseInt(req.params.id) || 1;
    const station = yield stationSchema_1.Station.findOne({ ID: id });
    if (station === null || station === undefined) {
        return res.send({ msg: "Station not found" }).status(404);
    }
    // Journeys starting from location
    const departuresCount = yield journeySchema_1.Journey.find({
        ["Departure station id"]: id,
    })
        .count()
        .exec();
    station.DeparturesCount = departuresCount;
    // Journeys ending at location
    const returnsCount = yield journeySchema_1.Journey.find({
        ["Return station id"]: id,
    }).count();
    station.ReturnsCount = returnsCount;
    res.send(station).status(200);
}));
