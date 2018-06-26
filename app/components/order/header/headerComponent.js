import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/imgs/logo/logo.png';

import accountManipulation from '../../../manipulations/account';

class Header extends React.Component {
    logOut = e => {
        e.preventDefault();
        accountManipulation.logOut();
    }

    render() {
        return (
            <header className="wr-header">
                <div className="wr-content-header wr-logo-app">
                    <h3>
                        <img src={logo} alt="Logo App" />
                        <span>ORDER</span>
                    </h3>
                </div>
                <div className="wr-content-header wr-menu">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/app/order/table">
                                    <i className="fa fa-book" aria-hidden="true" />
                                    <span>Màn hình đặt món</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/app/order/food">
                                    <i className="fa fa-list" aria-hidden="true" />
                                    <span>Danh sách món</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/app/order/revenue">
                                    <i className="fa fa-list-alt" aria-hidden="true" />
                                    <span>Doanh thu</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/app/order/bill">
                                    <i className="fa fa-list-alt" aria-hidden="true" />
                                    <span>Danh sách hóa đơn</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="wr-content-header wr-account">
                    <button className="account">
                        <i className="fa fa-user-circle-o" aria-hidden="true" />
                        <ul>
                            <li>
                                <a className="manipulation-change-password" href="#">
                                    <i className="fa fa-key" aria-hidden="true" />
                                    <span>Đổi mật khẩu</span>
                                </a>
                            </li>
                            <li>
                                <a onClick={this.logOut} href="#">
                                    <i className="fa fa-sign-out" aria-hidden="true" />
                                    <span>Đăng xuất</span>
                                </a>
                            </li>
                        </ul>
                    </button>
                </div>
            </header>
        );
    }
}

export default Header;