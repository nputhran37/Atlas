const Item = require('../models/Item');

// Get all active items
const getItems = async (req, res) => {
    try {
        const items = await Item.find({ status: 'active' }).sort({ date: -1 }); // Only active items, newest first
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create an item
const createItem = async (req, res) => {
    try {
        const { title, description, category, type, location, contactInfo, questions, handoverPreference, handoverDetails, dateLost, timeLost } = req.body;
        
        const imagePath = req.file ? req.file.path : null;

        const newItem = new Item({
            title,
            description,
            category,
            type,
            location,
            contactInfo,
            questions: questions ? JSON.parse(questions) : [],
            handoverPreference,
            handoverDetails,
            dateLost,
            timeLost,
            image: imagePath,
            reportedBy: req.user.id // From auth middleware
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get items reported by current user
const getMyItems = async (req, res) => {
    try {
        const items = await Item.find({ reportedBy: req.user.id }).sort({ date: -1 });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an item
const updateItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        
        if (!item) return res.status(404).json({ message: 'Item not found' });
        
        // Ensure user owns the item
        if (item.reportedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an item
const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        
        if (!item) return res.status(404).json({ message: 'Item not found' });
        
        // Ensure user owns the item
        if (item.reportedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await item.deleteOne();
        res.status(200).json({ message: 'Item removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getItems,
    createItem,
    getMyItems,
    updateItem,
    deleteItem
};
