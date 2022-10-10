const connection = require("../../connection/connection");
const Joi = require("joi");

const unitSchema = new connection.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    numberOfRooms: {
      type: Number,
      required: true,
      default: 1,
    },
    numberOfKitchens: {
      type: Number,
      required: true,
      default: 1,
    },
    numberOfBathRooms: {
      type: Number,
      required: true,
      default: 1,
    },
    numberOfBalkings: {
      type: Number,
      required: true,
      default: 0,
    },
    floor: {
      type: new connection.Schema({
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

const Units = connection.model("Units", unitSchema);

const validate = (floor) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    floorName: Joi.string().required(),
    numberOfBathRooms: Joi.number().min(1),
    numberOfKitchens: Joi.number().min(1),
    numberOfRooms: Joi.number().min(1),
    status: Joi.boolean(),
  });

  return schema.validate(floor);
};

module.exports = Units