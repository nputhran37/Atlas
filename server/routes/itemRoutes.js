const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getItems, createItem, getMyItems, updateItem, deleteItem } = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');

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
router.get('/', getItems);
router.post('/', protect, upload.single('image'), createItem);
router.get('/me', protect, getMyItems);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);

module.exports = router;
