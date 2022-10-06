const {
    getApartments,
    getApartment,
    createApartment, 
    updateApartment,
    deleteApartment,
  } = require("../../controllers/apartments/apartController");
  
  const router = require("express").Router();
  
  router.get("/", getApartments);
  router.get("/:id", getApartment);
  router.post("/", createApartment);
  router.patch("/:id", updateApartment);
  router.delete("/:id", deleteApartment);
  
  module.exports = router;