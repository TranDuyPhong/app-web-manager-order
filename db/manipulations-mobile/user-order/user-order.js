const userOrderSchema = require('../../models/user-order/user-order');

function getTimeOrderAndTimeComeInByIdTable(idTable) {
    return new Promise((resolve, reject) => {
        userOrderSchema.find({'idTable': idTable}).select({'timeOrder': 1, 'timeComeIn': 1}).then(res => {
            resolve({res: res});
        }).catch(err => resolve({err: err}));
    });
}

module.exports = {
    getTimeOrderAndTimeComeInByIdTable: getTimeOrderAndTimeComeInByIdTable
}