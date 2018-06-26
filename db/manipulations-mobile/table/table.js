const tableSchema = require('../../models/table/table');

function getAllTablesMobile() {
    return new Promise((resolve, reject) => {
        tableSchema.find().select({'_id': 1, 'name': 1, 'status': 1}).then(res => {
            resolve({res: res});
        }).catch(err => resolve({err: err}));
    });
}

module.exports = {
    getAllTablesMobile: getAllTablesMobile
}