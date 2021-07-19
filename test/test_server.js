//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

//TODO: Add more test cases for failed events and required parameters or query validations.

describe('user', ()=>{
  /**
   * Test signup route
   */
  describe("POST user", () => {
    it("it should POST a user signup request", (done) => {
      let user = {
        name: "Toby",
        username: "toby",
        password: "Test1234",
        email: "toby@office.com",
        dob: "1985-11-05T14:48:00.000Z",
        address: {
          name: "Home",
          line1: "01-04",
          line2: "Bedok",
          position: {
            coordinates: [1.337876, 103.938495],
          },
        },
      };

      chai
        .request(server)
        .post("/api/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  /**
   * Test fail signup route
   */
  describe("POST user and fail", () => {
    it("it should POST a user signup request and fail", (done) => {
      let user = {
        name: "Toby",
        username: "toby",
        password: "Test1234",
        email: "toby@office.com",
        dob: "1985-11-05T14:48:00.000Z",
        address: {
          name: "Home",
          line1: "01-04",
          line2: "Bedok",
          position: {
            coordinates: [1.337876, 103.938495],
          },
        },
      };

      chai
        .request(server)
        .post("/api/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object')
          res.body.should.have.property('message')
          res.body.should.have.property('message').eql('Email already taken')
          done();
        });
    });
  })
})