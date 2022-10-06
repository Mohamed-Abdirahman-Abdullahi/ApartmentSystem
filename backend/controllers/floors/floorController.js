const Floors = require("../../models/floors/floors");
const Apartments = require("../../models/apartments/apartments");


const getFloors = (req, res) => {
    Floors.find((err, floors) => {
        if (err) {
            res.send(err);
        }
        res.json(floors);
    });
};

const getFloor = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")
    const floor = await Floors.find({ _id: removedCol })
    res.status(200).json(floor)
};

const createFloor = async (req, res) => {
    let floor = await Floors.findOne({ name: req.body.name });
    if (floor) return res.status(400).send("floor already registered");

    const apartment = await Apartments.findOne({ name: req.body.apartment });
    if (!apartment) return res.status(404).send("invalid apartment name");

    floor = await Floors.create({
        name: req.body.name,
        apartment: {
            name: apartment.name,
        },
    });

    res.send(floor);
};

const updateFloor = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")
    Floors.findOneAndUpdate(
        { _id: removedCol },
        {
            ...req.body
        },
        { new: true },
        (err, floor) => {
            if (err) {
                res.send(err);
            } else res.json(floor);
        }
    );
};

const deleteFloor = (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    Floors.deleteOne({ _id: removedCol })
        .then(() => res.json({ message: "Floors Deleted" }))
        .catch((err) => res.send(err));
};

module.exports = {
    getFloor,
    getFloors,
    createFloor,
    updateFloor,
    deleteFloor,
};