const {
    getIncomes,
    getIncome,
    createIncome,
    updateIncome,
    deleteIncome,
} = require("../../controllers/income/incomeController");

const router = require("express").Router();

router.get("/", getIncomes);
router.get("/:id", getIncome);
router.post("/", createIncome);
router.patch("/:id", updateIncome);
router.delete("/:id", deleteIncome);

module.exports = router;