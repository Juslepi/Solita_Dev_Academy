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
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const server_1 = require("../server");
chai_1.default.use(chai_http_1.default);
const { expect } = chai_1.default;
describe("Journey Router", () => {
    it("should return journeys", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield chai_1.default.request(server_1.app).get("/journeys/1/10");
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
    })).timeout(10000);
});
describe("Station Router Router", () => {
    it("should return stations", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield chai_1.default.request(server_1.app).get("/stations/1/10");
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
    })).timeout(10000);
    it("should return single station", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield chai_1.default.request(server_1.app).get("/stations/1");
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
    }));
    it("should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield chai_1.default.request(server_1.app).get("/stations/invalidId");
        expect(res).to.have.status(400);
    }));
});
