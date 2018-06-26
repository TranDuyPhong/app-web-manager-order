const mongoose = require('mongoose');

const { REVENUE_SCHEMA_NAME } = require('../../constants/constants');

const Schema = mongoose.Schema;

const RevenueSchema = new Schema({
    total: {
        type: Number,
        required: true
    },
    revenueDate: {
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

const Revenue = mongoose.model(REVENUE_SCHEMA_NAME, RevenueSchema);

module.exports = Revenue;