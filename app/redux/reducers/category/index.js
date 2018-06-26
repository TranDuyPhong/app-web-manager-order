import actionTypeCategorys from '../../actions/category/actionType';

let initialState = [];

const categoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypeCategorys.FETCH_ALL_CATEGORIES:
            state = action.data;
            return state;
        case actionTypeCategorys.RESET_CATEGORY:
            state = [];
            return state;
        default: return state;
    }
}

export default categoryReducer;