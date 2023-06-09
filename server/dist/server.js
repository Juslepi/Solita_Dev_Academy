"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const journeys_1 = require("./routes/journeys");
const stations_1 = require("./routes/stations");
const cors = require("cors");
dotenv.config();
const app = (0, express_1.default)();
exports.app = app;
const port = process.env.PORT || 3001;
const db_uri = process.env.MONGODB_URI || "";
let db;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db = yield mongoose_1.default.connect(db_uri);
        console.log("DB Connected");
    }
    catch (e) {
        console.error("DB Connection Failed");
        console.error(e);
    }
}))();
// Middleware
app.use(cors());
// Routes
app.use("/journeys", journeys_1.journeyRouter);
app.use("/stations", stations_1.stationRouter);
app.use("*", (req, res) => {
    res.status(404).send("Page not found");
});
const server = app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connection.close();
        console.log("Mongoose connection closed.");
        server.close(() => {
            console.log("Server closed.");
            process.exit(0);
        });
    }
    catch (error) {
        console.error("Error occurred while closing Mongoose connection:", error);
        process.exit(1);
    }
}));
