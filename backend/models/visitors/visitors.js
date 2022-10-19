const connection = require("../../connection/connection");
const mongoose = require("mongoose");
const visitorScheme = mongoose.Schema(
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
    tenant: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const visitors = mongoose.model("Visitor", visitorScheme);
module.exports = visitors;
