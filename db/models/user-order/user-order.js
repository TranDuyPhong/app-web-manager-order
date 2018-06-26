const mongoose = require('mongoose');

const { USERORDER_SCHEMA_NAME } = require('../../constants/constants');

const Schema = mongoose.Schema;

const UserOrderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    cmnd: {
        type: String,
        required: true
    },
    countPeople: {
        type: Number,
        required: false,
        default: 0
    },
    timeOrder: {
        type: Date,
        required: true,
        default: Date.now()
    },
    timeComeIn: {
        type: Date,
        required: true
    },
    idTable: {
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
    }
});

const UserOrder = mongoose.model(USERORDER_SCHEMA_NAME, UserOrderSchema);

module.exports = UserOrder;