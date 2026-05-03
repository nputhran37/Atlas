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
    questions: { type: [String], validate: [val => val.length >= 0 && val.length <= 5, 'Questions array must be between 0 and 5'] }, // For 'found' items
    handoverPreference: { type: String, enum: ['meetup', 'drop_point'] }, // For 'found' items
    handoverDetails: { type: String }, // Location string
    dateLost: { type: String }, // User input date
    timeLost: { type: String }, // User input time
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);
