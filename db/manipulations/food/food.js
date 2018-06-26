const foodSchema = require('../../models/food/food');

function getFoodsByCategory(idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom) {
    return new Promise((resolve, reject) => {
        if(filterPriceFrom === undefined && filterPriceTo === undefined && filterPriceSmallFrom === undefined && filterPriceLargeFrom === undefined) {
            foodSchema.find({'idCategory': idCategory}).then(res => {
                resolve({res: res});
            }).catch(err => resolve({err: err}));
        } else if (filterPriceFrom !== undefined && filterPriceTo !== undefined && filterPriceSmallFrom === undefined && filterPriceLargeFrom === undefined) {
            foodSchema.find({'idCategory': idCategory, "price": {
                "$gte": filterPriceFrom,
                "$lte": filterPriceTo
            }}).then(res => {
                resolve({res: res});
            }).catch(err => resolve({err: err}));
        } else if (filterPriceFrom === undefined && filterPriceTo === undefined && filterPriceLargeFrom === undefined && filterPriceSmallFrom !== undefined) {
            foodSchema.find({'idCategory': idCategory, 'price': {'$lte': filterPriceSmallFrom}}
            ).then(res => {
                resolve({res: res});
            }).catch(err => resolve({err: err}));
        } else if (filterPriceFrom === undefined && filterPriceTo === undefined && filterPriceSmallFrom === undefined && filterPriceLargeFrom !== undefined) {
            foodSchema.find({'idCategory': idCategory, 'price': {'$gte': filterPriceLargeFrom}}
            ).then(res => {
                resolve({res: res});
            }).catch(err => resolve({err: err}));
        } else {
            resolve({res: []});
        }
    });
}

function getAllFoodByFilterPrices(filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom) {
    return new Promise((resolve, reject) => {
        if(filterPriceFrom === undefined && filterPriceTo === undefined && filterPriceSmallFrom === undefined && filterPriceLargeFrom === undefined) {
            foodSchema.find().then(res => {
                resolve({res: res});
            }).catch(err => resolve({err: err}));
        } else if (filterPriceFrom !== undefined && filterPriceTo !== undefined && filterPriceSmallFrom === undefined && filterPriceLargeFrom === undefined) {
            foodSchema.find({"price": {
                "$gte": filterPriceFrom,
                "$lte": filterPriceTo
            }}
            ).then(res => {
                resolve({res: res});
            }).catch(err => resolve({err: err}));
        } else if (filterPriceFrom === undefined && filterPriceTo === undefined && filterPriceLargeFrom === undefined && filterPriceSmallFrom !== undefined) {
            foodSchema.find({'price': {'$lte': filterPriceSmallFrom}}
            ).then(res => {
                resolve({res: res});
            }).catch(err => resolve({err: err}));
        } else if (filterPriceFrom === undefined && filterPriceTo === undefined && filterPriceSmallFrom === undefined && filterPriceLargeFrom !== undefined) {
            foodSchema.find({'price': {'$gte': filterPriceLargeFrom}}
            ).then(res => {
                resolve({res: res});
            }).catch(err => resolve({err: err}));
        } else {
            resolve({res: []});
        }
    }); 
}

function getAllFoodFilters(idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom, keyword) {
    return new Promise((resolve, reject) => {
        getAllFoodByFilterPrices(filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom).then(resFilterPrice => {
            if(resFilterPrice.err) {
                resolve({err: resFilterPrice.err});
            } else {
                var foods = [];
                foods = resFilterPrice.res;
                if(idCategory !== 'all' && idCategory !== '' && idCategory != undefined) {
                    foods = foods.filter(p => p.idCategory == idCategory);
                    if(keyword !== '' && keyword != undefined) {
                        keyword = keyword.trim().toLowerCase();
                        foods = foods.filter(p => p.name.trim().toLowerCase().includes(keyword) ||
                        p.name.trim().toLowerCase() == keyword || p.name.trim().toLowerCase().startsWith(keyword) ||
                        p.name.trim().toLowerCase().endsWith(keyword));
                        resolve({res: foods});
                    } else {
                        resolve({res: foods});
                    }
                } else {
                    if(keyword !== '' && keyword != undefined) {
                        keyword = keyword.trim().toLowerCase();
                        foods = foods.filter(p => p.name.trim().toLowerCase().includes(keyword) ||
                        p.name.trim().toLowerCase() == keyword || p.name.trim().toLowerCase().startsWith(keyword) ||
                        p.name.trim().toLowerCase().endsWith(keyword));
                        resolve({res: foods});
                    } else {
                        resolve({res: foods});
                    }
                }
            }
        });
    });
}

function getAllFoods() {
    return new Promise((resolve, reject) => {
        foodSchema.find().then(resFoods => {
            resolve({res: resFoods});
        }).catch(err => resolve({err: err}));
    });
}

module.exports = {
    getFoodsByCategory: getFoodsByCategory,
    getAllFoodByFilterPrices: getAllFoodByFilterPrices,
    getAllFoods: getAllFoods,
    getAllFoodFilters: getAllFoodFilters
}