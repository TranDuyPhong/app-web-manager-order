const mongoose = require('mongoose');

const { FOOD_SCHEMA_NAME } = require('../../constants/constants');

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    priceSale: {
        type: Number,
        required: false,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    idCategory: {
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

const Food = mongoose.model(FOOD_SCHEMA_NAME, FoodSchema);

module.exports = Food;