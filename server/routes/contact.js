const { addContactForm } = require("../controllers/contactController");
const router = require("express").Router();

router.post("/contact-form", addContactForm);
module.exports = router;