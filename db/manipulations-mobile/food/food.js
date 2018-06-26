const foodSchema = require('../../models/food/food');

function getAllFoodByIdCategory(idCategory) {
    return new Promise((resolve, reject) => {
        if(idCategory !== null && idCategory !== undefined && idCategory !== '' && idCategory !== 'all') {
            foodSchema.find({'idCategory': idCategory}).select({'_id': 1, 'price': 1, 'priceSale': 1, 'name': 1, 'image': 1}).then(res => {
                resolve({res: res});
            }).catch(err => resolve({err: err}));
        } else {
            foodSchema.find().select({'_id': 1, 'price': 1, 'priceSale': 1, 'name': 1, 'image': 1}).then(res => {
                resolve({res: res});
            }).catch(err => resolve({err: err}));
        }
    });
}

function getAllFoodByFilters(idCategory, filterPriceFrom, filterPriceTo, filrerPriceSmallFrom, filrerPriceLargeFrom) {
    return new Promise((resolve, reject) => {
        getAllFoodByIdCategory(idCategory).then(resFoodByIdCategorys => {
            if(resFoodByIdCategorys.err) {
                resolve({err: resFoodByIdCategorys.err});
            } else {
                if(
                    filterPriceFrom != undefined && 
                    filterPriceTo != undefined && 
                    filrerPriceSmallFrom == undefined && 
                    filrerPriceLargeFrom == undefined) {
                        filterPriceFrom = parseInt(filterPriceFrom);
                        filterPriceTo = parseInt(filterPriceTo);
                        resFoodByIdCategorys.res = resFoodByIdCategorys.res.filter(p => p.price >= filterPriceFrom && p.price <= filterPriceTo);
                    } else if (
                        filterPriceFrom == undefined &&
                        filterPriceTo == undefined &&
                        filrerPriceSmallFrom != undefined && 
                        filrerPriceLargeFrom == undefined) {
                            filrerPriceSmallFrom = parseInt(filrerPriceSmallFrom);
                            resFoodByIdCategorys.res = resFoodByIdCategorys.res.filter(p => p.price <= filrerPriceSmallFrom);
                    } else if (
                        filterPriceFrom == undefined &&
                        filterPriceTo == undefined &&
                        filrerPriceSmallFrom == undefined &&
                        filrerPriceLargeFrom != undefined) {
                            filrerPriceLargeFrom = parseInt(filrerPriceLargeFrom);
                            resFoodByIdCategorys.res = resFoodByIdCategorys.res.filter(p => p.price >= filrerPriceLargeFrom);
                        } 
                for(let i = 0; i < resFoodByIdCategorys.res.length; i++) {
                    resFoodByIdCategorys.res[i].image = `http://192.168.1.211:3000/images/foods/${resFoodByIdCategorys.res[i].image}`;
                }
                resolve({res: resFoodByIdCategorys.res});
            }
        }); 
    });
}

module.exports = {
    getAllFoodByFilters: getAllFoodByFilters
}