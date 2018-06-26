const mongoose = require('mongoose');

const billSchema = require('../../models/bill/bill');
const manipulationTable = require('../../manipulations/table/table');

function getBillByTable(idTable) {
    return new Promise((resolve, reject) => {
        billSchema.find({'idTable': idTable, 'status': false, 'timeCheckOut': null}).then(res => {
            resolve({
                res: res
            });
        }).catch(err => resolve({err: err}));
    });
}

function getBillById(idBill) {
    return new Promise((resolve, reject) => {
        billSchema.find({'_id': mongoose.Types.ObjectId(idBill)}).then(res => {
            resolve({res: res});
        }).catch(err => resolve({err: err}));
    })
}

function updateBillPayment(idBill) {
    return new Promise((resolve, reject) => {
        billSchema.update({'_id': mongoose.Types.ObjectId(idBill), 'timeCheckOut': null, 'status': false}, {'status': true, 'timeCheckOut': Date.now()}).exec((err, resUpdateBill) => {
            if(err) {
                resolve({err: err});
            } else {
                resolve({res: resUpdateBill});
            }
        });
    });
}

function removeBill(idBill) {
    return new Promise((resolve, reject) => {
        billSchema.find({'_id': mongoose.Types.ObjectId(idBill), 'status': false, 'timeCheckOut': null}).then(resBill => {
            if(resBill.length === 1) {
                let idTable = resBill[0].idTable;
                billSchema.remove({'_id': mongoose.Types.ObjectId(idBill)}).exec((err, resRemoveBill) => {
                    if(err) {
                        resolve({err: err});
                    } else {
                        if(resRemoveBill.ok === 1) {
                            manipulationTable.updateTableStatusEmpty(idTable).then(resUpdateTable => {
                                if(resUpdateTable.err) {
                                    resolve({err: resUpdateTable.err});
                                } else {
                                    manipulationTable.getAllTables().then(resTables => {
                                        resolve({
                                            res: {
                                                resTables: resTables.res,
                                                resRemoveBill: resRemoveBill
                                            }
                                        });
                                    }).catch(err => resolve({err: err}));
                                }
                            });
                        } else {
                            resolve({err: err});
                        }
                    }
                });
            } else {
                resolve({err: 'Không tìm thấy hóa đơn'});
            }
        });
    });
}

function createBill(idTable, foodOrders, createdBy, countPeople) {
    return new Promise((resolve, reject) => {
        manipulationTable.checkTableEmpty(idTable).then(resCheckTableEmpty => {
            if (resCheckTableEmpty.err) {
                resolve({err: resCheckTableEmpty.err});
            } else if (resCheckTableEmpty.res === null || resCheckTableEmpty.res === undefined || resCheckTableEmpty.res.length === 0) {
                resolve({err: 'Bàn này hiện không trống, không thể đặt được'});
            } else {
                let totalPrice = 0;
                if(foodOrders !== null && foodOrders !== undefined) {
                    for(let i = 0; i < foodOrders.length; i++) {
                        totalPrice += parseInt(foodOrders[i].total);
                    }
                }
                billSchema.create({
                    timeCheckIn: Date.now(),
                    timeCheckOut: null,
                    status: false,
                    totalPrice: totalPrice,
                    createDate: Date.now(),
                    modifiedDate: null,
                    modifiedBy: '',
                    createdBy: createdBy,
                    idTable: idTable,
                    billInfos: foodOrders
                }).then(resCreateBill => {
                    manipulationTable.updateTableStatusHavePeople(idTable, countPeople).then(resUpdateTable => {
                        if(resUpdateTable.err) {
                            resolve({err: resUpdateTable.err});
                        } else {
                            manipulationTable.getAllTables().then(resTables => {
                                if(resTables.err) {
                                    resolve({err: err});
                                } else {
                                    resolve({res: resTables.res});
                                }
                            });
                        }
                    });
                }).catch(err => {
                    resolve({err: err});
                });
            }
        }).catch(err => resolve({err: err}));
    });
}

