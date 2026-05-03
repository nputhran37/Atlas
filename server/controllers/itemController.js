const Item = require('../models/Item');

// Get all items
const getItems = async (req, res) => {
    try {
        const items = await Item.find().sort({ date: -1 }); // Sort by newest first
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create an item
const createItem = async (req, res) => {
    try {
        const { title, description, category, type, location, contactInfo } = req.body;
        
        // Use multer to get the file path if an image was uploaded
        const imagePath = req.file ? req.file.path : null;

        const newItem = new Item({
            title,
            description,
            category,
            type,
            location,
            contactInfo,
            image: imagePath
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getItems,
    createItem
};
