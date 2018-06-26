import actionTypes from './actionType';
import categoryManipulation from '../../../manipulations/category';

function fetchAllCatgories(data) {
    return {
        type: actionTypes.FETCH_ALL_CATEGORIES,
        data: data
    }
}

function getAllCategories () {
    return function(dispatch) {
        categoryManipulation.getAllCategories().then(result => {
            if(result !== null) {
                dispatch(fetchAllCatgories(result));
            } else {
                dispatch(fetchAllCatgories([]));
            }
        });
    }
}

function resetCategories() {
    return {
        type: actionTypes.RESET_CATEGORY
    }
}

export default {
    getAllCategories: getAllCategories,
    resetCategories: resetCategories
}