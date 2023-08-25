const express = require("express");
const router = express.Router();
const User = require("../models/User");

// expecting email and password in request body
router.post("/signup", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      success: false,
      error: "invalid params",
    });
  }

  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ success: true, data: { user: newUser } });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
    });
  }
});

// expecting email and password in request body
router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      success: false,
      error: "invalid params",
    });
  }

  const user = await User.findOne(req.body);
  if (!user) {
    res.status(404).send({
      success: false,
    });
    return;
  } else {
    res.status(200).send({
      success: true,
      user,
    });
  }
});

module.exports = router;
