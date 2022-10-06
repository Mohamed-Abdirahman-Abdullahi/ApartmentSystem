const Tenant = require("../../models/tenants/tenants");

const getTenants = (req, res) => {
    Tenant.find((err, tenants) => {
        if (err) {
            res.send(err);c
        }
        res.json(tenants);
    });
};

const getTenant = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    const tenants = await Tenant.find({_id: removedCol})
    Tenant(tenants)

    res.status(200).json(tenants)
};

const createTenant = async (req, res) => {
    const tenant = await Tenant.create({
        fullname: req.body.fullname,
        gender: req.body.gender,
        tel: req.body.tel,
        email: req.body.email,
        address: req.body.address,
        guarantor: req.body.guarantor,
        createdBy: req.body.createdBy
    });

    res.json(tenant);
};

const updateTenant = (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")
    Tenant.findOneAndUpdate(
    
        { _id: removedCol },

        
        {
           ...req.body

            
        },
        { new: true },
        (err, Tenant) => {
            if (err) {
                res.send(err);
            } else res.json(Tenant);
        }
    );
};

const deleteTenant = (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")
    Tenant.deleteOne({ _id: removedCol })
        .then(() => res.json({ message: "tenant Deleted" }))
        .catch((err) => res.send(err));
};

module.exports = {
    getTenants,
    getTenant,
    createTenant,
    updateTenant,
    deleteTenant,
};