const billSchema = require('../../models/bill/bill');

const bill_1 = new billSchema({
    idTable: '5b2922a72f52330d6094f215',
    timeCheckIn: Date.now(),
    timeCheckOut: null,
    status: false,
    totalPrice: 100000,
    billInfos: [
        {
            id: '5b29229c89e1e00eb845bc2d',
            name: 'Gà chiên thui',
            count: 2,
            price: 50000,
            priceSale: 0,
            total: 100000
        }
    ],
    createdDate: Date.now(),
    createdBy: 'admin',
    modifiedDate: null,
    modifiedBy: ''
});

bill_1.save(err => {
    if(err) {
        console.log(err);
    } else {
        console.log(`${Date.now()} Bill 1 generated`);
    }
});
