import constantsTable from '../../constant/table';

function getAllTables() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: constantsTable.GET_ALL_TABLE,
            type: 'GET',
            dataType: 'json',
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

function getInfoTableByTable(idTable) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${constantsTable.GET_INFO_TABLE_BY_TABLE}/${idTable}`,
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

function payment(day, money, createdBy, idBill, callbackEmit) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: constantsTable.PAYMENT,
            type: 'POST',
            dataType: 'json',
            data: {
                day: day,
                money: money,
                createdBy: createdBy,
                idBill: idBill
            },
            success: result => {
                if(result.status === 200 && 
                    result.res.resTables && 
                    result.res.resUpdateBill && 
                    result.res.resUpdateBill.nModified === 1 && result.res.resUpdateBill.ok === 1) {
                        callbackEmit();
                        alert('Thanh toán thành công');
                        resolve(result.res.resTables);
                } else {
                    resolve(null);
                }
            }
        })
    });
}

function removeBill(idBill, callbackEmit) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${constantsTable.REMOVE_BILL}/${idBill}`,
            type: 'DELETE',
            dataType: 'json',
            success: result => {
                if(result.status === 200 && 
                    result.res.resTables && 
                    result.res.resRemoveBill && 
                    result.res.resRemoveBill.ok === 1) {
                        callbackEmit();
                        alert('Hủy hóa đơn thành công');
                        resolve(result.res.resTables);
                } else {
                    resolve(null);
                }
            }
        })
    }); 
}

function removeOrderTable(idUserOrder, callbackEmit) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${constantsTable.REMOVE_ORDER_TABLE}/${idUserOrder}`,
            type: 'DELETE',
            dataType: 'json',
            success: result => {
                if(result.status === 200 && 
                    result.res.resTables && 
                    result.res.resUpdateTable && 
                    result.res.resRemoveUserOrder &&
                    result.res.resUpdateTable.ok === 1 &&
                    result.res.resUpdateTable.nModified === 1 &&
                    result.res.resRemoveUserOrder.ok === 1) {
                        callbackEmit();
                        alert('Hủy đặt bàn thành công');
                        resolve(result.res.resTables);
                } else {
                    resolve(null);
                }
            }
        })
    }); 
}

function orderTable(idTable, orderName, phoneOrder, cmndOrder, countPeopleComeIn, timeComeIn, createdBy, callbackEmit) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: constantsTable.ORDER_TABLE,
            type: 'POST',
            dataType: 'json',
            data: {
                idTable: idTable,
                orderName: orderName,
                phoneOrder: phoneOrder,
                cmndOrder: cmndOrder,
                countPeopleComeIn: countPeopleComeIn,
                timeComeIn: timeComeIn,
                createdBy: createdBy
            },  
            success: result => {
                if(result.status === 200 && 
                    result.res.resTables && 
                    result.res.resInsertUserOrder && 
                    result.res.resUpdateTable &&
                    result.res.resInsertUserOrder._id !== '' &&
                    result.res.resUpdateTable.nModified === 1 &&
                    result.res.resUpdateTable.ok === 1) {
                        callbackEmit();
                        alert('Đặt bàn thành công');
                        resolve(result.res.resTables);
                } else {
                    resolve(null);
                }
            }
        })
    }); 
}

function orderFood(idTable, foodOrders, createdBy, countPeople, callbackEmit) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: constantsTable.ORDER_FOOD,
            type: 'POST',
            dataType: 'json',
            data: {
                idTable: idTable,
                foodOrders: foodOrders,
                createdBy: createdBy,
                countPeople: countPeople
            },  
            success: result => {
                if(result.status === 200 && 
                    result.res && result.res !== null) {
                        callbackEmit();
                        alert('Order thành công');
                        resolve(result.res);
                } else {
                    resolve(null);
                }
            }
        });
    });
}

function addFoodForBill(idBill, foodOrders, modifiedBy, callbackEmit) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: constantsTable.ADD_FOOD_FOR_BILL,
            type: 'POST',
            dataType: 'json',
            data: {
                idBill: idBill,
                foodOrders: foodOrders,
                modifiedBy: modifiedBy
            },  
            success: result => {
                if(result.status === 200 && 
                    result.res && result.res !== null) {
                        callbackEmit();
                        alert('Thêm món cho bàn thành công');
                        resolve(result.res);
                } else {
                    resolve(null);
                }
            }
        })
    });
}

function incrementCountFood(idBill, idFood, modifiedBy) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: constantsTable.INCREMENT_COUNT_FOOD,
            type: 'POST',
            data: {
                idBill: idBill,
                idFood: idFood,
                modifiedBy: modifiedBy
            },
            dataType: 'json',
            success: result => {
                if(result.status === 200 && result.res && result.res !== null && result.res.length === 1) {
                    resolve(result.res[0]);
                } else {
                    resolve(null);
                }
            } 
        });
    });
}

function decrementCountFood(idBill, idFood, modifiedBy) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: constantsTable.DECREMENT_COUNT_FOOD,
            type: 'POST',
            data: {
                idBill: idBill,
                idFood: idFood,
                modifiedBy: modifiedBy
            },
            dataType: 'json',
            success: result => {
                if(result.status === 200 && result.res && result.res !== null && result.res.length === 1) {
                    resolve(result.res[0]);
                } else {
                    resolve(null);
                }
            } 
        });
    });
}

function removeFood(idBill, idFood, modifiedBy) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: constantsTable.REMOVE_FOOD,
            type: 'POST',
            data: {
                idBill: idBill,
                idFood: idFood,
                modifiedBy: modifiedBy
            },
            dataType: 'json',
            success: result => {
                if(result.status === 200 && result.res && result.res !== null && result.res.length === 1) {
                    resolve(result.res[0]);
                } else {
                    resolve(null);
                }
            } 
        });
    });
}

function removeAllFood(idBill, modifiedBy) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: constantsTable.REMOVE_ALL_FOOD,
            type: 'POST',
            data: {
                idBill: idBill,
                modifiedBy: modifiedBy
            },
            dataType: 'json',
            success: result => {
                if(result.status === 200 && result.res && result.res !== null && result.res.length === 1) {
                    resolve(result.res[0]);
                } else {
                    resolve(null);
                }
            } 
        });
    });
}

export default {
    getAllTables: getAllTables,
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
    removeAllFood: removeAllFood
}