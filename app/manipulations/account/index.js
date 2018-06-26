import constantAccount from '../../constant/account';

function checkAccountExsist(username) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${constantAccount.CHECK_ACCOUNT_EXSIST}/${username}`,
            type: 'GET',
            dataType: 'json',
            success: result => {
                if(result.status === 200 && result.res && result.res !== null && result.res[0]) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            },
        }).catch(err => resolve(false));
    });
}

function checkLogin() {
    return new Promise((resolve, reject) => {
        const username = sessionStorage.getItem(constantAccount.SESSION_USERNAME);
        if(username) {
            checkAccountExsist(username).then(result => {
                resolve(result);
            })
        } else {
            resolve(false);
        }
    });
}

function getUsername() {
    const username = sessionStorage.getItem(constantAccount.SESSION_USERNAME);
    if(username) {
        return username;
    } else {
        return '';
    }
}

function logIn(username, password) {
    let res = {
        username: null
    }    
    return new Promise((resolve, reject) => {
        $.ajax({
            url: constantAccount.LOGIN_ACCOUNT,
            type: 'POST',
            dataType: 'json',
            data: {
                username: username,
                password: password
            },
            success: result => {
                if(result.status === 200 && result.res && result.res !== null && result.res[0]) {
                    res.username = result.res[0].username;
                }
                resolve(res);
            }
        }).catch(err => resolve(res));
    });
}

function logOut() {
    const username = sessionStorage.getItem(constantAccount.SESSION_USERNAME);
    if(username) {
        sessionStorage.removeItem(constantAccount.SESSION_USERNAME);
        window.location.href = '/login';
    }
}

function checkAccount(username, password) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: constantAccount.CHECK_ACCOUNT,
            type: 'POST',
            dataType: 'json',
            data: {
                username: username,
                password: password
            },
            success: result => {
                if(result.status === 200 && result.res && result.res !== null && result.res[0]) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        }).catch(err => resolve(false));
    });
}

function changePassword(username, passwordNew) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: constantAccount.CHANGE_PASSWORD_ACCOUNT,
            type: 'PUT',
            dataType: 'json',
            data: {
                username: username,
                passwordNew: passwordNew
            },
            success: result => {
                if(result.status === 200 && result.res && result.res !== null && result.res.nModified === 1 && result.res.ok === 1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        }).catch(err => resolve(false));
    });
}

export default {
    checkAccountExsist: checkAccountExsist,
    checkLogin: checkLogin,
    getUsername: getUsername,
    logIn: logIn,
    logOut: logOut,
    checkAccount: checkAccount,
    changePassword: changePassword
}