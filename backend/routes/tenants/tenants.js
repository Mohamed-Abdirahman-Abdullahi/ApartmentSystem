const {
    getTenants,
    getTenant,
    createTenant,
    updateTenant,
    deleteTenant,
  } = require("../../controllers/tenants/tenantController");
  
  const router = require("express").Router();
  
  router.get("/", getTenants);
  router.get("/:id", getTenant);
  router.post("/", createTenant);
  router.patch("/:id", updateTenant);
  router.delete("/:id", deleteTenant);
  
  module.exports = router;