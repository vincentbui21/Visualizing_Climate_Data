const express = require("express");
const router = express.Router();
const {getAllDataForV9} = require("../controllers/V9controllers");

router.route("/all").get(getAllDataForV9);

module.exports = router;