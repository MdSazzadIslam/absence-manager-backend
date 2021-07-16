const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const Department = require("../src/models/departmentModel");
//Assertion
chai.use(chaiHttp);
const should = chai.should();

const id = "60eb56b7c76d2b3398e7aed1";

/**
 * before test deleting everything
 */
describe("Books", () => {
  beforeEach((done) => {
    Department.deleteMany({}, (err) => {
      done();
    });
  });
});
/*
 * Test the /GET route
 */
describe("/GET departments", () => {
  it("It should GET all the departments", (done) => {
    chai
      .request(server)
      .get("/api/v1/department")
      .end((err, res) => {
        //console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(0);
        done();
      });
  });
});

/*
 * Test the /POST route
 */
describe("/POST department", () => {
  it("It should POST a department", (done) => {
    let department = {
      departmentName: "HR",
      contactPersonName: "Adam",
      email: "net_sazzad@yahoo.com",
      telephone: "01722536673",
    };
    chai
      .request(server)
      .post("/api/v1/department/create")
      .send(department)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        department.should.have.property("departmentName");
        department.should.have.property("contactPersonName");
        department.should.have.property("email");
        department.should.have.property("telephone");
        done();
      });
  });
});

/**
 * Test Get/:id
 */
describe("/GET/:id department", () => {
  it("it should GET a department by the given id", (done) => {
    chai
      .request(server)
      .get("/api/v1/department/" + id)
      .end((err, res) => {
        //console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("departmentName");
        res.body.should.have.property("contactPersonName");
        res.body.should.have.property("email");
        res.body.should.have.property("telephone");
        res.body.should.have.property("_id").eql(id);
        done();
      });
  });
});

/*
 * Test the /PUT/:id route
 */
describe("/PUT/:id department", () => {
  it("it should UPDATE a department given the id", (done) => {
    let department = {
      departmentName: "IT",
      contactPersonName: "Henry",
      email: "netsazzad@gmail.com",
      telephone: "01722536673",
    };

    chai
      .request(server)
      .put("/api/v1/department/update/" + id)
      .send(department)
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
describe("/DELETE/:id book", () => {
  it("it should DELETE a department given the id", (done) => {
    chai
      .request(server)
      .delete("/api/v1/department/delete/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
