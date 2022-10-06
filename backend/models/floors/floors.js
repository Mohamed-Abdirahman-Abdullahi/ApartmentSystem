const connection = require("../../connection/connection");
const Joi = require("joi");

const floorSchema = new connection.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        apartment: {
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

const Floors = connection.model("Floors", floorSchema);

const validate = (floor) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        apartmentName: Joi.string().required(),
        status: Joi.boolean(),
    });

    return schema.validate(floor);
};

module.exports = Floors;