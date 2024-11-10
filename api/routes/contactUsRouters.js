const express = require("express");
const contactUsControllers = require("../controllers/contactUsControllers");

const router = express.Router();

router.post("/FormFeedback", contactUsControllers.createFeedback);
router.post("/FormSubcripstion", contactUsControllers.createSubscription);
router.post("/FormUnsubscribe", contactUsControllers.unsubscribeNews);

module.exports = router;
