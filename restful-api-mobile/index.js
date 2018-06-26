const express = require('express');

const router = express.Router();

const tableRestfulMobile = require('./table');
const userOrderRestfulMobile = require('./user-order');
const foodRestfulMobile = require('./food');
const categoryRestfulMobile = require('./category');

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

router.use('/table', tableRestfulMobile);
router.use('/user-order', userOrderRestfulMobile);
router.use('/food', foodRestfulMobile);
router.use('/category', categoryRestfulMobile);

module.exports = router;


