const revenueSchema = require('../../models/revenue/revenue');

const revenue_1 = new revenueSchema({
    total: 50000,
    revenueDate: '19/06/2018',
    createdDate: Date.now(),
    createdBy: 'admin',
    modifiedDate: null,
    modifiedBy: ''
});

revenue_1.save(err => {
    if(err) {
        console.log(err);
    } else {
        console.log(`${Date.now()} Revenue 1 generated`);
    }
});
