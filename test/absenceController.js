const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const Absence = require("../src/models/absenceModel");
//Assertion
chai.use(chaiHttp);
const should = chai.should();
const _id = "60f1d5c0510b891c84cb8822";
/**
 * before test deleting everything
 */
describe("Absences", () => {
  beforeEach((done) => {
    Absence.deleteMany({}, (err) => {
      done();
    });
  });
});
/*
 * Test the /GET route
 */
describe("/GET absences", () => {
  it("It should GET all the absences records", (done) => {
    chai
      .request(server)
      .get("/api/v1/absence")
      .end((err, res) => {
        //console.log(res.body);
        res.should.have.status(200);
        done();
      });
  });
});

/*
 * Test the /POST route
 */
describe("/POST absence", () => {
  it("It should POST a absence record", (done) => {
    let absence = {
      admitterId: "",
      admitterNote: "",
      confirmedAt: "2020-12-12T18:03:55.000+01:00",
      createdAt: "2020-12-12T14:17:01.000+01:00",
      crewId: 352,
      endDate: "2021-01-13",
      id: 6673,
      memberNote: "test",
      rejectedAt: "2020-12-12T18:03:55.000+01:00",
      startDate: "2021-01-13",
      type: "sickness",
      userId: 6673,
    };
    chai
      .request(server)
      .post("/api/v1/absence/create")
      .send(absence)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        department.should.have.property("admitterId");
        department.should.have.property("admitterNote");
        department.should.have.property("confirmedAt");
        department.should.have.property("createdAt");
        department.should.have.property("crewId");
        department.should.have.property("endDate");
        department.should.have.property("id");
        department.should.have.property("memberNote");
        department.should.have.property("rejectedAt");
        department.should.have.property("startDate");
        department.should.have.property("type");
        department.should.have.property("userId");

        done();
      });
  });
});

/**
 * Test Get/:id
 */
describe("/GET/:id absence", () => {
  const id = "vacation";
  it("it should GET a absence record by the given id", (done) => {
    chai
      .request(server)
      .get(`/api/v1/absence/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

/*
 * Test the /PUT/:id route
 */
describe("/PUT/:id absence", () => {
  it("it should UPDATE a absence record given the id", (done) => {
    let absence = {
      admitterId: null,
      admitterNote: "",
      confirmedAt: "2020-12-12T18:03:55.000+01:00",
      createdAt: "2020-12-12T14:17:01.000+01:00",
      crewId: 352,
      endDate: "2021-01-13",
      id: 2351,
      memberNote: "test",
      rejectedAt: null,
      startDate: "2021-01-13",
      type: "sickness",
      userId: 2664,
    };

    chai
      .request(server)
      .put(`/api/v1/absence/update/${_id}`)
      .send(absence)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

/*
 * Test the /DELETE/:id route
 */
describe("/DELETE/:id absence", () => {
  it("it should DELETE a absence record given the id", (done) => {
    chai
      .request(server)
      .delete(`/api/v1/absence/delete/${_id}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
