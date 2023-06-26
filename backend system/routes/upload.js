const express = require('express');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
const mongoose = require('mongoose');
const Note = require('../models/Note');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const blobSasUrl = '';
const containerName = 'nurunotes';

const uri = '';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.post('/', upload.fields([{name: 'file', maxCount: 1}, {name: 'image', maxCount: 1}]), async (req, res) => {
  try {
    // Connect to the blob service
    const blobServiceClient = new BlobServiceClient(blobSasUrl);

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Get the note file and its name
    const file = req.files.file[0];
    const blobName = file.originalname;

    // Get block blob client for note
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the note blob
    const uploadBlobResponse = await blockBlobClient.upload(file.buffer, file.size);

    // Get the image file and its name
    const image = req.files.image[0];
    const imageBlobName = image.originalname;

    // Get block blob client for image
    const imageBlockBlobClient = containerClient.getBlockBlobClient(imageBlobName);

    // Upload the image blob
    const uploadImageBlobResponse = await imageBlockBlobClient.upload(image.buffer, image.size);

    const note = new Note({
      title: req.body.title,
      uploader: req.body.uploader,
      topic: req.body.topic,
      description: req.body.description,
      fileURL: blockBlobClient.url,
      imageURL: imageBlockBlobClient.url,
      uploader: req.body.uploader
    });

    // Save note to database
    await note.save();

    res.json({ message: 'File and image uploaded and note created successfully', blobName, uploadBlobResponse, note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error uploading file and image and saving note' });
  }
});



module.exports = router;
