
const express = require("express");
const router = express.Router();
const {getAllDataForV2} = require("../controllers/V2controllers");


router.route("/all").get(getAllDataForV2);

module.exports = router;