import constantsBill from '../../constant/bill';

function getAllBills(state) {
    return new Promise((resolve, reject) => {
        let url = constantsBill.GET_ALL_BILL;
        if(state !== '' && state !== undefined && state !== null) {
            url += `?state=${state}`;
        }
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
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

function getAllBillByFilters(fromDate, toDate, state) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: constantsBill.GET_ALL_BILL_BY_FILTER,
            dataType: 'json',
            type: 'POST',
            data: {
                fromDate: fromDate,
                toDate: toDate,
                state: state
            },
            success: result => {
                if(result.status === 200 && result.res && result.res !== null) {
                    resolve(result.res);
                } else {
                    resolve(null);
                }
            }
        });
    });
}

export default {
    getAllBills: getAllBills,
    getAllBillByFilters: getAllBillByFilters
}