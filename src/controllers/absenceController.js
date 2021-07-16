const Absence = require("../models/absenceModel");

const getAbsenceAll = (req, res) => {
  let limit = 20;
  let offset = 0;
  let page = 1;
  let condition = "";
  if (typeof req.query.limit !== "undefined") {
    limit = parseInt(req.query.limit);
  }

  if (typeof req.query.offset !== "undefined") {
    offset = parseInt(req.query.offset);
  }

  if (typeof req.query.page !== "undefined") {
    page = parseInt(req.query.page);
  }

  if (typeof req.query.tag !== "undefined") {
    query.tagList = { $in: [req.query.tag] };
  }

  /*  const AbsenceName = req.query.AbsenceName;
  const contactPersonName = req.query.contactPersonName;
  const email = req.query.email;
  const telephone = req.query.telephone;
  console.log(AbsenceName);
  if (typeof AbsenceName !== "undefined") {
    condition = {
      AbsenceName: { $regex: new RegExp(AbsenceName), $options: "i" },
    };
  }
  if (typeof contactPersonName !== "undefined") {
    condition =
      condition +
      {
        contactPersonName: {
          $regex: new RegExp(contactPersonName),
          $options: "i",
        },
      };
  }

  if (typeof email !== "undefined") {
    condition =
      condition +
      {
        email: {
          $regex: new RegExp(email),
          $options: "i",
        },
      };
  }

  if (typeof telephone !== "undefined") {
    condition =
      condition +
      {
        telephone: {
          $regex: new RegExp(telephone),
          $options: "i",
        },
      };
  } */

  /* let articles = await Article.findAll()
    .paginate({ page: page, limit: limit })
    .exec(); */

  Absence
    .find
    /* {
    $or: [
      { AbsenceName: req.query.AbsenceName },
      { contactPersonName: req.body.contactPersonName },
      { telephone: req.body.telephone },
      { email: req.body.email },
    ],
  } */
    ()
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .skip(Number(offset))
    /* .paginate({ page: page }) */
    .exec()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error occured while retriving the record" + err.message,
      });
    });
};

const getAbsenceById = (req, res) => {
  console.log(req.query);
  Absence.findById({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ msg: `No record found for id =${req.params.id} ` });
      } else {
        res.status(200).json({ data });
      }
    })
    .catch((err) => {
      res.status(500).send({
        msg:
          `Error occured while retriving record for id = ${req.params.id} ` +
          err.message,
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
