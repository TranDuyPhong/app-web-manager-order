const express = require('express');

const router = express.Router();

const accountRestful = require('./account');
const categoryRestful = require('./category');
const foodRestful = require('./food');
const billRestful = require('./bill');
const revenueRestful = require('./revenue');
const tableRestful = require('./table');

router.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
router.use('/account', accountRestful);
router.use('/category', categoryRestful);
router.use('/food', foodRestful);
router.use('/bill', billRestful);
router.use('/revenue', revenueRestful);
router.use('/table', tableRestful);

module.exports = router;


