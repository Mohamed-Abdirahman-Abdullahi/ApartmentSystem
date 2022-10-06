const {
    getUnits,
    getUnit,
    createUnit, 
    updateUnit,
    deleteUnit,
  } = require("../../controllers/units/unitsController");
  
  const router = require("express").Router();
  
  router.get("/", getUnits);
  router.get("/:id", getUnit);
  router.post("/", createUnit);
  router.patch("/:id", updateUnit);
  router.delete("/:id", deleteUnit);
  
  module.exports = router;