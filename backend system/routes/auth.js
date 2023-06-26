const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const uri = 'mongodb+srv://Nuru:nkugwamark@cluster0.wta1djn.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Database Connected Successfully'))
.catch(err => console.log('Database Connection Failed', err));



router.post('/', async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      'b9a2b1d574ca7b43345213789e7607d3d30563e059cece1cd3bee27c9c1597e7',
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ success: true, message: 'User registered successfully', token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