function addFoodForBill(idBill, foodOrders, modifiedBy) {
    return new Promise((resolve, reject) => {
        billSchema.find({'_id': idBill, 'status': false, 'timeCheckOut': null}).then(resBill => {
            if(resBill === null || resBill === undefined || resBill.length === 0) {
                resolve({err: 'Không tìm thấy hóa đơn'});
            } else {
                let billInfos = resBill[0].billInfos;
                let totalPrice = resBill[0].totalPrice;
                if(foodOrders !== null && foodOrders !== undefined) {
                    for(let i = 0; i < foodOrders.length; i++) {
                        let billInfo = billInfos.find(p => p.id === foodOrders[i].id);
                        if(billInfo !== null && billInfo !== undefined) {
                            billInfo.count = parseInt(billInfo.count) + parseInt(foodOrders[i].count);
                            billInfo.total = parseInt(billInfo.total) + parseInt(foodOrders[i].total);
                            totalPrice = parseInt(totalPrice) + parseInt(foodOrders[i].total);
                        } else {
                            billInfos.push(foodOrders[i]);
                            totalPrice = parseInt(totalPrice) + parseInt(foodOrders[i].total);
                        }
                    }
                    billSchema.update({'_id': idBill}, {'billInfos': billInfos, 'modifiedDate': Date.now(), 'modifiedBy': modifiedBy, 'totalPrice': totalPrice}).exec((err, resUpdateBill) => {
                        if(err) {
                            resolve({err: err});
                        } else {
                            manipulationTable.getAllTables().then(resTables => {
                                if(resTables.err) {
                                    resolve({err: err});
                                } else {
                                    resolve({res: resTables.res});
                                }
                            });
                        }
                    });
                } else {
                    billSchema.update({'_id': idBill}, {'billInfos': billInfos, 'modifiedDate': Date.now(), 'modifiedBy': modifiedBy, 'totalPrice': totalPrice}).exec((err, resUpdateBill) => {
                        if(err) {
                            resolve({err: err});
                        } else {
                            manipulationTable.getAllTables().then(resTables => {
                                if(resTables.err) {
                                    resolve({err: err});
                                } else {
                                    resolve({res: resTables.res});
                                }
                            });
                        }
                    });
                }
            }
        }).catch(err => resolve({err: err}));
    }); 
}

function incrementCountFood(idBill, idFood, modifiedBy) {
    return new Promise((resolve, reject) => {
        billSchema.find({'_id': idBill, 'status': false, 'timeCheckOut': null}).then(resCheckBill => {;
            if(resCheckBill === null || resCheckBill === undefined || resCheckBill.length === 0) {
                resolve({err: 'Không tìm thấy hóa đơn'});
            } else {
                let billInfos = resCheckBill[0].billInfos;
                let totalPrice = resCheckBill[0].totalPrice;
                let billInfo = billInfos.find(p => p.id === idFood);
                if(billInfo !== null && billInfo !== undefined) {
                    billInfo.count = parseInt(billInfo.count) + 1;
                    let price = parseInt(billInfo.priceSale) > 0 ? parseInt(billInfo.priceSale) : parseInt(billInfo.price);
                    billInfo.total = parseInt(billInfo.total) + price;
                    totalPrice = parseInt(totalPrice) + price;
                    billSchema.update({'_id': idBill}, {'totalPrice': totalPrice, 'billInfos': billInfos, 'modifiedDate': Date.now(), 'modifiedBy': modifiedBy}).exec((err, resUpdateBill) => {
                        if(err) {
                            resolve({err: err});
                        } else {
                            billSchema.find({'_id': idBill, 'status': false, 'timeCheckOut': null}).then(resBill => {
                                resolve({res: resBill});
                            }).catch(err => resolve({err: err}));
                        }
                    });
                } else {
                    resolve({err: 'Không tìm thấy món này trong hóa đơn'});
                }
            }
        }).catch(err => resolve({err: err}));
    });
}

