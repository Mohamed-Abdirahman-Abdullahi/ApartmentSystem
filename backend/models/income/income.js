const connection = require("../../connection/connection");
const mongoose = require("mongoose");

const incomeSchema = mongoose.Schema(
  {
    tenant: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    staff: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const Incomes = mongoose.model("Income", incomeSchema);
module.exports = Incomes;
