const userOrderSchame = require('../../models/user-order/user-order');

const userOrder_1 = new userOrderSchame({
    name: 'Trần Duy A',
    phone: '0909777888',
    cmnd: '025667788',
    countPeople: 3,
    timeOrder: Date.now(),
    timeComeIn: new Date('2018-06-06T12:00:00Z'),
    idTable: '5b2922a72f52330d6094f216',
    createdDate: Date.now(),
    createdBy: 'admin'
});

userOrder_1.save(err => {
    if(err) {
        console.log(err);
    } else {
        console.log(`${Date.now()} User order 1 generated`);
    }
});