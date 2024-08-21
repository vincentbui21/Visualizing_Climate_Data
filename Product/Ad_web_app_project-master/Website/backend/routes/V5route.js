const express = require("express");
const router = express.Router();
const {getAllDataForV5} = require("../controllers/V5controllers");

router.route("/all").get(getAllDataForV5);



module.exports = router;