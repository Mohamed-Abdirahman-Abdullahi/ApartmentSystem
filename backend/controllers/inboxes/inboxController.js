const Inboxes = require("../../models/inboxes/inboxes");

const getInboxes = (req, res) => {
    Inboxes.find((err, inboxes) => {
        if (err) {
            res.send(err);
        }
        res.json(inboxes);
    });
};

const getInbox = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    const maintenance = await Inboxes.find({_id: removedCol})

    res.status(200).json(maintenance)
};

const createInbox = async (req, res) => {
    const maintenance = await Inboxes.create({
        tenant: req.body.tenant,
        subject: req.body.subject,
        message: req.body.message,
        type: req.body.type
    });

    res.json(maintenance);
};

const updateInbox = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    const maintenance = await Inboxes.findOneAndUpdate(
        { _id: removedCol },
        {
            ...req.body,
        },
        { new: true }
    );
    res.send(maintenance);
};

const deleteInbox = (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    Inboxes.deleteOne({ _id: removedCol })
        .then(() => res.json({ message: "maintenance removed" }))
        .catch((err) => res.send(err));
};

module.exports = {
    getInboxes,
    getInbox,
    createInbox,
    updateInbox,
    deleteInbox,
};