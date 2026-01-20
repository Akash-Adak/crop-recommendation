import request from "supertest";
import { expect } from "chai";
import sinon from "sinon";
import axios from "axios";
import app from "../server.js"; // ✅ extension required

describe("Crop Recommendation API", () => {

  afterEach(() => {
    sinon.restore(); // ✅ clean all stubs after each test
  });

  it("should return recommended crop and top 3 crops for valid input", async () => {
    // mock ML service response
    sinon.stub(axios, "post").resolves({
      data: {
        recommended_crop: "rice",
        top_3: ["rice", "wheat", "maize"]
      }
    });

    const res = await request(app)
      .post("/api/crop/recommend")
      .send({
        N: 90,
        P: 42,
        K: 43,
        ph: 6.5,
        lat: 28.6,
        lon: 77.2
      });

    expect(res.status).to.equal(200);
    expect(res.body.weather_used.source).to.include("OpenWeatherMap");
    expect(res.body.weather_used.temp).to.equal(26);
    expect(res.body.weather_used.humid).to.equal(70);
    expect(res.body.weather_used.rain).to.equal(120);
  });

  it("should return 500 if Python ML service fails", async () => {
    sinon.stub(axios, "post").rejects(new Error("ML server down"));

    const res = await request(app)
      .post("/api/crop/recommend")
      .send({
        N: 90,
        P: 42,
        K: 43,
        ph: 6.5
      });

    expect(res.status).to.equal(500);
    expect(res.body.error).to.exist;
  });
});
