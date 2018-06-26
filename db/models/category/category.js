const mongoose = require('mongoose');

const { CATEGORY_SCHEME_NAME } = require('../../constants/constants');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    createdBy: {
        type: String,
        required: true
    },
    modifiedDate: {
        type: Date,
        required: false,
        default: null
    },
    modifiedBy: {
        type: String,
        required: false,
        default: ''
    }
});

const Category = mongoose.model(CATEGORY_SCHEME_NAME, CategorySchema);

module.exports = Category;