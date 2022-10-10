const Visitors = require("../../models/visitors/visitors");

const getVisitors = (req, res) => {
    Visitors.find((err, visitors) => {
        if (err) {
            res.send(err);
        }
        res.json(visitors);
    });
};

const getVisitor = async (req, res) => {
    const id = req.params.id;
    const removedCol = id.replace(':', "")

    const visitors = await Visitors.find({_id:removedCol})

    res.status(200).json(visitors)
};

const createVisitor = async (req, res) => {
    const visitor = await Visitors.create({
        fullname: req.body.fullname,
        gender: req.body.gender,
        tel: req.body.tel,
        address: req.body.address,
        description: req.body.description,
        tenant: req.body.tenant,
    });

    visitor.save((err, visitor) => {
        if (err) {
            res.send(err);
        }

    });
    res.json(visitor);
};

const updateVisitor = async (req, res) => {
    console.log("hucbdscbvdvhiu");
    const id = req.params.id;
    const removedCol = id.replace(':', "")
    const visitor = await Visitors.findOneAndUpdate(
        { _id: removedCol },
        {
            ...req.body
        },
        { new: true }
    );
    res.send(visitor);
};

const deleteVisitor = async (req, res) => {
    const id = req.params.id;
    const removedCol = id.replace(':', "")
    await Visitors.deleteOne({ _id: removedCol })
        .then(() => res.json({ message: "visitor deleted" }))
        .catch((err) => res.send(err));
};

module.exports = {
    getVisitors,
    getVisitor,
    createVisitor,
    updateVisitor,
    deleteVisitor,
};
