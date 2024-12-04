const express = require("express");
const { registerHandler, loginHandler } = require("../handlers/authHandler");
const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);

module.exports = router;
