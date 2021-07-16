const Member = require("../models/memberModel");

const getMemberAll = (req, res) => {
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

  /* const MemberName = req.query.MemberName;
  const contactPersonName = req.query.contactPersonName;
  const email = req.query.email;
  const telephone = req.query.telephone;
  console.log(MemberName);
  if (typeof MemberName !== "undefined") {
    condition = {
      MemberName: { $regex: new RegExp(MemberName), $options: "i" },
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

  Member
    .find
    /* {
    $or: [
      { MemberName: req.query.MemberName },
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
      res.status(200).json({ members: data });
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error occured while retriving the record" + err.message,
      });
    });
};

const getMemberById = (req, res) => {
  console.log(req.query);
  Member.findById({ _id: req.params.id })
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

const createMember = (req, res) => {
  const member = new Member({
    crewId: req.body.crewId,
    id: req.body.id,
    image: req.body.image,
    name: req.body.name,
    userId: req.body.userId,
  });

  member
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

const updateMember = (req, res) => {
  Member.findByIdAndUpdate(req.params.id, req.body)
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

const deleteMember = (req, res) => {
  Member.findByIdAndDelete(req.params.id)
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

const deleteMemberAll = (req, res) => {
  Member.deleteMany()
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
  getMemberAll,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  deleteMemberAll,
};
