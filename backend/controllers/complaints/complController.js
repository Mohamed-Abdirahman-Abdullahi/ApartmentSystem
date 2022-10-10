const Complaints = require("../../models/complaints/complaints");

const getComplaints = (req, res) => {
    Complaints.find((err, complaints) => {
        if (err) {
            res.send(err);
        }
        res.json(complaints);
    });
};

const getComplaint = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    const complaint = await Complaints.find({_id: removedCol})

    res.status(200).json(complaint)
};

const createComplaint = async (req, res) => {
    const complaint = await Complaints.create({
        tenant: req.body.tenant,
        subject: req.body.subject,
        message: req.body.message,
    });

    res.json(complaint);
};

const updateComplaint = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    const cmplaint = await Complaints.findOneAndUpdate(
        { _id: removedCol },
        {
            ...req.body,
        },
        { new: true }
    );
    res.send(cmplaint);
};

const deleteComplaint = (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    Complaints.deleteOne({ _id: removedCol })
        .then(() => res.json({ message: "complaint Deleted" }))
        .catch((err) => res.send(err));
};

module.exports = {
    getComplaints,
    getComplaint,
    createComplaint,
    updateComplaint,
    deleteComplaint,
};