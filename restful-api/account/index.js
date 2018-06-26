const express = require('express');

const router = express.Router();

const { logIn, checkAccountExsist, changePassword, checkAccount } = require('../../db/manipulations/account/account');

router.get('/check-account-exsist/:username', (req, res) => {
    res.status(200);
    const username = req.params.username;
    checkAccountExsist(username).then(result => {
        let response = {
            status: 0,
            res: null,
            message: ''
        }
        if(result.err) {
            response.status = 400;
            response.message = 'Lỗi server, xin vui lòng thử lại';
        } else {
            response.status = 200;
            response.res = result.res;
            response.message = 'Kiểm tra thành công';
        }
        res.json(response);
    })
});

router.post('/login-account', (req, res) => {
    res.status(200);
    const username = req.body.username;
    const password = req.body.password;
    logIn(username, password).then(result => {
        let response = {
            status: 0,
            res: null,
            message: ''
        }
        if(result.err) {
            response.status = 400;
            response.message = 'Lỗi server, xin vui lòng thử lại';
        } else {
            response.status = 200;
            response.res = result.res;
            response.message = 'Kiểm tra thành công';
        }
        res.json(response);
    });
});

router.post('/check-account', (req, res) => {
    res.status(200);
    const username = req.body.username;
    const password = req.body.password;
    checkAccount(username, password).then(result => {
        let response = {
            status: 0,
            res: null,
            message: ''
        }
        if(result.err) {
            response.status = 400;
            response.message = 'Lỗi server, xin vui lòng thử lại';
        } else {
            response.status = 200;
            response.res = result.res;
            response.message = 'Kiểm tra thành công';
        }
        res.json(response);
    });
});

router.put('/change-password-account', (req, res) => {
    res.status(200);
    const username = req.body.username;
    const passwordNew = req.body.passwordNew;
    changePassword(username, passwordNew).then(result => {
        let response = {
            status: 0,
            res: null,
            message: ''
        }
        if(result.err) {
            response.status = 400;
            response.message = 'Lỗi server, xin vui lòng thử lại';
        } else {
            response.status = 200;
            response.res = result.res;
            response.message = 'Sửa thành công';
        }
        res.json(response);
    });
});

module.exports = router;