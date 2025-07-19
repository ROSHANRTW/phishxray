const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ msg: "All fields required" });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ msg: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });

  await user.save();
  res.status(201).json({ msg: "User created", user });
});


router.put('/user/:id', async (req, res) => {
  console.log("PUT /user/:id called", req.params.id, req.body); 
  try {
    const { username, country, gender } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { username, country, gender },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json({ success: true, user: updated });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;