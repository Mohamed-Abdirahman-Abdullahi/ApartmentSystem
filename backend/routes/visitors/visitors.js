const {
  getVisitors,
  getVisitor,
  createVisitor,
  updateVisitor,
  deleteVisitor,
} = require("../../controllers/visitors/visitorsController");

const router = require("express").Router();

router.get("/", getVisitors);
router.get("/:id", getVisitor);
router.post("/", createVisitor);
router.patch("/:id", updateVisitor);
router.delete("/:id", deleteVisitor);

module.exports = router;