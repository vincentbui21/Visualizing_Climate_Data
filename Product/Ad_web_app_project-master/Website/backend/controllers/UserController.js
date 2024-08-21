const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/User")


module.exports= {
    
    updateUser: asyncHandler(async (req, res) => {
        if (req.body.userId === req.params.id) {
          if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
          }
          try {
            const updatedUser = await User.findByIdAndUpdate(
              req.params.id,
              {
                $set: req.body,
              },
              { new: true }
            );
            res.status(200).json(updatedUser);
          } catch (err) {
            res.status(500).json(err);
          }
        } else {
          res.status(401).json("You can update only your account!");
        }
      }),
      
    deleteUser: asyncHandler(async (req, res, next) => {

      let userId = req.user._id;

      if (!userId) {
        res.status(401)
        throw new Error("Not authenticated!");
      }
     
      let user = await User.findById(userId);

      await user.remove();
      
      res.status(200).json({message: "User has been deleted..."});
     
    }),

    getUser: asyncHandler(async (req, res) => {
        try {
          const user = await User.findById(req.params.id);
          const { password, ...others } = user._doc;
          res.status(200).json(others);
        } catch (err) {
          res.status(500).json(err);
        }
      })
}
    