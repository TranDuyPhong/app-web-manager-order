import React from 'react';
import { Redirect } from 'react-router-dom';

import '../../assets/scss/login.scss';
import '../../assets/js/login.js';
import logo from '../../assets/imgs/logo/logo.png';

import accountManipulation from '../../manipulations/account';

import { CHECK_ACCOUNT_EXSIST, SESSION_USERNAME } from '../../constant/account';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.flag = true;
        this.state = {
            checkLogin: false
        }
    }

    componentDidMount() {
        accountManipulation.checkLogin().then(result => {
            if(this.flag === true) {
                this.setState({
                    checkLogin: result
                })
            }
        });
    }

    componentWillUnmount() {
        this.flag = false;
    }

    shouldComponentUpdate(props, state) {
        if(this.state.checkLogin === state.checkLogin) {
            return false;
        }
        return true;
    }

    logIn = e => {
        e.preventDefault();
        $('p.message-login').text('');
        const username = e.target.username.value;
        const password = e.target.password.value;
        if(username === '') {
            $('p.message-login').text('Chưa nhập tên tài khoản');
            $('input[name="username"]').focus();
            return;
        }
        if(password === '') {
            $('p.message-login').text('Chưa nhập mật khẩu');
            $('input[name="password"]').focus();
            return;
        }
        accountManipulation.logIn(username, password).then(result => {
            if(!result.username || result.username === '') {
                $('p.message-login').text('Sai tên tài khoản hoặc mật khẩu');
                $('input[name="username"]').focus();
            } else {
                sessionStorage.setItem(SESSION_USERNAME, result.username);
                const returnRedirect = sessionStorage.getItem('returnRedirect');
                if(returnRedirect !== null && returnRedirect !== '') {
                    sessionStorage.removeItem('returnRedirect');
                    window.location.href = returnRedirect;
                } else {
                    window.location.href = '/app';
                }
            }
        });
    }

    render() {
        const formLogin = (
            <div className="wr">
                <img className="logo-app" src={logo} alt="Logo App" />
                <h3 className="title-app">Ứng dụng quản lý đặt món nhà hàng</h3>
                <div className="wr-login">
                    <h3>Đăng nhập ứng dụng</h3>
                    <form onSubmit={this.logIn} method="POST">
                        <p className="username">Tên tài khoản</p>
                        <input name="username" type="text" autoFocus />
                        <p className="password">Mật khẩu</p>
                        <input name="password" type="password" />
                        <input type="submit" className="login" value="Đăng nhập" />
                    </form>
                    <p className="message-login"></p>
                </div>
            </div>
        );
        if(this.state.checkLogin) {
            return <Redirect to='/app/order' />
        } else {
            return formLogin;
        }
    }
}

export default Login;