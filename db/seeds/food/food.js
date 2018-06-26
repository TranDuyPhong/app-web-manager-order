const mongoose = require('mongoose');

const foodSchema = require('../../models/food/food');

const food_1 = new foodSchema({
    name: 'Cánh gà chiên nước mắm',
    price: 130000,
    priceSale: 0,
    image: 'canh-ga-chien-nuoc-mam.png',
    idCategory: '',
    createdDate: Date.now(),
    createdBy: 'admin',
    modifiedDate: null,
    modifiedBy: ''
});

food_1.save(err => {
    if(err) {
        console.log(err);
    } else {
        console.log(`${Date.now()} Food 1 generated`);
    }
});

// const food_2 = new foodSchema({
//     name: 'Chân gà chiên nước mắm',
//     price: 90000,
//     priceSale: 0,
//     image: 'chan-ga-chien-nuoc-mam.png',
//     idCategory: '5b292246fcfe701914db58ed',
//     createdDate: Date.now(),
//     createdBy: 'admin',
//     modifiedDate: null,
//     modifiedBy: ''
// });

// food_2.save(err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(`${Date.now()} Food 2 generated`);
//     }
// });

// const food_3 = new foodSchema({
//     name: 'Đùi gà chiên nước mắm',
//     price: 150000,
//     priceSale: 0,
//     image: 'dui-ga-chien-nuoc-mam.png',
//     idCategory: '5b292246fcfe701914db58ed',
//     createdDate: Date.now(),
//     createdBy: 'admin',
//     modifiedDate: null,
//     modifiedBy: ''
// });

// food_3.save(err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(`${Date.now()} Food 3 generated`);
//     }
// });

// const food_4 = new foodSchema({
//     name: 'Gà chiên thui',
//     price: 50000,
//     priceSale: 0,
//     image: 'ga-chien-thui.png',
//     idCategory: '5b292246fcfe701914db58ed',
//     createdDate: Date.now(),
//     createdBy: 'admin',
//     modifiedDate: null,
//     modifiedBy: ''
// });

// food_4.save(err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(`${Date.now()} Food 4 generated`);
//     }
// });

// const food_5 = new foodSchema({
//     name: 'Gỏi gà chặt',
//     price: 110000,
//     priceSale: 0,
//     image: 'goi-ga-chat.png',
//     idCategory: '5b292246fcfe701914db58ed',
//     createdDate: Date.now(),
//     createdBy: 'admin',
//     modifiedDate: null,
//     modifiedBy: ''
// });

// food_5.save(err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(`${Date.now()} Food 5 generated`);
//     }
// });

// const food_6 = new foodSchema({
//     name: 'Bò kho',
//     price: 170000,
//     priceSale: 0,
//     image: 'bo-kho.png',
//     idCategory: '5b292246fcfe701914db58ee',
//     createdDate: Date.now(),
//     createdBy: 'admin',
//     modifiedDate: null,
//     modifiedBy: ''
// });

// food_6.save(err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(`${Date.now()} Food 6 generated`);
//     }
// });

// const food_7 = new foodSchema({
//     name: 'Bò lúc lắc',
//     price: 160000,
//     priceSale: 0,
//     image: 'bo-luc-lac.png',
//     idCategory: '5b292246fcfe701914db58ee',
//     createdDate: Date.now(),
//     createdBy: 'admin',
//     modifiedDate: null,
//     modifiedBy: ''
// });

// food_7.save(err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(`${Date.now()} Food 7 generated`);
//     }
// });

// const food_8 = new foodSchema({
//     name: 'Bò tái canh chua',
//     price: 150000,
//     priceSale: 0,
//     image: 'bo-tai-canh-chua.png',
//     idCategory: '5b292246fcfe701914db58ee',
//     createdDate: Date.now(),
//     createdBy: 'admin',
//     modifiedDate: null,
//     modifiedBy: ''
// });

// food_8.save(err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(`${Date.now()} Food 8 generated`);
//     }
// });

// const food_9 = new foodSchema({
//     name: 'Bò xào cải',
//     price: 120000,
//     priceSale: 0,
//     image: 'bo-xao-cai.png',
//     idCategory: '5b292246fcfe701914db58ee',
//     createdDate: Date.now(),
//     createdBy: 'admin',
//     modifiedDate: null,
//     modifiedBy: ''
// });

// food_9.save(err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(`${Date.now()} Food 9 generated`);
//     }
// });

// const food_10 = new foodSchema({
//     name: 'Lẩu đuôi bò',
//     price: 200000,
//     priceSale: 0,
//     image: 'lau-duoi-bo.png',
//     idCategory: '5b292246fcfe701914db58ee',
//     createdDate: Date.now(),
//     createdBy: 'admin',
//     modifiedDate: null,
//     modifiedBy: ''
// });

// food_10.save(err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(`${Date.now()} Food 10 generated`);
//     }
// });