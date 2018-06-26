const accountSchema = require('../../models/account/account');

const account_1 = new accountSchema({
    username: 'admin',
    password: 'admin',
    createdDate: Date.now(),
    createdBy: 'admin',
    modifiedDate: null,
    modifiedBy: ''
});

account_1.save(err => {
    if(err) {
        console.log(err);
    } else {
        console.log(`${Date.now()} Account 1 generated`);
    }
});