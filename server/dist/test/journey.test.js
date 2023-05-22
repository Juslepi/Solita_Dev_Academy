"use strict";
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
    it("should return journeys", (done) => {
        chai_1.default
            .request(server_1.app)
            .get("/journeys/1/10")
            .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
        });
        done();
    });
});
