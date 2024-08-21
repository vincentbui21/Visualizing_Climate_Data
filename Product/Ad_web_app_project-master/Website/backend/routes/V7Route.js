const express = require("express");
const router = express.Router();
const {getAllDataForV7} = require("../controllers/V7controllers");

router.route("/all").get(getAllDataForV7);

module.exports = router;