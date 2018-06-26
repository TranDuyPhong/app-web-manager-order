const express = require('express');

const router = express.Router();

const { getAllTablesMobile } = require('../../db/manipulations-mobile/table/table');

router.get('/get-all-table', (req, res) => {
    getAllTablesMobile().then(result => {
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