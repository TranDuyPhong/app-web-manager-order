import constantsFood from '../../constant/food';

function getFoodsByCategory(idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom) {
    let url = `${constantsFood.GET_FOOD_BY_CATEGORY}/${idCategory}`;
    if(filterPriceFrom !== undefined && filterPriceTo !== undefined && filterPriceSmallFrom === undefined && filterPriceLargeFrom === undefined) {
        url += `?filterPriceFrom=${filterPriceFrom}&filterPriceTo=${filterPriceTo}`;
    } else if (filterPriceFrom === undefined && filterPriceTo === undefined && filterPriceLargeFrom === undefined && filterPriceSmallFrom !== undefined) {
        url += `?filterPriceSmallFrom=${filterPriceSmallFrom}`;
    } else if (filterPriceFrom === undefined && filterPriceTo === undefined && filterPriceSmallFrom === undefined && filterPriceLargeFrom !== undefined) {
        url += `?filterPriceLargeFrom=${filterPriceLargeFrom}`;
    }
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: result => {
                if(result.status === 200 && result.res && result.res !== null) {
                    resolve(result.res);
                } else {
                    resolve(null);
                }
            }
        });
    });
}

function getAllFoodByFilterPrices(filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom) {
    let url = constantsFood.GET_ALL_FOOD_BY_FILTER_PRICE;
    if(filterPriceFrom !== undefined && filterPriceTo !== undefined && filterPriceSmallFrom === undefined && filterPriceLargeFrom === undefined) {
        url += `?filterPriceFrom=${filterPriceFrom}&filterPriceTo=${filterPriceTo}`;
    } else if (filterPriceFrom === undefined && filterPriceTo === undefined && filterPriceLargeFrom === undefined && filterPriceSmallFrom !== undefined) {
        url += `?filterPriceSmallFrom=${filterPriceSmallFrom}`;
    } else if (filterPriceFrom === undefined && filterPriceTo === undefined && filterPriceSmallFrom === undefined && filterPriceLargeFrom !== undefined) {
        url += `?filterPriceLargeFrom=${filterPriceLargeFrom}`;
    }
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: result => {
                if(result.status === 200 && result.res && result.res !== null) {
                    resolve(result.res);
                } else {
                    resolve(null);
                }
            }
        });
    });
}

function getAllFoodByFilters(idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom, keyword) {
    let url = constantsFood.GET_ALL_FOOD_BY_FILTER;
    let countParameter = 0;
    if(filterPriceFrom !== undefined && filterPriceTo !== undefined && filterPriceSmallFrom === undefined && filterPriceLargeFrom === undefined) {
        url += `?filterPriceFrom=${filterPriceFrom}&filterPriceTo=${filterPriceTo}`;
        countParameter = 1;
    } else if (filterPriceFrom === undefined && filterPriceTo === undefined && filterPriceLargeFrom === undefined && filterPriceSmallFrom !== undefined) {
        url += `?filterPriceSmallFrom=${filterPriceSmallFrom}`;
        countParameter = 1
    } else if (filterPriceFrom === undefined && filterPriceTo === undefined && filterPriceSmallFrom === undefined && filterPriceLargeFrom !== undefined) {
        url += `?filterPriceLargeFrom=${filterPriceLargeFrom}`;
        countParameter = 1;
    } 
    if (idCategory !== 'all' && idCategory !== '') {
        if(countParameter === 1) {
            url += `&idCategory=${idCategory}`;
        } else {
            url += `?idCategory=${idCategory}`;
        }
    }
    if (keyword !== '') {
        if(countParameter === 1) {
            url += `&search=${keyword}`;
        } else {
            url += `?search=${keyword}`;
        }
    }
    countParameter = 0;
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: result => {
                if(result.status === 200 && result.res && result.res !== null) {
                    resolve(result.res);
                } else {
                    resolve(null);
                }
            }
        });
    }); 
}

export default {
    getFoodsByCategory: getFoodsByCategory,
    getAllFoodByFilterPrices: getAllFoodByFilterPrices,
    getAllFoodByFilters: getAllFoodByFilters
}