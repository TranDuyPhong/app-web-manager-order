const express = require('express');

const router = express.Router();

const { getTimeOrderAndTimeComeInByIdTable } = require('../../db/manipulations-mobile/user-order/user-order');

router.get('/get-time-order-and-time-come-in-by-id-table/:idTable', (req, res) => {
    const idTable = req.params.idTable;
    getTimeOrderAndTimeComeInByIdTable(idTable).then(result => {
        let response = {
            status: 400,
            res: [],
            message: 'Không lấy được dữ liệu'
        };
        if(result.res) {
            response.status = 200;
            response.res = result.res;
            response.message = 'Lấy dữ liệu thành công';
        }
        res.json(response);
    });
});

module.exports = router;