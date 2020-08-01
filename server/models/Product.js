const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    quantity: { type: Number, default: 1 },
    price: Number,
    category: String,
    link: String,
    thumbnail: { data: Buffer, contentType: String },
    photos: Array,
    inStock: { type: Number, default: 24 }
});

const Product = mongoose.model('Product', productSchema);

module.exports.Product = Product;