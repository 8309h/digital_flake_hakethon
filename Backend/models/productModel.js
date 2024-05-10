const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true
  },
  packageSize: {
    type: String,
    required: true
  },
  mrp: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['1', '0'],
    default: '1'
  }
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
