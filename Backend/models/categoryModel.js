const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id : {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["1","0"],
        default: "1"
    }
});

const CategoryModel =  mongoose.model('Category', categorySchema);

module.exports =CategoryModel;
