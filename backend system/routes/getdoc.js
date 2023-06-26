var express = require('express');
var router = express.Router();
var Note = require('../models/Note');  // Import your Note model

// Route to get a specific note by its ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error getting note' });
  }
});

module.exports = router;
