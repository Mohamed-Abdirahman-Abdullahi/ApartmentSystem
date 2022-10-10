const {
    getGuarantors,
    getGuarantor,
    createGuarantor,
    updateGuarantor,
    deleteGuarantor,
  } = require("../../controllers/guarantors/guarantController");
  
  const router = require("express").Router();
  
  router.get("/", getGuarantors)
  router.get("/:id", getGuarantor);
  router.post("/", createGuarantor);
  router.patch("/:id", updateGuarantor);
  router.delete("/:id", deleteGuarantor);
  
  module.exports = router;