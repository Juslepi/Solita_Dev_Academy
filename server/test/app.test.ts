import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../server";

chai.use(chaiHttp);
const { expect } = chai;

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

  it("should return single station", async () => {
    const res = await chai.request(app).get("/stations/1");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
  });

  it("should return 400", async () => {
    const res = await chai.request(app).get("/stations/invalidId");
    expect(res).to.have.status(400);
  });
});
