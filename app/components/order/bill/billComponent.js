import React from 'react';

import { connect } from 'react-redux';

import '../../../assets/scss/bill.scss';
import billsJQuery from '../../../assets/js/bill';

import FormChangePassword from '../../form-change-password/formChangePasswordComponent';
import Header from '../header/headerComponent';
import Footer from '../footer/footerComponent'

import actionBill from '../../../redux/actions/bill';

class Bill extends React.Component {
    componentDidMount() {
        billsJQuery.init();
        this.props.getAllBills(this.props.fromDate, this.props.toDate, this.props.state);
    }

    changeState = e => {
        const state = e.target.value;
        if(this.props.fromDate === '' || this.props.toDate === '') {
            this.props.getAllBills(this.props.fromDate, this.props.toDate, state);
        } else {
            this.props.getAllBillByFilters(this.props.fromDate, this.props.toDate, state);
        }
    }

    choseFromDate = e => {
        const fromDate = e.target.value;
        if(e.target.value === '' || this.props.toDate === '' ) {
            this.props.getAllBills(fromDate, this.props.toDate, this.props.state);
        } else {
            this.props.getAllBillByFilters(fromDate, this.props.toDate, this.props.state);
        }
    }

    choseToDate = e => {
        const toDate = e.target.value;
        if(e.target.value === '' || this.props.fromDate === '' ) {
            this.props.getAllBills(this.props.fromDate, toDate, this.props.state);
        } else {
            this.props.getAllBillByFilters(this.props.fromDate, toDate, this.props.state);
        }
    }

    render() {
        return (
            <div className="wr">
                <FormChangePassword />
                <Header />
                <section className="wr-main">
                <div className="wr-filter-bill">
                        <p>Ngày bắt đầu</p>
                        <input onChange={this.choseFromDate} type="date" />
                        <p>Ngày kết thúc</p>
                        <input onChange={this.choseToDate} type="date" />
                        <p>Trạng thái hóa đơn</p>
                        <select onChange={this.changeState}>
                            <option value=''>Tất cả</option>
                            <option value={false}>Chưa thanh toán</option>
                            <option value={true}>Đã thanh toán</option>
                        </select>
                    </div>
                    <div className="wr-list-bill">
                        <ul className="wr-list-bill-header">
                            <li>
                                <span>Thời gian vào</span>
                            </li>
                            <li>
                                <span>Thời gian ra</span>
                            </li>
                            <li>
                                <span>Trạng thái</span>
                            </li>
                            <li>
                                <span>Tổng tiền</span>
                            </li>
                            <li>
                                <span>Thời gian tạo hóa đơn</span>
                            </li>
                            <li>
                                <span>Người tạo hóa đơn</span>
                            </li>
                            <li>
                                <span>Thời gian sửa hóa đơn</span>
                            </li>
                            <li>
                                <span>Người sửa hóa đơn</span>
                            </li>
                        </ul>
                        <ul className="wr-list-bill-content">
                            {
                                this.props.bills.map((item, index) => {
                                    return (
                                        <li key={item._id}>
                                            <span>{item.timeCheckIn}</span>
                                            <span>{(item.timeCheckOut === null) ? 'Chưa có' : item.timeCheckOut}</span>
                                            <span>{(item.status ? 'Đã thanh toán' : 'Chưa thanh toán')}</span>
                                            <span>{item.totalPrice.toFixed(2)} vnđ</span>
                                            <span>{item.createdDate}</span>
                                            <span>{item.createdBy}</span>
                                            <span>{(item.modifiedDate === null || item.modifiedDate === '') ? 'Không có' : item.modifiedDate}</span>
                                            <span>{(item.modifiedBy === null || item.modifiedBy === '') ? 'Không có' : item.modifiedBy}</span>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </section>
                <Footer>
                    <p>
                        <span>Tổng hóa đơn: </span>
                        <span>{this.props.count}</span>
                    </p>
                    <p>
                        <span>Tổng hóa đơn chưa thanh toán: </span>
                        <span>{this.props.countFalse}</span>
                    </p>
                    <p>
                        <span>Tổng hóa đơn đã thanh toán: </span>
                        <span>{this.props.countTrue}</span>
                    </p>
                </Footer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        bills: state.bill.data,
        count: state.bill.count,
        countFalse: state.bill.countFalse,
        countTrue: state.bill.countTrue,
        fromDate: state.bill.fromDate,
        toDate: state.bill.toDate,
        state: state.bill.state
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllBills: (fromDate, toDate, state) => dispatch(actionBill.getAllBills(fromDate, toDate, state)),
        getAllBillByFilters: (fromDate, toDate, state) => dispatch(actionBill.getAllBillByFilters(fromDate, toDate, state))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Bill);