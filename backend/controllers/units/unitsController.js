const Units = require("../../models/units/units");
const Floors = require("../../models/floors/floors");


const getUnits = (req, res) => {
    Units.find((err, floors) => {
        if (err) {
            res.send(err);
        }
        res.json(floors);
    });
};

const getUnit = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")
    const unit = await Units.find({ _id: removedCol })
    res.status(200).json(unit)
};

const createUnit = async (req, res) => {
    let unit = await Units.findOne({ name: req.body.name });
    if (unit) return res.status(400).send("unit already registered");

    const floor = await Floors.findOne({ name: req.body.floor });
    if (!floor) return res.status(404).send("invalid unit name");

    unit = await Units.create({
        name: req.body.name,
        floor: {
            name: floor.name,
        },
        numberOfBathRooms: req.body.numberOfBathRooms,
        numberOfKitchens: req.body.numberOfKitchens,
        numberOfRooms: req.body.numberOfRooms,
    });

    res.send(unit);
};
const updateUnit = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    const unit = await Units.findOneAndUpdate(
        {_id: removedCol},
        {
           ...req.body
        },
        { new: true }
    );

    res.send(unit);
};

const deleteUnit = (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    Units.deleteOne({ _id: removedCol })
        .then(() => res.json({ message: "Unit Deleted" }))
        .catch((err) => res.send(err));
};

module.exports = {
    getUnits,
    getUnit,
    createUnit,
    updateUnit,
    deleteUnit,
};