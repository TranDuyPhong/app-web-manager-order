import actionTypeRevenues from '../../actions/revenue/actionType';

let initialState = {
    data: [],
    totalPriceToday: 0,
    sumTotal: 0,
    sumTotalMonth: 0,
    fromDate: '',
    toDate: ''
}

const revenueReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypeRevenues.FETCH_GET_ALL_REVENUE:
            state = {
                data: action.data,
                totalPriceToday: action.totalPriceToday,
                sumTotal: action.sumTotal,
                sumTotalMonth: action.sumTotalMonth,
                fromDate: action.fromDate,
                toDate: action.toDate
            }
            return state;
        case actionTypeRevenues.FETCH_GET_ALL_REVENUE_BY_FILTER_DATE:
            state = {
                data: action.data,
                totalPriceToday: action.totalPriceToday,
                sumTotal: action.sumTotal,
                sumTotalMonth: action.sumTotalMonth,
                fromDate: action.fromDate,
                toDate: action.toDate
            }
            return state;
        case actionTypeRevenues.RESET_REVENUE:
            state = {
                data: [],
                totalPriceToday: 0,
                sumTotal: 0,
                sumTotalMonth: 0,
                fromDate: '',
                toDate: ''
            }
            return state;
        default: return state;
    }
}

export default revenueReducer;