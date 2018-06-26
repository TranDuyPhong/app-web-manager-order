const categorySchema = require('../../models/category/category');

function getAllCategories() {
    return new Promise((resolve, reject) => {
        categorySchema.find().then(res => {
            resolve({res: res});
        }).catch(err => resolve({err: err}));
    });
}

module.exports = {
    getAllCategories: getAllCategories
}