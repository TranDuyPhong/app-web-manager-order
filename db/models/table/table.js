const mongoose = require('mongoose');

const { TABLE_SCHEMA_NAME } = require('../../constants/constants');

const Schema = mongoose.Schema;

const TableSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    countTable: {
        type: Number,
        required: true
    },
    countPeople: {
        type: Number,
        required: false,
        default: 0
    },
    status: {
        type: Number,
        required: true,
        default: 0
    }
});

const Table = mongoose.model(TABLE_SCHEMA_NAME, TableSchema);

module.exports = Table;