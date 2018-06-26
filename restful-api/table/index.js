const express = require('express');

const router = express.Router();

const manipulationTable = require('../../db/manipulations/table/table');

router.get('/get-all-table', (req, res) => {
    manipulationTable.getAllTables().then(result => {
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
            response.message = 'Lấy tất cả bàn thành công';
        }
        res.json(response);
    });
});

router.get('/get-info-table-by-table/:idTable', (req, res) => {
    const idTable = req.params.idTable;
    manipulationTable.getInfoTableByTable(idTable).then(result => {
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
            response.message = 'Lấy thông tin bàn thành công';
        }
        res.json(response);
    })
});

router.delete('/remove-order-table/:idUserOrder', (req, res) => {
    const idUserOrder = req.params.idUserOrder;
    manipulationTable.removeOrderTable(idUserOrder).then(result => {
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
            response.message = 'Hủy đặt bàn thành công';
        }
        res.json(response);
    })
});

router.post('/order-table', (req, res) => {
    const idTable = req.body.idTable;
    const orderName = req.body.orderName;
    const phoneOrder = req.body.phoneOrder;
    const cmndOrder = req.body.cmndOrder;
    const countPeopleComeIn = req.body.countPeopleComeIn;
    const timeComeIn = req.body.timeComeIn;
    const createdBy = req.body.createdBy;
    manipulationTable.orderTable(idTable, orderName, phoneOrder, cmndOrder, countPeopleComeIn, timeComeIn, createdBy).then(result => {
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
            response.message = 'Đặt bàn thành công';
        }
        res.json(response);
    });
});

module.exports = router;