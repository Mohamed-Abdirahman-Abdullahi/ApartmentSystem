const Emp = require("../../models/employees/Employees");

const getEmpolyees = (req, res) => {
    Emp.find((err, emplys) => {
        if (err) {
            res.send(err);
        }
        res.json(emplys);
    });
};

const getEmployee = async (req, res) => {
    const { id } = req.params

    const removedCol = id.replace(':', "")

    const emply = await Emp.find({_id: removedCol})
    res.status(200).json(emply)
}

const creatEmpolyee = async (req, res) => {
    const emp = await Emp.create({
        fullname: req.body.fullname,
        gender: req.body.gender,
        tel: req.body.tel,
        email: req.body.email,
        address: req.body.address,
        department: req.body.department,
        salary: req.body.salary,
        createdBy: req.body.createdBy,
        status: req.body.status,
        endDate: req.body.endDate
    });

    res.json(emp);
};

const updateEmployee= (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")
    Emp.findOneAndUpdate(
        { _id: removedCol },
        {
            ...req.body
        },
        { new: true },
        (err, Emp) => {
            if (err) {
                res.send(err);
            } else res.json(Emp);
        }
    );
};

const deleteEmployee = (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")
    Emp.deleteOne({ _id: removedCol })
        .then(() => res.json({ message: "Employee Deleted" }))
        .catch((err) => res.send(err));
};

module.exports = {
    getEmpolyees,
    getEmployee,
    creatEmpolyee,
    updateEmployee,
    deleteEmployee,
};