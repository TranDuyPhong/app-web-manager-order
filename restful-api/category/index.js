const express = require('express');

const router = express.Router();

const { getAllCategories } = require('../../db/manipulations/category/category');

router.get('/get-all-categories', (req, res) => {
    getAllCategories().then(result => {
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
            response.message = 'Lấy danh mục thành công';
        }
        res.json(response);
    });
});

module.exports = router;