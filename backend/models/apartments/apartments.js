const connection = require("../../connection/connection");
const Joi = require("joi");

const apartmentSchema = new connection.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    address: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    tel: {
      type: Number
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Apartments = connection.model("Apartments", apartmentSchema);

const validate = (emp) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    location: Joi.string().required(),
    status: Joi.boolean(),
  });

  return schema.validate(emp);
};

module.exports = Apartments;