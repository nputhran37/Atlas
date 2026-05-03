const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getItems, createItem } = require('../controllers/itemController');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // The folder where images will be stored
    },
    filename: function (req, file, cb) {
        // Create a unique filename: timestamp + original extension
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Routes
// We add upload.single('image') middleware to handle the file upload
router.post('/', upload.single('image'), createItem);
router.get('/', getItems);

module.exports = router;
