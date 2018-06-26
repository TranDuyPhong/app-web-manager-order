const express = require('express');

const router = express.Router();

const { payment, getAllRevenues, getAllRevenueByFilterDates } = require('../../db/manipulations/revenue/revenue');

router.post('/payment', (req, res) => {
    const day = req.body.day;
    const money = req.body.money;
    const createdBy = req.body.createdBy;
    const idBill = req.body.idBill;
    payment(day, money, createdBy, idBill).then(result => {
        let response = {
            status: 0,
            res: null,
            message: ''
        }
        if(result.err) {
            response.status = 400;
            response.message = 'Lỗi server, xin vui lòng thử lại';
        } else {
            response.status = 200;
            response.res = result.res;
            response.message = 'Thanh toán hóa đơn thành công';
        }
        res.json(response);
    });
});

router.get('/get-all-revenue', (req, res) => {
    getAllRevenues().then(result => {
        let response = {
            status: 0,
            res: null,
            message: ''
        }
        if(result.err) {
            response.status = 400;
            response.message = 'Lỗi server, xin vui lòng thử lại';
        } else {
            response.status = 200;
            response.res = result.res;
            response.message = 'Lấy tất cả doanh thu thành công';
        }
        res.json(response);
    });
});

router.post('/get-all-revenue-by-filter-date', (req, res) => {
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    getAllRevenueByFilterDates(fromDate, toDate).then(result => {
        let response = {
            status: 0,
            res: null,
            message: ''
        }
        if(result.err) {
            response.status = 400;
            response.message = 'Lỗi server, xin vui lòng thử lại';
        } else {
            response.status = 200;
            response.res = result.res;
            response.message = 'Lấy tất cả doanh thu theo filter date thành công';
        }
        res.json(response);
    });
});

module.exports = router;