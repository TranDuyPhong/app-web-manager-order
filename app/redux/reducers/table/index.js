import actionTypeTables from '../../actions/table/actionType';

let initialState = {
    data: [],
    dataBill: {},
    dataUserOrder: {}
}

const tableReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypeTables.FETCH_ALL_TABLE:
            state = {
                data: action.data,
                dataBill: {},
                dataUserOrder: {}
            }
            return state;  
        case actionTypeTables.RESET_TABLE:
            state = {
                data: [],
                dataBill: {},
                dataUserOrder: {}
            }
            return state;    
        case actionTypeTables.FETCH_INFO_TABLE_BY_TABLE:
            state = {
                ...state,
                dataBill: action.dataBill,
                dataUserOrder: action.dataUserOrder
            }
            return state;  
        case actionTypeTables.FETCH_ORDER_FOOD:
            state = {
                data: action.data,
                dataBill: {},
                dataUserOrder: {}
            }
            return state;
        case actionTypeTables.FETCH_ADD_FOOD_FOR_BILL:
            state = {
                data: action.data,
                dataBill: {},
                dataUserOrder: {}
            }
            return state; 
        case actionTypeTables.FETCH_INCREMENT_COUNT_FOOD:
            state = {
                ...state,
                dataBill: action.data
            }
            return state;    
        case actionTypeTables.FETCH_DECREMENT_COUNT_FOOD:
            state = {
                ...state,
                dataBill: action.data
            }
            return state;  
        case actionTypeTables.FETCH_REMOVE_FOOD:
            state = {
                ...state,
                dataBill: action.data
            }
            return state;    
        case actionTypeTables.FETCH_REMOVE_ALL_FOOD:
            state = {
                ...state,
                dataBill: action.data
            }
            return state;     
        default: return state;
    }
}

export default tableReducer;

