const mongoose = require('mongoose');

const newsItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: { type: Date, default: Date.now }, // Fecha de creación con valor predeterminado Date.now
    content: String,
    author: String,
    archiveDate: { type: Date, default: null }, // Archivar fecha como valor predeterminado null
    removed: { type: Boolean, default: false } // Eliminado como falso por defecto
});

module.exports = mongoose.model('NewsItem', newsItemSchema);
