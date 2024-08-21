const express = require("express");
const router = express.Router();
const {getAllDataOfV3} = require("../controllers/V3controllers");

router.get("/all", getAllDataOfV3);


module.exports = router;