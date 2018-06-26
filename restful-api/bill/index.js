const express = require('express');

const router = express.Router();

const { 
    removeBill, 
    createBill, 
    addFoodForBill, 
    incrementCountFood, 
    decrementCountFood, 
    removeFood, 
    removeAllFood,
    getAllBills,
    getAllBillByFilters 
} 
= require('../../db/manipulations/bill/bill');

router.delete('/remove-bill/:idBill', (req, res) => {
    const idBill = req.params.idBill;
    removeBill(idBill).then(result => {
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
            response.message = 'Hủy hóa đơn thành công';
        }
        res.json(response);
    })
});

router.post('/create-bill', (req, res) => {
    const idTable = req.body.idTable;
    const foodOrders = req.body.foodOrders;
    const createdBy = req.body.createdBy;
    const countPeople = req.body.countPeople;
    createBill(idTable, foodOrders, createdBy, countPeople).then(result => {
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
            response.message = 'Tạo hóa đơn thành công';
        }
        res.json(response);
    });
});

router.post('/add-food-for-bill', (req, res) => {
    const idBill = req.body.idBill;
    const foodOrders = req.body.foodOrders;
    const modifiedBy = req.body.modifiedBy;
    addFoodForBill(idBill, foodOrders, modifiedBy).then(result => {
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
            response.message = 'Thêm món cho hóa đơn thành công';
        }
        res.json(response);
    });
});

router.post('/increment-count-food', (req, res) => {
    const idBill = req.body.idBill;
    const idFood = req.body.idFood;
    const modifiedBy = req.body.modifiedBy;
    incrementCountFood(idBill, idFood, modifiedBy).then(result => {
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
            response.message = 'Tăng số lượng món thêm 1 thành công';
        }
        res.json(response);
    });
});

router.post('/decrement-count-food', (req, res) => {
    const idBill = req.body.idBill;
    const idFood = req.body.idFood;
    const modifiedBy = req.body.modifiedBy;
    decrementCountFood(idBill, idFood, modifiedBy).then(result => {
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
            response.message = 'Giảm số lượng món trừ 1 thành công';
        }
        res.json(response);
    });
});

router.post('/remove-food', (req, res) => {
    const idBill = req.body.idBill;
    const idFood = req.body.idFood;
    const modifiedBy = req.body.modifiedBy;
    removeFood(idBill, idFood, modifiedBy).then(result => {
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
            response.message = 'Xóa món trong hóa đơn thành công';
        }
        res.json(response);
    });
});

router.post('/remove-all-food', (req, res) => {
    const idBill = req.body.idBill;
    const modifiedBy = req.body.modifiedBy;
    removeAllFood(idBill, modifiedBy).then(result => {
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
            response.message = 'Xóa tất cả món trong hóa đơn thành công';
        }
        res.json(response);
    });
});

router.get('/get-all-bill', (req, res) => {
    const state = req.query.state;
    getAllBills(state).then(result => {
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
            response.message = 'Lấy tất cả hóa đơn thành công';
        }
        res.json(response);
    });
});

router.post('/get-all-bill-by-filter', (req, res) => {
    const state = req.body.state;
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    getAllBillByFilters(fromDate, toDate, state).then(result => {
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
            response.message = 'Lấy tất cả hóa đơn theo filter thành công';
        }
        res.json(response);
    });
});

module.exports = router;