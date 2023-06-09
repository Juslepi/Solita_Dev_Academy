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
exports.journeyRouter = void 0;
const express_1 = __importDefault(require("express"));
const journeySchema_1 = require("../schemas/journeySchema");
const router = express_1.default.Router();
exports.journeyRouter = router;
// GET journeys
router.get("/:page/:limit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let sortBy = ((_a = req.query.sortBy) === null || _a === void 0 ? void 0 : _a.toString()) || "Name";
    sortBy = sortBy.replace("+", " ");
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
    const page = Number.parseInt(req.params.page) || 1;
    const limit = Number.parseInt(req.params.limit) || 10;
    // TODO - Slow, need to optimize
    const journeys = yield journeySchema_1.Journey.aggregate([
        {
            $addFields: {
                Duration: {
                    $divide: [
                        {
                            $subtract: [
                                { $dateFromString: { dateString: "$Return" } },
                                { $dateFromString: { dateString: "$Departure" } },
                            ],
                        },
                        60000,
                    ],
                },
            },
        },
        { $sort: { [sortBy]: sortOrder } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
    ]);
    res.send(journeys);
}));
