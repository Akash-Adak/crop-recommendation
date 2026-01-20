import request from 'supertest';
import { expect as _expect } from 'chai';
const expect = _expect;

// Import your Express app (adjust path if needed)
import app from '../server'; 

describe('Crop Recommendation API', () => {
  it('should return recommended crop and top 3 crops for valid input', async () => {
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

  it("❌ should return 500 if Python ML service fails", async () => {
    axios.post.restore();
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
