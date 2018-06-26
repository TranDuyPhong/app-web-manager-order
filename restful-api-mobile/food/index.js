const express = require('express');

const router = express.Router();

const { getAllFoodByFilters } = require('../../db/manipulations-mobile/food/food');

router.get('/get-all-food-by-filter', (req, res) => {
    const idCategory = req.query.idCategory;
    const filterPriceFrom = req.query.filterPriceFrom;
    const filterPriceTo = req.query.filterPriceTo;
    const filterPriceSmallFrom = req.query.filterPriceSmallFrom;
    const filterPriceLargeFrom = req.query.filterPriceLargeFrom;
    getAllFoodByFilters(idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom).then(result => {
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