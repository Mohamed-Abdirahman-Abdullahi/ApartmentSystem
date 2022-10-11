const Maintenances = require("../../models/maintenances/maintenances");

const getMaintenances = (req, res) => {
    Maintenances.find((err, maintenances) => {
        if (err) {
            res.send(err);
        }
        res.json(maintenances);
    });
};

const getMaintenance = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    const maintenance = await Maintenances.find({_id: removedCol})

    res.status(200).json(maintenance)
};

const createMaintenance = async (req, res) => {
    const maintenance = await Maintenances.create({
        tenant: req.body.tenant,
        subject: req.body.subject,
        message: req.body.message,
    });

    res.json(maintenance);
};

const updateMaintenance = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    const maintenance = await Maintenances.findOneAndUpdate(
        { _id: removedCol },
        {
            ...req.body,
        },
        { new: true }
    );
    res.send(maintenance);
};

const deleteMaintenance = (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    Maintenances.deleteOne({ _id: removedCol })
        .then(() => res.json({ message: "maintenance removed" }))
        .catch((err) => res.send(err));
};

module.exports = {
    getMaintenances,
    getMaintenance,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance,
};