function decrementCountFood(idBill, idFood, modifiedBy) {
    return new Promise((resolve, reject) => {
        billSchema.find({'_id': idBill, 'status': false, 'timeCheckOut': null}).then(resCheckBill => {;
            if(resCheckBill === null || resCheckBill === undefined || resCheckBill.length === 0) {
                resolve({err: 'Không tìm thấy hóa đơn'});
            } else {
                let billInfos = resCheckBill[0].billInfos;
                let totalPrice = resCheckBill[0].totalPrice;
                let billInfo = billInfos.find(p => p.id === idFood);
                if(billInfo !== null && billInfo !== undefined) {
                    if(billInfo.count > 1) {
                        billInfo.count = parseInt(billInfo.count) - 1;
                        let price = parseInt(billInfo.priceSale) > 0 ? parseInt(billInfo.priceSale) : parseInt(billInfo.price);
                        billInfo.total = parseInt(billInfo.total) - price;
                        totalPrice = parseInt(totalPrice) - price;
                    } else {
                        const startRemoveIndex = billInfos.indexOf(billInfo, 0);
                        totalPrice = parseInt(totalPrice) - parseInt(billInfo.total);
                        billInfos.splice(startRemoveIndex, 1);
                    }
                    billSchema.update({'_id': idBill}, {'totalPrice': totalPrice, 'billInfos': billInfos, 'modifiedDate': Date.now(), 'modifiedBy': modifiedBy}).exec((err, resUpdateBill) => {
                        if(err) {
                            resolve({err: err});
                        } else {
                            billSchema.find({'_id': idBill, 'status': false, 'timeCheckOut': null}).then(resBill => {
                                resolve({res: resBill});
                            }).catch(err => resolve({err: err}));
                        }
                    });
                } else {
                    resolve({err: 'Không tìm thấy món này trong hóa đơn'});
                }
            }
        }).catch(err => resolve({err: err}));
    });
}

function removeFood(idBill, idFood, modifiedBy) {
    return new Promise((resolve, reject) => {
        billSchema.find({'_id': idBill, 'status': false, 'timeCheckOut': null}).then(resCheckBill => {;
            if(resCheckBill === null || resCheckBill === undefined || resCheckBill.length === 0) {
                resolve({err: 'Không tìm thấy hóa đơn'});
            } else {
                let billInfos = resCheckBill[0].billInfos;
                let totalPrice = resCheckBill[0].totalPrice;
                let billInfo = billInfos.find(p => p.id === idFood);
                if(billInfo !== null && billInfo !== undefined) {
                    const startRemoveIndex = billInfos.indexOf(billInfo, 0);
                    totalPrice = parseInt(totalPrice) - parseInt(billInfo.total);
                    billInfos.splice(startRemoveIndex, 1);
                    billSchema.update({'_id': idBill}, {'totalPrice': totalPrice, 'billInfos': billInfos, 'modifiedDate': Date.now(), 'modifiedBy': modifiedBy}).exec((err, resUpdateBill) => {
                        if(err) {
                            resolve({err: err});
                        } else {
                            billSchema.find({'_id': idBill, 'status': false, 'timeCheckOut': null}).then(resBill => {
                                resolve({res: resBill});
                            }).catch(err => resolve({err: err}));
                        }
                    });
                } else {
                    resolve({err: 'Không tìm thấy món này trong hóa đơn'});
                }
            }
        }).catch(err => resolve({err: err}));
    });
}

function removeAllFood(idBill, modifiedBy) {
    return new Promise((resolve, reject) => {
        billSchema.find({'_id': idBill, 'status': false, 'timeCheckOut': null}).then(resCheckBill => {;
            if(resCheckBill === null || resCheckBill === undefined || resCheckBill.length === 0) {
                resolve({err: 'Không tìm thấy hóa đơn'});
            } else {
                billSchema.update({'_id': idBill}, {'totalPrice': 0, 'billInfos': [], 'modifiedDate': Date.now(), 'modifiedBy': modifiedBy}).exec((err, resUpdateBill) => {
                    if(err) {
                        resolve({err: err});
                    } else {
                        billSchema.find({'_id': idBill, 'status': false, 'timeCheckOut': null}).then(resBill => {
                            resolve({res: resBill});
                        }).catch(err => resolve({err: err}));
                    }
                });
            }
        }).catch(err => resolve({err: err}));
    });
}

