const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Verify token
router.post('/', (req, res) => {
  const { token } = req.body;

  try {
    jwt.verify(token, 'b9a2b1d574ca7b43345213789e7607d3d30563e059cece1cd3bee27c9c1597e7');
    res.json({ valid: true });
  } catch (err) {
    console.error(err.message);
    res.json({ valid: false });
  }
});

module.exports = router;
