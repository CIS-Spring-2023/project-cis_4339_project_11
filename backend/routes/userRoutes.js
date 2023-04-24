const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");



const User = require("../models/user");


router.post(
    "/verify-credentials",
    async (req, res, next) => {
      const {username, password} = req.body
    try {
      const user = await user.find({ username });
      if (!user) {
        return res.status(400).json({ msg: "invalid username or password" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "invalid username or password "})
      }
      res.json({ username: user.username, role: user.role });
    } catch (error) {
        console.log(error)
    }
  }
)
