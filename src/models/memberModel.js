const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    crewId: {
      type: Number,
      required: [true, "Crew id is required"],
    },

    id: {
      type: Number,
      unique: true,
      required: [true, "Id is required"],
    },

    image: {
      type: String,
      required: [true, "Image url is required"],
    },

    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },

    userId: {
      type: Number,
      required: [true, "User id is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", MemberSchema);
module.exports = Member;