function getAllBills(state) {
    return new Promise((resolve, reject) => {
        billSchema.count().then(resCount => {
            billSchema.count({'status': false}).then(resCountFalse => {
                billSchema.count({'status': true}).then(resCountTrue => {
                    if(state !== '' && state !== null && state !== undefined) {
                        if(state === 'true') {
                            billSchema.find({'status': true}).then(res => {
                                resolve({res: {
                                    data: res,
                                    count: resCount,
                                    countFalse: resCountFalse,
                                    countTrue: resCountTrue
                                }});
                            }).catch(err => resolve({err: err}));
                            return;
                        } else if (state === 'false') {
                            billSchema.find({'status': false}).then(res => {
                                resolve({res: {
                                    data: res,
                                    count: resCount,
                                    countFalse: resCountFalse,
                                    countTrue: resCountTrue
                                }});
                            }).catch(err => resolve({err: err}));
                            return;
                        }
                    } 
                    billSchema.find().then(res => {
                        resolve({res: {
                            data: res,
                            count: resCount,
                            countFalse: resCountFalse,
                            countTrue: resCountTrue
                        }});
                    }).catch(err => resolve({err: err}));
                });
            });
        });
    });
}

function getAllBillByFilters(fromDate, toDate, state) {
    return new Promise((resolve, reject) => {
        billSchema.count().then(resCount => {
            billSchema.count({'status': false}).then(resCountFalse => {
                billSchema.count({'status': true}).then(resCountTrue => {
                    let fromDateFormat = `${fromDate}T00:00:00.000Z`;
                    let toDateFormat = `${toDate}T24:00:00.000Z`;
                    if(state !== '' && state !== null && state !== undefined) {
                        if(state === 'true') {
                            billSchema.find({'status': true, '$or': [
                                {
                                    'timeCheckIn': {
                                        '$gte': new Date(fromDateFormat),
                                        '$lte': new Date(toDateFormat)
                                    }
                                },
                                {
                                    'timeCheckOut': {
                                        '$gte': new Date(fromDateFormat),
                                        '$lte': new Date(toDateFormat)
                                    }
                                }
                            ]}).then(res => {
                                resolve({res: {
                                    data: res,
                                    count: resCount,
                                    countFalse: resCountFalse,
                                    countTrue: resCountTrue
                                }});
                            }).catch(err => resolve({err: err}));
                            return;
                        } else if (state === 'false') {
                            billSchema.find({'status': false, '$or': [
                                {
                                    'timeCheckIn': {
                                        '$gte': new Date(fromDateFormat),
                                        '$lte': new Date(toDateFormat)
                                    }
                                },
                                {
                                    'timeCheckOut': {
                                        '$gte': new Date(fromDateFormat),
                                        '$lte': new Date(toDateFormat)
                                    }
                                }
                            ]}).then(res => {
                                resolve({res: {
                                    data: res,
                                    count: resCount,
                                    countFalse: resCountFalse,
                                    countTrue: resCountTrue
                                }});
                            }).catch(err => resolve({err: err}));
                            return;
                        }
                    } 
                    billSchema.find({'$or': [
                        {
                            'timeCheckIn': {
                                '$gte': new Date(fromDateFormat),
                                '$lte': new Date(toDateFormat)
                            }
                        },
                        {
                            'timeCheckOut': {
                                '$gte': new Date(fromDateFormat),
                                '$lte': new Date(toDateFormat)
                            }
                        }
                    ]}).then(res => {
                        resolve({res: {
                            data: res,
                            count: resCount,
                            countFalse: resCountFalse,
                            countTrue: resCountTrue
                        }});
                    }).catch(err => resolve({err: err}));
                });
            });
        });
    });
}

module.exports = {
    getBillByTable: getBillByTable,
    updateBillPayment: updateBillPayment,
    removeBill: removeBill,
    getBillById: getBillById,
    createBill: createBill,
    addFoodForBill: addFoodForBill,
    incrementCountFood: incrementCountFood,
    decrementCountFood: decrementCountFood,
    removeFood: removeFood,
    removeAllFood: removeAllFood,
    getAllBills: getAllBills,
    getAllBillByFilters: getAllBillByFilters
}