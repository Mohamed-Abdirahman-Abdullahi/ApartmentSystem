const {
    getMaintenances,
    getMaintenance,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance,
} = require("../../controllers/maintenances/mantenanceController");

const router = require("express").Router();

router.get("/", getMaintenances);
router.get("/:id", getMaintenance);
router.post("/", createMaintenance);
router.patch("/:id", updateMaintenance);
router.delete("/:id", deleteMaintenance);

module.exports = router;