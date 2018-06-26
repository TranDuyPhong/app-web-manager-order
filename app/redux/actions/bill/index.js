import actionTypes from './actionType';
import billManipulation from '../../../manipulations/bill';

function fetchGetAllBills(data) {
    return {
        type: actionTypes.FETCH_GET_ALL_BILL,
        bills: data.bills,
        count: data.count,
        countFalse: data.countFalse,
        countTrue: data.countTrue,
        fromDate: data.fromDate,
        toDate: data.toDate,
        state: data.state
    }
}

function getAllBills(fromDate, toDate, state) {
    return function(dispatch) {
        billManipulation.getAllBills(state).then(result => {
            if(result !== null) {
                dispatch(fetchGetAllBills({
                    bills: result.data,
                    count: result.count,
                    countFalse: result.countFalse,
                    countTrue: result.countTrue,
                    fromDate: fromDate,
                    toDate: toDate,
                    state: state
                }))
            }
        })
    }
}

function fetchGetAllBillByFilters(data) {
    return {
        type: actionTypes.FETCH_GET_ALL_BILL_BY_FILTER,
        bills: data.bills,
        count: data.count,
        countFalse: data.countFalse,
        countTrue: data.countTrue,
        fromDate: data.fromDate,
        toDate: data.toDate,
        state: data.state
    }
}

function getAllBillByFilters(fromDate, toDate, state) {
    return function(dispatch) {
        billManipulation.getAllBillByFilters(fromDate, toDate, state).then(result => {
            if(result !== null) {
                dispatch(fetchGetAllBillByFilters({
                    bills: result.data,
                    count: result.count,
                    countFalse: result.countFalse,
                    countTrue: result.countTrue,
                    fromDate: fromDate,
                    toDate: toDate,
                    state: state
                }))
            }
        })
    }
}

function resetBills() {
    return {
        type: actionTypes.RESET_BILL
    }
}

export default {
    resetBills: resetBills,
    getAllBills: getAllBills,
    getAllBillByFilters: getAllBillByFilters
}