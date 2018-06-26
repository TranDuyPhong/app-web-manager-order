const mongoose = require('mongoose');

const { BILL_SCHEMA_NAME } = require('../../constants/constants');

const Schema = mongoose.Schema;

const BillSchema = new Schema({
    idTable: {
        type: String,
        required: true
    },
    timeCheckIn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    timeCheckOut: {
        type: Date,
        required: false,
        default: null
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    billInfos: Array,
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

const Bill = mongoose.model(BILL_SCHEMA_NAME, BillSchema);

module.exports = Bill;