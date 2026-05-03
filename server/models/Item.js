const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, // e.g., Electronics, Stationery, ID Cards
    type: { type: String, enum: ['lost', 'found'], required: true },
    location: { type: String, required: true }, // Where it was lost or found
    image: { type: String }, // URL or path to the image
    status: { type: String, enum: ['active', 'resolved'], default: 'active' }, // Is it still lost/found or returned?
    contactInfo: { type: String, required: true }, // Phone number or email
    dateLost: { type: String }, // User input date
    timeLost: { type: String }, // User input time
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);
