const mongoose = require('mongoose');

const userOrderSchema = require('../../models/user-order/user-order');

function getUserOrderByTable(idTable) {
    return new Promise((resolve, reject) => {
        userOrderSchema.find({'idTable': idTable}).then(res => {
            resolve({res: res});
        }).catch(err => resolve({err: err}));
    });
}

function removeUserOrder(idUserOrder) {
    return new Promise((resolve, reject) => {
        userOrderSchema.remove({'_id': mongoose.Types.ObjectId(idUserOrder)}).exec((err, res) => {
            if(err) {
                resolve({err: err});
            } else {
                resolve({res: res});
            }
        })
    });
}

function getUserOrderById(idUserOrder) {
    return new Promise((resolve, reject) => {
        userOrderSchema.find({'_id': mongoose.Types.ObjectId(idUserOrder)}).then(res => {
            resolve({res: res});
        }).catch(err => resolve({err: err}));
    });
}

function insertUserOrder(idTable, orderName, phoneOrder, cmndOrder, countPeopleComeIn, timeComeIn, createdBy) {
    return new Promise((resolve, reject) => {
        userOrderSchema.create({
            name: orderName,
            phone: phoneOrder,
            cmnd: cmndOrder,
            countPeople: countPeopleComeIn,
            timeOrder: Date.now(),
            timeComeIn: timeComeIn,
            idTable: idTable,
            createdDate: Date.now(),
            createdBy: createdBy
        }).then(res => {
            resolve({res: res});
        }).catch(err => resolve({err: err}));
    });
}

module.exports = {
    getUserOrderByTable: getUserOrderByTable,
    removeUserOrder: removeUserOrder,
    getUserOrderById: getUserOrderById,
    insertUserOrder: insertUserOrder
}