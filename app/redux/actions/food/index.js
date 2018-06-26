import actionTypes from './actionType';
import foodManipulation from '../../../manipulations/food';

function fetchFoodsByCategory(data) {
    return {
        type: actionTypes.FETCH_FOOD_BY_CATEGORY,
        data: data.data,
        idCategory: data.idCategory,
        filterPriceFrom: data.filterPriceFrom,
        filterPriceTo: data.filterPriceTo,
        filterPriceSmallFrom: data.filterPriceSmallFrom,
        filterPriceLargeFrom: data.filterPriceLargeFrom
    }
}

function getFoodsByCategory(idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom) {
    return function(dispatch) {
        foodManipulation.getFoodsByCategory(idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom).then(result => {
            if(result !== null) {
                dispatch(fetchFoodsByCategory({
                    data: result,
                    idCategory: idCategory,
                    filterPriceFrom: filterPriceFrom,
                    filterPriceTo: filterPriceTo,
                    filterPriceSmallFrom: filterPriceSmallFrom,
                    filterPriceLargeFrom: filterPriceLargeFrom
                }));
            } else {
                dispatch(fetchFoodsByCategory({
                    data: [],
                    idCategory: '',
                    filterPriceFrom: filterPriceFrom,
                    filterPriceTo: filterPriceTo,
                    filterPriceSmallFrom: filterPriceSmallFrom,
                    filterPriceLargeFrom: filterPriceLargeFrom
                }));
            }
        });
    }
}

function fetchAllFoodByFilterPrices(data) {
    return {
        type: actionTypes.FETCH_ALL_FOOD,
        data: data.data,
        idCategory: data.idCategory,
        filterPriceFrom: data.filterPriceFrom,
        filterPriceTo: data.filterPriceTo,
        filterPriceSmallFrom: data.filterPriceSmallFrom,
        filterPriceLargeFrom: data.filterPriceLargeFrom
    }
}

function getAllFoodByFilterPrices(filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom) {
    return function(dispatch) {
        foodManipulation.getAllFoodByFilterPrices(filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom).then(result => {
            if(result !== null) {
                dispatch(fetchAllFoodByFilterPrices({
                    data: result,
                    idCategory: '',
                    filterPriceFrom: filterPriceFrom,
                    filterPriceTo: filterPriceTo,
                    filterPriceSmallFrom: filterPriceSmallFrom,
                    filterPriceLargeFrom: filterPriceLargeFrom
                }));
            } else {
                dispatch(fetchAllFoodByFilterPrices({
                    data: [],
                    idCategory: '',
                    filterPriceFrom: filterPriceFrom,
                    filterPriceTo: filterPriceTo,
                    filterPriceSmallFrom: filterPriceSmallFrom,
                    filterPriceLargeFrom: filterPriceLargeFrom
                }));
            }
        });
    }
}

function fetchAllFoodByFilters(data) {
    return {
        type: actionTypes.FETCH_ALL_FOOD_BY_FILTER,
        data: data.data,
        idCategory: data.idCategory,
        filterPriceFrom: data.filterPriceFrom,
        filterPriceTo: data.filterPriceTo,
        filterPriceSmallFrom: data.filterPriceSmallFrom,
        filterPriceLargeFrom: data.filterPriceLargeFrom,
        keyword: data.keyword
    }
}

function getAllFoodByFilters(idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom, keyword) {
    return function(dispatch) {
        foodManipulation.getAllFoodByFilters(idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom, keyword).then(result => {
            if(result !== null) {
                dispatch(fetchAllFoodByFilters({
                    data: result,
                    idCategory: '',
                    filterPriceFrom: filterPriceFrom,
                    filterPriceTo: filterPriceTo,
                    filterPriceSmallFrom: filterPriceSmallFrom,
                    filterPriceLargeFrom: filterPriceLargeFrom,
                    keyword: keyword
                }));
            } else {
                dispatch(fetchAllFoodByFilters({
                    data: [],
                    idCategory: '',
                    filterPriceFrom: filterPriceFrom,
                    filterPriceTo: filterPriceTo,
                    filterPriceSmallFrom: filterPriceSmallFrom,
                    filterPriceLargeFrom: filterPriceLargeFrom,
                    keyword: ''
                }));
            }
        });
    }
}

function resetFoods() {
    return {
        type: actionTypes.RESET_FOOD
    }
}

export default {
    getFoodsByCategory: getFoodsByCategory,
    getAllFoodByFilterPrices: getAllFoodByFilterPrices,
    resetFoods: resetFoods,
    getAllFoodByFilters: getAllFoodByFilters
}