const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
  },

  quantify: {
    type: Number,
    required: true,
    default: 0,
  },

  price: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;