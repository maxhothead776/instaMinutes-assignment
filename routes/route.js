const express = require("express");
const router = express.Router();

const timeController = require("../controller/timeController");

router.post("/scheduler", timeController.triggerFunction)

module.exports = router;

