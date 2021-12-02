const express = require("express");
const router = express.Router();

const audioController = require("../controller/audioController");

router.post("/playAudio", audioController.playAudio);
router.get("/getAudio/:trackID", audioController.getAudio);

module.exports =  router ;
