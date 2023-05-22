import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../server";
import Mocha = require("mocha");

chai.use(chaiHttp);
const { expect } = chai;

const mocha = new Mocha();

describe("Journey Router", () => {
  it("should return journeys", async () => {
    const res = await chai.request(app).get("/journeys/1/10");

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
  }).timeout(10000);
});

describe("Station Router Router", () => {
  it("should return stations", async () => {
    const res = await chai.request(app).get("/stations/1/10");

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
  }).timeout(10000);
});
