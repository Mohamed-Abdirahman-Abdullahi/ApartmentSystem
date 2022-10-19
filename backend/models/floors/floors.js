const connection = require("../../connection/connection");
const Joi = require("joi");
const mongoose = require("mongoose");
const floorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    apartment: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
        },
      }),
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Floors = mongoose.model("Floors", floorSchema);

const validate = (floor) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    apartmentName: Joi.string().required(),
    status: Joi.boolean(),
  });

  return schema.validate(floor);
};

module.exports = Floors;
