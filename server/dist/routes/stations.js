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
    const page = Number.parseInt(req.params.page) || 1;
    const limit = Number.parseInt(req.params.limit) || 10;
    const stations = yield stationSchema_1.Station.find({})
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ ID: 1 });
    res.send(stations);
}));
// Get Single Station
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const station = yield stationSchema_1.Station.findOne({ ID: id });
    res.send(station);
}));
