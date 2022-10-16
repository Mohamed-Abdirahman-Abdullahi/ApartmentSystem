const Incomes = require("../../models/income/income");

const getIncomes = (req, res) => {
    Incomes.find((err, incomes) => {
        if (err) {
            res.send(err);
        }
        res.json(incomes);
    });
};

const getIncome = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    const income = await Incomes.find({ _id: removedCol })

    res.status(200).json(income)
};

const createIncome = async (req, res) => {
    const income = await Incomes.create({
        tenant: req.body.tenant,
        amount: req.body.amount,
        staff: req.body.staff,
        message: req.body.message,
    });

    res.json(income);
};

const updateIncome = async (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    const income = await Incomes.findOneAndUpdate(
        { _id: removedCol },
        {
            ...req.body,
        },
        { new: true }
    );
    res.send(income);
};

const deleteIncome = (req, res) => {
    const { id } = req.params;
    const removedCol = id.replace(':', "")

    Incomes.deleteOne({ _id: removedCol })
        .then(() => res.json({ message: "income removed" }))
        .catch((err) => res.send(err));
};

module.exports = {
    getIncomes,
    getIncome,
    createIncome,
    updateIncome,
    deleteIncome,
};