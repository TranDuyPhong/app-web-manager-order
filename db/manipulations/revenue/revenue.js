const mongoose = require('mongoose');

const revenueSchema = require('../../models/revenue/revenue');
const manipulationTable = require('../../manipulations/table/table');
const manipulationBill = require('../../manipulations/bill/bill');

function payment(day, money, createdBy, idBill) {
    return new Promise((resolve, reject) => {
        manipulationBill.getBillById(idBill).then(resBill => {
            if(resBill.err) {
                resolve({err: err});
            } else {
                if(resBill.res.length === 1) {
                    manipulationBill.updateBillPayment(idBill).then(resUpdateBill => {
                        if(resUpdateBill.err) {
                            resolve({err: err});
                        } else {
                            if(resUpdateBill.res.nModified === 1) {
                                let idTable = resBill.res[0].idTable;
                                revenueSchema.find({'revenueDate': day}).then(resRevenue => {
                                    if(resRevenue.length === 0) {
                                        revenueSchema.create({
                                            total: money,
                                            revenueDate: day,
                                            createdDate: Date.now(),
                                            createdBy: createdBy,
                                            modifiedDate: null,
                                            modifiedBy: ''
                                        }).then(() => {
                                            manipulationTable.updateTableStatusEmpty(idTable).then(resUpdateTable => {
                                                if(resUpdateTable.err) {
                                                    resolve({err: resUpdateTable.err});
                                                } else {
                                                    manipulationTable.getAllTables().then(resTables => {
                                                        resolve({res: {
                                                            resTables: resTables.res,
                                                            resUpdateBill: resUpdateBill.res
                                                        }});
                                                    });
                                                }
                                            });
                                        });
                                    } else {
                                        let { _id, total, revenueDate } = resRevenue[0];
                                        let totalSum = parseInt(total) + parseInt(money);
                                        revenueSchema.update({'revenueDate': revenueDate, '_id': mongoose.Types.ObjectId(_id)}, 
                                        {'total': totalSum}).exec((err, res) => {
                                            if(err) {
                                                resolve({err: err});
                                            } else {
                                                manipulationTable.updateTableStatusEmpty(idTable).then(resUpdateTable => {
                                                    if(resUpdateTable.err) {
                                                        resolve({err: resUpdateTable.err});
                                                    } else {
                                                        manipulationTable.getAllTables().then(resTables => {
                                                            resolve({res: {
                                                                resTables: resTables.res,
                                                                resUpdateBill: resUpdateBill.res
                                                            }});
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }).catch(err => resolve({err: err}));
                            } else {
                               resolve({err: 'Không tìm thấy hóa đơn'});
                            }
                        }
                    });
                } else {
                    resolve({err: 'Không tìm thấy hóa đơn này'});
                }
            }
        })
    })
}

function getAllRevenues() {
    return new Promise((resolve, reject) => {
        let date = new Date();
        let dateSplit = date.toLocaleDateString().split('-');
        if(dateSplit[1].length === 1) {
            dateSplit[1] = `0${dateSplit[1]}`;
        }
        if(dateSplit[2].length === 1) {
            dateSplit[2] = `0${dateSplit[2]}`;
        }
        let dateFormat = `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}`;
        let fromDate = `${dateFormat}T00:00:00.000Z`;
        let toDate = `${dateFormat}T24:00:00.000Z`;
        revenueSchema.find({'createdDate': {
            '$gte': new Date(fromDate),
            '$lte': new Date(toDate)
        }}).then(resToday => {
            let newDate = new Date();
            let fristDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
            let lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
            let fristDaySplit = fristDay.toLocaleDateString().split('-');
            if(fristDaySplit[1].length === 1) {
                fristDaySplit[1] = `0${fristDaySplit[1]}`;
            }
            if(fristDaySplit[2].length === 1) {
                fristDaySplit[2] = `0${fristDaySplit[2]}`;
            }
            let fristDayFormat = `${fristDaySplit[0]}-${fristDaySplit[1]}-${fristDaySplit[2]}`;
            let lastDaySplit = lastDay.toLocaleDateString().split('-');
            if(lastDaySplit[1].length === 1) {
                lastDaySplit[1] = `0${lastDaySplit[1]}`;
            }
            let lastDayFormat = `${lastDaySplit[0]}-${lastDaySplit[1]}-${lastDaySplit[2]}`;
            firstDayFormat = `${fristDayFormat}T00:00:00.000Z`;
            lastDayFormat = `${lastDayFormat}T24:00:00.000Z`;
            revenueSchema.aggregate([
                {
                    '$match': 
                    {
                        '$and':[
                            {
                                'createdDate': {'$gte': new Date(firstDayFormat)}
                            },
                            {
                                'createdDate': {'$lte': new Date(lastDayFormat)}
                            }
                        ]
                    }
                },
                {
                    '$group': 
                    {
                        _id: null,
                        sumTotalMonth: {'$sum': '$total'}
                    }
                }
            ]).then(resSumTotalMonth => {
                let totalPriceToday = resToday.length === 1 ? resToday[0].total : 0;
                revenueSchema.aggregate([{'$group': {'_id': null, sumTotal: {'$sum': '$total'}}}]).then(resSumTotal => {
                    revenueSchema.find().then(res => {
                        resolve({res: {
                            data: res,
                            totalPriceToday: totalPriceToday,
                            sumTotal: resSumTotal[0].sumTotal,
                            sumTotalMonth: resSumTotalMonth[0].sumTotalMonth
                        }});
                    }).catch(err => resolve({err: err}));
                }).catch(err => resolve({err: err}));
            });
        });
    });
}

function getAllRevenueByFilterDates(fromDate, toDate) {
    return new Promise((resolve, reject) => {
        let date = new Date();
        let dateSplit = date.toLocaleDateString().split('-');
        if(dateSplit[1].length === 1) {
            dateSplit[1] = `0${dateSplit[1]}`;
        }
        let dateFormat = `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}`;
        let fromDate = `${dateFormat}T00:00:00.000Z`;
        let toDate = `${dateFormat}T24:00:00.000Z`;
        revenueSchema.find({'createdDate': {
            '$gte': new Date(fromDate),
            '$lte': new Date(toDate)
        }}).then(resToday => {
            let newDate = new Date();
            let fristDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
            let lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
            let fristDaySplit = fristDay.toLocaleDateString().split('-');
            if(fristDaySplit[1].length === 1) {
                fristDaySplit[1] = `0${fristDaySplit[1]}`;
            }
            if(fristDaySplit[2].length === 1) {
                fristDaySplit[2] = `0${fristDaySplit[2]}`;
            }
            let fristDayFormat = `${fristDaySplit[0]}-${fristDaySplit[1]}-${fristDaySplit[2]}`;
            let lastDaySplit = lastDay.toLocaleDateString().split('-');
            if(lastDaySplit[1].length === 1) {
                lastDaySplit[1] = `0${lastDaySplit[1]}`;
            }
            let lastDayFormat = `${lastDaySplit[0]}-${lastDaySplit[1]}-${lastDaySplit[2]}`;
            firstDayFormat = `${fristDayFormat}T00:00:00.000Z`;
            lastDayFormat = `${lastDayFormat}T24:00:00.000Z`;
            revenueSchema.aggregate([
                {
                    '$match': 
                    {
                        '$and':[
                            {
                                'createdDate': {'$gte': new Date(firstDayFormat)}
                            },
                            {
                                'createdDate': {'$lte': new Date(lastDayFormat)}
                            }
                        ]
                    }
                },
                {
                    '$group': 
                    {
                        _id: null,
                        sumTotalMonth: {'$sum': '$total'}
                    }
                }
            ]).then(resSumTotalMonth => {
                let fromDateFormat = `${fromDate}T00:00:00.000Z`;
                let toDateFormat = `${toDate}T24:00:00.000Z`;
                let totalPriceToday = resToday.length === 1 ? resToday[0].total : 0;
                revenueSchema.aggregate([{'$group': {'_id': null, sumTotal: {'$sum': '$total'}}}]).then(resSumTotal => {
                    revenueSchema.find({'createdDate': {'$gte': new Date(fromDateFormat), '$lte': new Date(toDateFormat)}}).then(res => {
                        resolve({res: {
                            data: res,
                            totalPriceToday: totalPriceToday,
                            sumTotal: resSumTotal[0].sumTotal,
                            sumTotalMonth: resSumTotalMonth[0].sumTotalMonth
                        }});
                    }).catch(err => resolve({err: err}));
                }).catch(err => resolve({err: err}));
            });
        });
    });
}

module.exports = {
    payment: payment,
    getAllRevenues: getAllRevenues,
    getAllRevenueByFilterDates: getAllRevenueByFilterDates
}