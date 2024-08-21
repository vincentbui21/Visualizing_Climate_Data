const express = require("express");
const router = express.Router();
const {getAllDataForV6} = require("../controllers/V6controllers");

router.route("/all").get(getAllDataForV6);

module.exports = router;