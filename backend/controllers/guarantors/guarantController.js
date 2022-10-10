const Guarantors = require("../../models/guarantors/guarantors");

const getGuarantors = (req, res) => {
    Guarantors.find((err, guarants) => {
        if (err) {
            res.send(err);
        }
        res.json(guarants);
    });
};

const getGuarantor = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    const guarantor = await Guarantors.find({ _id: removedCol })

    res.status(200).json(guarantor)
};

const createGuarantor = async (req, res) => {
    const guarantor = await Guarantors.create({
        fullname: req.body.fullname,
        gender: req.body.gender,
        tel: req.body.tel,
        address: req.body.address,
        title: req.body.title,
        description: req.body.description
    });

    res.json(guarantor);
};

const updateGuarantor = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    const guarantor = await Guarantors.findOneAndUpdate(
        { _id: removedCol },

        {
            ...req.body
        },

        { new: true }
    );
    res.send(guarantor);
};

const deleteGuarantor = (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    Guarantors.deleteOne({ _id: removedCol })
        .then(() => res.json({ message: "Guarantor Deleted" }))
        .catch((err) => res.send(err));
};

module.exports = {
    getGuarantors,
    getGuarantor,
    createGuarantor,
    updateGuarantor,
    deleteGuarantor,
};