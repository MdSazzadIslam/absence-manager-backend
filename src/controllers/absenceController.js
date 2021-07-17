const Absence = require("../models/absenceModel");
const Member = require("../models/memberModel");

const getAbsenceAll = (req, res) => {
  let limit = req.query.limit;
  let offset = 0;
  let page = req.query.page;

  if (typeof req.query.limit !== "undefined") {
    limit = parseInt(req.query.limit);
  }

  if (typeof req.query.offset !== "undefined") {
    offset = parseInt(req.query.page - 1) * parseInt(req.query.offset);
  }

  if (typeof req.query.page !== "undefined") {
    page = parseInt(req.query.page);
  }

  let promises = [
    Absence.find({})
      .sort({ userId: "asc" })
      .limit(Number(limit))
      .skip(Number(page))
      .exec(),
    //Absence.countDocuments().exec(),
    Member.find({}).exec(),
  ];
  Promise.all(promises)
    .then((data) => {
      res.status(200).json({ absences: data, page: page });
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error occured while retriving the record" + err.message,
      });
    });
};

const getAbsenceById = (req, res) => {
  let firstLetter = req.params.id.charAt(0);
  let page = req.query.page;

  let promises = "";
  if (isNaN(firstLetter) == false) {
    console.log("date");
    promises = [
      Absence.find({
        $or: [{ startDate: new Date(req.params.id) }],
      })
        .sort({ userId: "asc" })
        .skip(Number(page))
        .exec(),
      //Absence.countDocuments().exec(),
      Member.find({}).exec(),
    ];
  } else {
    if (typeof req.params.id !== "undefined") {
      condition = {
        type: {
          $regex: new RegExp(req.params.id),
          $options: "i",
        },
      };
    }
    promises = [
      Absence.find(condition)
        .sort({ userId: "asc" })
        //.limit(Number(limit))
        .skip(Number(page))
        .exec(),
      //Absence.countDocuments().exec(),
      Member.find({}).exec(),
    ];
  }

  Promise.all(promises)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ msg: `No record found for id =${req.params.id} ` });
      } else {
        res.status(200).json({ absences: data });
      }
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error occured while retriving the record" + err.message,
      });
    });
};

const createAbsence = (req, res) => {
  const absence = new Absence({
    admitterId: req.body.admitterId,
    admitterNote: req.body.admitterNote,
    confirmedAt: req.body.confirmedAt,
    crewId: req.body.crewId,

    endDate: req.body.endDate,
    id: req.body.id,
    memberNote: req.body.memberNote,
    rejectedAt: req.body.rejectedAt,

    startDate: req.body.startDate,
    type: req.body.type,
    userId: req.body.userId,
  });

  absence
    .save()
    .then((data) => {
      res.status(201).send({
        msg: "Record saved successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error occured while saving the record" + err.message,
      });
    });
};

const updateAbsence = (req, res) => {
  Absence.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          msg: `Can not update the record with id ${req.params.id}`,
        });
      } else {
        res.send("Record updated successfully");
      }
    })
    .catch((err) => {
      res.status(500).send({
        msg:
          `Error occured while updating the record with id ${req.params.id} ` +
          err.message,
      });
    });
};

const deleteAbsence = (req, res) => {
  Absence.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          msg: `Can not delete the record with id ${req.params.id}`,
        });
      } else {
        res.send("Data deleted successfully");
      }
    })
    .catch((err) => {
      res.status(500).send({
        msg:
          `Error occured while deleting the record with id ${req.params.id} ` +
          err.message,
      });
    });
};

const deleteAbsenceAll = (req, res) => {
  Absence.deleteMany()
    .then((data) => {
      res.send(`${data.deletedCount} records deleted successfully`);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error occured while deleting all the records " + err.message,
      });
    });
};

module.exports = {
  getAbsenceAll,
  getAbsenceById,
  createAbsence,
  updateAbsence,
  deleteAbsence,
  deleteAbsenceAll,
};
