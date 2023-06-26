const express = require('express');
const router = express.Router();
const Note = require('../models/Note');  // Assuming you have a Note model in models directory

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
