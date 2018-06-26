import constantsRevenue from '../../constant/revenue';

function getAllRevenues() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: constantsRevenue.GET_ALL_REVENUE,
            dataType: 'json',
            type: 'GET',
            success: result => {
                if(result.status === 200 && result.res && result.res !== null) {
                    resolve(result.res);
                } else {
                    resolve(null);
                }
            }
        })
    });
}

function getAllRevenueByFilterDates(fromDate, toDate) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: constantsRevenue.GET_ALL_REVENUE_BY_FILTER_DATE,
            dataType: 'json',
            type: 'POST',
            data: {
                fromDate: fromDate,
                toDate: toDate
            },  
            success: result => {
                if(result.status === 200 && result.res && result.res !== null) {
                    resolve(result.res);
                } else {
                    resolve(null);
                }
            }
        })
    });
}

export default {
    getAllRevenues: getAllRevenues,
    getAllRevenueByFilterDates: getAllRevenueByFilterDates
}