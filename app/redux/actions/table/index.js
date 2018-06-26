import actionTypes from './actionType';
import tableManipulation from '../../../manipulations/table';

function fetchAllTables(data) {
    return {
        type: actionTypes.FETCH_ALL_TABLE,
        data: data
    }
}

function getAllTables(idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom) {
    return function(dispatch) {
        tableManipulation.getAllTables().then(result => {
            if(result !== null) {
                dispatch(fetchAllTables(result));
            } else {
                dispatch(fetchAllTables([]));
            }
        })
    }
}

function fetchInfoTableByTable(data) {
    return {
        type: actionTypes.FETCH_INFO_TABLE_BY_TABLE,
        dataBill: data.bill,
        dataUserOrder: data.userOrder
    }
}

function getInfoTableByTable(idTable) {
    return function(dispatch) {
        tableManipulation.getInfoTableByTable(idTable).then(result => {
            if(result !== null) {
                dispatch(fetchInfoTableByTable({
                    bill: result.resBill.length === 0 ? {} : result.resBill[0],
                    userOrder: result.resUserOrder.length === 0 ? {} : result.resUserOrder[0]
                }));
            } else {
                dispatch(fetchInfoTableByTable({
                    bill: {},
                    userOrder: {}
                }));
            }
        });
    }
}

function payment(day, money, createdBy, idBill, callbackEmit) {
    return function(dispatch) {
        tableManipulation.payment(day, money, createdBy, idBill, callbackEmit).then(result => {
            if(result !== null) {
                dispatch(fetchAllTables(result));
            }
        });
    }
}

function removeBill(idBill, callbackEmit) {
    return function(dispatch) {
        tableManipulation.removeBill(idBill, callbackEmit).then(result => {
            if(result !== null) {
                dispatch(fetchAllTables(result));
            }
        });
    }
}

function removeOrderTable(idUserOrder, callbackEmit) {
    return function(dispatch) {
        tableManipulation.removeOrderTable(idUserOrder, callbackEmit).then(result => {
            if(result !== null) {
                dispatch(fetchAllTables(result));
            }
        });
    }
}

function orderTable(idTable, orderName, phoneOrder, cmndOrder, countPeopleComeIn, timeComeIn, createdBy, callbackEmit) {
    return function(dispatch) {
        tableManipulation.orderTable(idTable, orderName, phoneOrder, cmndOrder, countPeopleComeIn, timeComeIn, createdBy, callbackEmit).then(result => {
            if(result !== null) {
                dispatch(fetchAllTables(result));
            }
        });
    }
}

function fetchOrderFood(data) {
    return {
        type: actionTypes.FETCH_ORDER_FOOD,
        data: data
    }
}

function orderFood(idTable, foodOrders, createdBy, countPeople, callbackEmit) {
    return function(dispatch) {
        tableManipulation.orderFood(idTable, foodOrders, createdBy, countPeople, callbackEmit).then(result => {
            if(result !== null) {
                dispatch(fetchOrderFood(result));
            }
        });
    }
}

function fetchAddFoodForBill(data) {
    return {
        type: actionTypes.FETCH_ADD_FOOD_FOR_BILL,
        data: data
    }
}

function addFoodForBill(idBill, foodOrders, modifiedBy, callbackEmit) {
    return function(dispatch) {
        tableManipulation.addFoodForBill(idBill, foodOrders, modifiedBy, callbackEmit).then(result => {
            if(result !== null) {
                dispatch(fetchAddFoodForBill(result));
            }
        });
    }
}

function fetchIncrementCountFood(data) {
    return {
        type: actionTypes.FETCH_INCREMENT_COUNT_FOOD,
        data: data
    }
}

function incrementCountFood(idBill, idFood, modifiedBy) {
    return function(dispatch) {
        tableManipulation.incrementCountFood(idBill, idFood, modifiedBy).then(result => {
            if(result !== null) {
                dispatch(fetchIncrementCountFood(result));
            }
        });
    }
}

function fetchDecrementCountFood(data) {
    return {
        type: actionTypes.FETCH_INCREMENT_COUNT_FOOD,
        data: data
    }
}

function decrementCountFood(idBill, idFood, modifiedBy) {
    return function(dispatch) {
        tableManipulation.decrementCountFood(idBill, idFood, modifiedBy).then(result => {
            if(result !== null) {
                dispatch(fetchDecrementCountFood(result));
            }
        });
    }
}

function fetchRemoveFood(data) {
    return {
        type: actionTypes.FETCH_REMOVE_FOOD,
        data: data
    }
}

function removeFood(idBill, idFood, modifiedBy) {
    return function(dispatch) {
        tableManipulation.removeFood(idBill, idFood, modifiedBy).then(result => {
            if(result !== null) {
                dispatch(fetchRemoveFood(result));
            }
        });
    }
}

function fetchRemoveAllFood(data) {
    return {
        type: actionTypes.FETCH_REMOVE_ALL_FOOD,
        data: data
    }
}

function removAllFood(idBill, modifiedBy) {
    return function(dispatch) {
        tableManipulation.removeAllFood(idBill, modifiedBy).then(result => {
            if(result !== null) {
                dispatch(fetchRemoveAllFood(result));
            }
        });
    }
}

function resetTables() {
    return {
        type: actionTypes.RESET_TABLE
    }
}

export default {
    getAllTables: getAllTables,
    resetTables: resetTables,
    getInfoTableByTable: getInfoTableByTable,
    payment: payment,
    removeBill: removeBill,
    removeOrderTable: removeOrderTable,
    orderTable: orderTable,
    orderFood: orderFood,
    addFoodForBill: addFoodForBill,
    incrementCountFood: incrementCountFood,
    decrementCountFood: decrementCountFood,
    removeFood: removeFood,
    removAllFood: removAllFood
}