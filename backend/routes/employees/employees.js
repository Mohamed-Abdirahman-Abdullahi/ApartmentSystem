const {
    getEmpolyees,
    getEmployee,
    creatEmpolyee, 
    updateEmployee,
    deleteEmployee,
  } = require("../../controllers/employees/empController");
  
  const router = require("express").Router();
  
  router.get("/", getEmpolyees);
  router.get("/:id", getEmployee);
  router.post("/", creatEmpolyee);
  router.patch("/:id", updateEmployee);
  router.delete("/:id", deleteEmployee);
  
  module.exports = router;