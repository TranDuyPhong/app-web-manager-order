const mongoose = require('mongoose');

const { ACCOUNT_SCHEMA_NAME } = require('../../constants/constants');

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
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

const Account = mongoose.model(ACCOUNT_SCHEMA_NAME, AccountSchema);

module.exports = Account;