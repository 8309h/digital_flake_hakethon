const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id : {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
});

const CategoryModel =  mongoose.model('Category', categorySchema);

module.exports =CategoryModel;
