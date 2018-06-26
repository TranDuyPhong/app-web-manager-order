const categorySchema = require('../../models/category/category');

const category_1 = new categorySchema({
    name: 'Gà',
    createdDate: Date.now(),
    createdBy: 'admin',
    modifiedDate: null,
    modifiedBy: ''
});

category_1.save(err => {
    if(err) {
        console.log(err);
    } else {
        console.log(`${Date.now()} Category 1 generated`);
    }
});

// const category_2 = new categorySchema({
//     name: 'Bò',
//     createdDate: Date.now(),
//     createdBy: 'admin',
//     modifiedDate: null,
//     modifiedBy: ''
// });

// category_2.save(err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(`${Date.now()} Category 1 generated`);
//     }
// });