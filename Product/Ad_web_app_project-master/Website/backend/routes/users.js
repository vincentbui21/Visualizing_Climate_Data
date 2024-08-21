const express = require("express");
const router = express.Router();
const {verifyToken,verifyTokenAndUser} = require("../middleware/verifyToken")
const {updateUser,deleteUser,getUser} = require("../controllers/UserController");
const {protect} = require("../middleware/verifyToken");
//UPDATE
router.put("/:id", updateUser);

//DELETE
router.route("/deleteUser").delete(protect, deleteUser);

//GET USER
router.get("/:id", getUser);

module.exports = router;