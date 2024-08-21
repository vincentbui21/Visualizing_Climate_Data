const express = require("express");
const router = express.Router();
const {getAllDataForV8} = require("../controllers/V8controllers");

router.route("/all").get(getAllDataForV8);

module.exports = router;