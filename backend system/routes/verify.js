const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Verify token
router.post('/', (req, res) => {
  const { token } = req.body;

  try {
    jwt.verify(token, '');
    res.json({ valid: true });
  } catch (err) {
    console.error(err.message);
    res.json({ valid: false });
  }
});

module.exports = router;
