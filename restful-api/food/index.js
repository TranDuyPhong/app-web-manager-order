const express = require('express');

const router = express.Router();

const { getFoodsByCategory, getAllFoodByFilterPrices, getAllFoodFilters } = require('../../db/manipulations/food/food');

router.get('/get-food-by-category/:idCategory', (req, res) => {
    const idCategory = req.params.idCategory;
    let filterPriceFrom = req.query.filterPriceFrom;
    let filterPriceTo = req.query.filterPriceTo;
    let filterPriceSmallFrom = req.query.filterPriceSmallFrom;
    let filterPriceLargeFrom = req.query.filterPriceLargeFrom;
    getFoodsByCategory(idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom).then(result => {
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
            response.message = 'Lấy thức ăn theo danh mục thành công';
        }
        res.json(response);
    })
});

router.get('/get-all-food-by-filter-price', (req, res) => {
    let filterPriceFrom = req.query.filterPriceFrom;
    let filterPriceTo = req.query.filterPriceTo;
    let filterPriceSmallFrom = req.query.filterPriceSmallFrom;
    let filterPriceLargeFrom = req.query.filterPriceLargeFrom;
    getAllFoodByFilterPrices(filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom).then(result => {
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
            response.message = 'Lấy tất cả thức ăn thành công';
        }
        res.json(response);
    });
});

router.get('/get-all-food-by-filter', (req, res) => {
    const keyword = req.query.search;
    const idCategory = req.query.idCategory;
    let filterPriceFrom = req.query.filterPriceFrom;
    let filterPriceTo = req.query.filterPriceTo;
    let filterPriceSmallFrom = req.query.filterPriceSmallFrom;
    let filterPriceLargeFrom = req.query.filterPriceLargeFrom;
    getAllFoodFilters(idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom, keyword).then(result => {
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
            response.message = 'Lấy tất cả thức ăn theo filter thành công';
        }
        res.json(response);
    });
});

module.exports = router;