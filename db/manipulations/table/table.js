const mongoose = require('mongoose');
const config = require('config');
const Nexmo = require('nexmo');

const tableSchema = require('../../models/table/table');
const { getUserOrderByTable, getUserOrderById, removeUserOrder, insertUserOrder } = require('../../manipulations/user-order/user-order');

function getAllTables() {
    return new Promise((resolve, reject) => {
        tableSchema.find().then(res => {
            resolve({res: res});
        }).catch(err => resolve({err: err}));
    });
}

function getInfoTableByTable(idTable) {
    return new Promise((resolve, reject) => {
        if(module.parent.exports.getBillByTable && typeof module.parent.exports.getBillByTable === 'function') {
            module.parent.exports.getBillByTable(idTable).then(resBill => {
                getUserOrderByTable(idTable).then(resUserOrder => {
                    resolve({
                        res: {
                            resBill: resBill.res,
                            resUserOrder: resUserOrder.res
                        }
                    })
                }).catch(err => resolve({err: err}));
            }).catch(err => resolve({err: err}));
        } else {
            resolve({err: 'Lỗi'});
        }
    });
}

function updateTableStatusEmpty(idTable) {
    return new Promise((resolve, reject) => {
        tableSchema.update({'_id': mongoose.Types.ObjectId(idTable)}, {'status': 0, 'countPeople': 0}).exec((err, resUpdateTable) => {
            if(err) {
                resolve({err: err});
            } else {
                resolve({res: resUpdateTable});
            }
        });
    });
}

function removeOrderTable(idUserOrder) {
    return new Promise((resolve, reject) => {
        getUserOrderById(idUserOrder).then(resUserOrder => {
            if(resUserOrder.err) {
                resolve({err: err});
            } else {
                if(resUserOrder.res.length === 1) {
                    let idTable = resUserOrder.res[0].idTable;
                    removeUserOrder(idUserOrder).then(resRemoveUserOrder => {
                        if(resRemoveUserOrder.err) {
                            resolve({err: err});
                        } else {
                            if(resRemoveUserOrder.res.ok === 1) {
                                tableSchema.update({'_id': mongoose.Types.ObjectId(idTable), 'status': 2}, {'status': 0, 'countPeople': 0}).exec((err, resUpdateTable) => {
                                    if(err) {
                                        resolve({err: err});
                                    } else {
                                        getAllTables().then(resTables => {
                                            if(resTables.err) {
                                                resolve({err: err});
                                            } else {
                                                resolve({
                                                    res: {
                                                        resTables: resTables.res,
                                                        resUpdateTable: resUpdateTable,
                                                        resRemoveUserOrder: resRemoveUserOrder.res
                                                    }
                                                })
                                            }
                                        });
                                    }
                                });
                            } else {
                                resolve({err: err});
                            }
                        }
                    })
                } else {
                    resolve({err: 'Không có khách hàng này'});
                }
            }
        })
    });
}

function orderTable(idTable, orderName, phoneOrder, cmndOrder, countPeopleComeIn, timeComeIn, createdBy) {
    return new Promise((resolve, reject) => {
        tableSchema.update({'_id': mongoose.Types.ObjectId(idTable), 'status': 0}, {'status': 2, countPeople: countPeopleComeIn}).exec((err, resUpdateTable) => {
            if(err) {
                resolve({err: err});
            } else {
                if(resUpdateTable.nModified === 1 && resUpdateTable.ok === 1) {
                    insertUserOrder(idTable, orderName, phoneOrder, cmndOrder, countPeopleComeIn, timeComeIn, createdBy).then(resInsertUserOrder => {
                        if(resInsertUserOrder.err) {
                            resolve({err: resInsertUserOrder.err});
                        } else {
                            getAllTables().then(resTables => {
                                resolve({
                                    res: {
                                        resTables: resTables.res,
                                        resInsertUserOrder: resInsertUserOrder.res,
                                        resUpdateTable: resUpdateTable
                                    }
                                });
                            }).catch(err => resolve({err: err}));
                        }
                    });
                } else {
                    resolve({err: err})
                }
            }
        })
    });
}

function checkTableEmpty(idTable) {
    return new Promise((resolve, reject) => {
        tableSchema.find({'_id': idTable, 'status': 0}).then(res => {
            resolve({res :res});
        }).catch(err => resolve({err: err}));
    });
}


function updateTableStatusHavePeople(idTable, countPeople) {
    return new Promise((resolve, reject) => {
        tableSchema.update({'_id': mongoose.Types.ObjectId(idTable)}, {'status': 1, 'countPeople': countPeople}).exec((err, resUpdateTable) => {
            if(err) {
                resolve({err: err});
            } else {
                resolve({res: resUpdateTable});
            }
        });
    });
}

module.exports = {
    getAllTables: getAllTables,
    getInfoTableByTable: getInfoTableByTable,
    updateTableStatusEmpty: updateTableStatusEmpty,
    removeOrderTable: removeOrderTable,
    orderTable: orderTable,
    checkTableEmpty: checkTableEmpty,
    updateTableStatusHavePeople: updateTableStatusHavePeople
}