const mongoose = require("mongoose");

const AbsenceSchema = new mongoose.Schema(
  {
    admitterId: {
      type: Number,
    },

    admitterNote: {
      type: String,
    },

    confirmedAt: {
      type: Date,
    },

    crewId: {
      type: Number,
      required: [true, "Crew id is required"],
    },

    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },

    id: {
      type: Number,
      required: [true, "Id is required"],
      unique: true,
    },

    memberNote: {
      type: String,
    },

    rejectedAt: {
      type: Date,
    },

    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    type: {
      type: String,
      required: [true, "Absence type is required"],
    },
    userId: {
      type: Number,
      required: [true, "User id is required"],
    },
  },
  { timestamps: true }
);

const Absence = mongoose.model("Absence", AbsenceSchema);
module.exports = Absence;
