const Apartments = require("../../models/apartments/apartments");

const getApartments = (req, res) => {
    Apartments.find((err, aparts) => {
        if (err) {
            res.send(err);
        }
        res.json(aparts);
    });
};

const getApartment = async (req, res) => {
    const { id } = req.params

    const removedCol = id.replace(':', "")

    const apartment = await Apartments.find({ _id: removedCol })
    res.status(200).json(apartment)
}

const createApartment = async (req, res) => {
    const apartment = await Apartments.create({
        name: req.body.name,
        location: req.body.location,
        address: req.body.address,
        tel: req.body.tel
    });

    res.json(apartment);
};

const updateApartment = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")
    Apartments.findOneAndUpdate(
        { _id: removedCol },
        {
            ...req.body
        },
        { new: true },
        (err, apart) => {
            if (err) {
                res.send(err);
            } else res.json(apart);
        }
    );
};

const deleteApartment = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")
    await Apartments.deleteOne({ _id: removedCol })
        .then(() => res.json({ message: "Apartment Removed" }))
        .catch((err) => res.send(err));
};

module.exports = {
    getApartments,
    getApartment,
    createApartment,
    updateApartment,
    deleteApartment,
};