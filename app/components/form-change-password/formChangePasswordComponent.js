import React from 'react';

import accountConstants from '../../constant/account';

import accountManipulation from '../../manipulations/account';

class FormChangePassword extends React.Component {
    changePassword = e => {
        e.preventDefault();
        const message = $('p.message-change-password');
        $(message).text('');
        const username = sessionStorage.getItem(accountConstants.SESSION_USERNAME);
        const passwordOld = $(e.target).children('input[name="password-old"]').val();
        const passwordNew = $(e.target).children('input[name="password-new"]').val();
        const rePasswordNew = $(e.target).children('input[name="re-password-new"]').val();
        if(username === '') {
            window.location.href = '/login';
            return;
        }
        if(passwordOld === '') {
            $(message).text('Chưa nhập mật khẩu cũ');
            $(e.target).children('input[name="password-old"]').focus();
            return;
        }
        if(passwordNew === '') {
            $(message).text('Chưa nhập mật khẩu mới');
            $(e.target).children('input[name="password-new"]').focus();
            return;
        }
        if(passwordNew !== rePasswordNew) {
            $(message).text('Mật khẩu mới nhập lại không trùng');
            $(e.target).children('input[name="re-password-new"]').focus();
            return;
        }
        accountManipulation.checkAccount(username, passwordOld).then(result => {
            if(result) {
                accountManipulation.changePassword(username, passwordNew).then(resultChangePassword => {
                    if(resultChangePassword) {
                        $(message).text('Thay đổi mật khẩu thành công');
                        $(e.target).children('input[name="password-old"]').val('');
                        $(e.target).children('input[name="password-new"]').val('');
                        $(e.target).children('input[name="re-password-new"]').val('');
                    } else {
                        $(message).text('Thay đổi mật khẩu thất bại');
                    }
                    $(e.target).children('input[name="password-old"]').focus();
                });
            } else {
                $(message).text('Mật khẩu cũ không đúng');
                $(e.target).children('input[name="password-old"]').focus();
            }
        });
    }

    render() {
        return (
            <div className="wr-container-change-password">
                <div className="wr-change-password">
                <h3>Đổi mật khẩu</h3>
                <a href="#" className="close-container-change-password">
                    <i className="fa fa-times" aria-hidden="true" />
                </a>
                <form onSubmit={this.changePassword}>
                    <p className="password-old">Mật khẩu cũ</p>
                    <input type="password" autoFocus name="password-old" />
                    <p className="password-new">Mật khẩu mới</p>
                    <input type="password" name="password-new" />
                    <p className="re-password-new">Nhập lại mật khẩu mới</p>
                    <input type="password" name="re-password-new" />
                    <input type="submit" className="change-password" value="Đổi mật khẩu" />
                </form>
                <p className="message-change-password"></p>
                </div>
            </div>
        );
    }
}

export default FormChangePassword;