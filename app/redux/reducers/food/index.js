import actionTypeFoods from '../../actions/food/actionType';

let initialState = {
    data: [],
    idCategory: '',
    filterPriceFrom: undefined,
    filterPriceTo: undefined,
    filterPriceSmallFrom: undefined,
    filterPriceLargeFrom: undefined,
    keyword: ''
}

const foodReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypeFoods.FETCH_FOOD_BY_CATEGORY:
            state = {
                data: action.data,
                idCategory: action.idCategory,
                filterPriceFrom: action.filterPriceFrom,
                filterPriceTo: action.filterPriceTo,
                filterPriceSmallFrom: action.filterPriceSmallFrom,
                filterPriceLargeFrom: action.filterPriceLargeFrom
            }
            return state;
        case actionTypeFoods.FETCH_ALL_FOOD:
            state = {
                data: action.data,
                idCategory: '',
                filterPriceFrom: action.filterPriceFrom,
                filterPriceTo: action.filterPriceTo,
                filterPriceSmallFrom: action.filterPriceSmallFrom,
                filterPriceLargeFrom: action.filterPriceLargeFrom
            }
            return state;  
        case actionTypeFoods.FETCH_ALL_FOOD_BY_FILTER:
            state = {
                data: action.data,
                idCategory: '',
                filterPriceFrom: action.filterPriceFrom,
                filterPriceTo: action.filterPriceTo,
                filterPriceSmallFrom: action.filterPriceSmallFrom,
                filterPriceLargeFrom: action.filterPriceLargeFrom,
                keyword: action.keyword
            }
            return state;  
        case actionTypeFoods.RESET_FOOD:
            state = {
                data: [],
                idCategory: '',
                filterPriceFrom: undefined,
                filterPriceTo: undefined,
                filterPriceSmallFrom: undefined,
                filterPriceLargeFrom: undefined,
                keyword: ''
            }
            return state;    
        default: return state;
    }
}

export default foodReducer;