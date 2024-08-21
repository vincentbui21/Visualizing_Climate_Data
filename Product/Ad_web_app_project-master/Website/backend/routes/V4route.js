const express = require("express");
const router = express.Router();
const {getAllDataOfV4} = require("../controllers/V4controllers");

router.route("/all").get(getAllDataOfV4);



module.exports = router;