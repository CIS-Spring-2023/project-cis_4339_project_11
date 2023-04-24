const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const org = process.env.org


const { users } = require("../models/models");

// Login API endpoint
router.post(
    "/verify-credentials",
    async (req, res, next) => {
      const {username, password} = req.body

      if(!(username && password)){
        return res.status(400).json({error: "username and password are required"})
      }
    try {
      let user = await users.findOne({ username });
      if (!user) {
        return res.status(400).json({ error: "invalid login" });
      }
      if (!await bcrypt.compare(password, user.password)) {
          return res.status(400).json({error: "invalid login"});
      }
      
      res.json(user);
    } catch (err) {
        console.log(err);
        return next(err);
    }
  }
)

//create user API endpoint
router.post('/register', async (req, res) => {
  const userData = {
      username: req.body.username,
      role: req.body.role,
      orgs: org
  }

  if(req.body.password != null || req.body.password != "") {
      userData.password = await bcrypt.hash(req.body.password, 10)
  }
  
  try{
    const user = users.create(userData);
    res.status(200).json({ message: 'user created successfully', user});
  } catch(err) {
    res.status(500).json({ error: err.message});
  }
  
});