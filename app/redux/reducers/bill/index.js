import actionTypeBills from '../../actions/bill/actionType';

let initialState = {
    data: [],
    count: 0,
    countFalse: 0,
    countTrue: 0,
    fromDate: '',
    toDate: '',
    state: ''
}

const billReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypeBills.FETCH_GET_ALL_BILL:
            state = {
                data: action.bills,
                count: action.count,
                countFalse: action.countFalse,
                countTrue: action.countTrue,
                fromDate: action.fromDate,
                toDate: action.toDate,
                state: action.state
            }
            return state;
        case actionTypeBills.FETCH_GET_ALL_BILL_BY_FILTER:
            state = {
                data: action.bills,
                count: action.count,
                countFalse: action.countFalse,
                countTrue: action.countTrue,
                fromDate: action.fromDate,
                toDate: action.toDate,
                state: action.state
            }
            return state;
        default: return state;
    }
}

export default billReducer;