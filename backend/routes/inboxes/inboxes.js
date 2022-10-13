const {
    getInboxes,
    getInbox,
    createInbox,
    updateInbox,
    deleteInbox,
} = require("../../controllers/inboxes/inboxController");

const router = require("express").Router();

router.get("/", getInboxes);
router.get("/:id", getInbox);
router.post("/", createInbox);
router.patch("/:id", updateInbox);
router.delete("/:id", deleteInbox);

module.exports = router;