const accountSchema = require('../../models/account/account');

function logIn(username, password) {
    return new Promise((resolve, reject) => {
        accountSchema.find({'username': username, 'password': password}).then(res => {
            resolve({
                res: res
            });
        }).catch(err => resolve({err: err}));
    })
}

function checkAccountExsist(username) {
    return new Promise((resolve, reject) => {
        accountSchema.find({'username': username}).then(res => {
            resolve({
                res: res
            });
        }).catch(err => resolve({err: err}));
    });
}

function changePassword(username, passwordNew) {
    return new Promise((resolve, reject) => {
        accountSchema.update({'username': username}, {'password': passwordNew}).exec((err, res) => {
            if(err) {
                resolve({
                    err: err
                });
            } else {
                resolve({
                    res: res
                });
            }
        });
    });
}

function checkAccount(username, password) {
    return new Promise((resolve, reject) => {
        accountSchema.find({'username': username, 'password': password}).then(res => {
            resolve({res: res});
        }).catch(err => resolve({err: err}));
    });
}

module.exports = {
    logIn: logIn,
    checkAccountExsist: checkAccountExsist,
    changePassword: changePassword,
    checkAccount: checkAccount
}