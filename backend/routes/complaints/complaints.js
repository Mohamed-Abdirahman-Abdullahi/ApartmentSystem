const {
    getComplaints,
    getComplaint,
    createComplaint,
    updateComplaint,
    deleteComplaint,
} = require("../../controllers/complaints/complController");

const router = require("express").Router();

router.get("/", getComplaints);
router.get("/:id", getComplaint);
router.post("/", createComplaint);
router.patch("/:id", updateComplaint);
router.delete("/:id", deleteComplaint);

module.exports = router;