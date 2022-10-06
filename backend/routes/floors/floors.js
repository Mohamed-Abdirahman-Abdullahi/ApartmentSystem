const {
    getFloors,
    getFloor,
    createFloor, 
    updateFloor,
    deleteFloor,
  } = require("../../controllers/floors/floorController");
  
  const router = require("express").Router();
  
  router.get("/", getFloors);
  router.get("/:id", getFloor);
  router.post("/", createFloor);
  router.patch("/:id", updateFloor);
  router.delete("/:id", deleteFloor);
  
  module.exports = router;