const request = require("supertest");
const app = require("../server");

describe("GET /", function() {
  it("should get natural language form of date", function(done) {
    const natural = "December 15, 2015";
    const unix = "1450137600";
    let url = `/${unix}`;
    request(app)
      .get(`/${unix}`)
      .expect(200)
      .expect(res => {
        expect(res.body.unix).toBe(unix);
        expect(res.body.natural).toBe(natural);
      })
      .end((err, res) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it("should return null on invalid time stamp", done => {
    request(app)
      .get(`/day`)
      .expect(200)
      .expect(res => {
        expect(res.body.unix).toBe(null);
        expect(res.body.natural).toBe(null);
      })
      .end((err, res) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });
});
