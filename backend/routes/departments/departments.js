const {
    getDepartments,
    getDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  } = require("../../controllers/departments/deptController");
  
  const router = require("express").Router();
  
 
  router.get("/", getDepartments);
  router.get("/:id", getDepartment);
  router.post("/", createDepartment);
  router.patch("/:id",updateDepartment);
  router.delete("/:id",  deleteDepartment);
  
  module.exports = router;