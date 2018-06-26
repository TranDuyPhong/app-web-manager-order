import actionTypes from './actionType';
import revenueManipulation from '../../../manipulations/revenue';

function fetchGetAllRevenues(data) {
    return {
        type: actionTypes.FETCH_GET_ALL_REVENUE,
        data: data.revenues,
        totalPriceToday: data.totalPriceToday,
        sumTotal: data.sumTotal,
        sumTotalMonth: data.sumTotalMonth,
        fromDate: data.fromDate,
        toDate: data.toDate
    }
}

function getAllRevenues(fromDate, toDate) {
    return function(dispatch) {
        revenueManipulation.getAllRevenues().then(result => {
            if(result !== null) {
                dispatch(fetchGetAllRevenues({
                    revenues: result.data,
                    totalPriceToday: result.totalPriceToday,
                    sumTotal: result.sumTotal,
                    sumTotalMonth: result.sumTotalMonth,
                    fromDate: fromDate,
                    toDate: toDate
                }));
            }
        })
    }
}

function fetchGetAllRevenues(data) {
    return {
        type: actionTypes.FETCH_GET_ALL_REVENUE,
        data: data.revenues,
        totalPriceToday: data.totalPriceToday,
        sumTotal: data.sumTotal,
        sumTotalMonth: data.sumTotalMonth,
        fromDate: data.fromDate,
        toDate: data.toDate
    }
}

function getAllRevenueByFilterDates(fromDate, toDate) {
    return function(dispatch) {
        revenueManipulation.getAllRevenueByFilterDates(fromDate, toDate).then(result => {
            if(result !== null) {
                dispatch(fetchGetAllRevenues({
                    revenues: result.data,
                    totalPriceToday: result.totalPriceToday,
                    sumTotal: result.sumTotal,
                    sumTotalMonth: result.sumTotalMonth,
                    fromDate: fromDate,
                    toDate: toDate
                }));
            }
        });
    }
}

function resetRevenue() {
    return {
        type: actionTypes.RESET_REVENUE
    }
}

export default {
    getAllRevenues: getAllRevenues,
    resetRevenue: resetRevenue,
    getAllRevenueByFilterDates: getAllRevenueByFilterDates
}