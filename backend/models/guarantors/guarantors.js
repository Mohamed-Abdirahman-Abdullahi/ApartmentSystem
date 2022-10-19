const connection = require("../../connection/connection");
const mongoose = require("mongoose");

const GrantSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },

    tel: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const guarantors = mongoose.model("Guarantors", GrantSchema);
module.exports = guarantors;
