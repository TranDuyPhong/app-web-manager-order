import React from 'react';

import { connect } from 'react-redux';

import '../../../assets/scss/revenue.scss';
import revenuesJQuery from '../../../assets/js/revenues';

import FormChangePassword from '../../form-change-password/formChangePasswordComponent';
import Header from '../header/headerComponent';
import Footer from '../footer/footerComponent'

import actionRevenue from '../../../redux/actions/revenue';

class BillComponent extends React.Component {
    componentDidMount() {
        revenuesJQuery.init();
        this.props.getAllRevenues(this.props.fromDate, this.props.toDate);
    }

    componentWillUnmount() {
        this.props.resetRevenue();
    }

    changeFromDate = e => {
        console.log(e.target.value);
        console.log(this.props.toDate);
        if(e.target.value === '' || this.props.toDate === '') {
            this.props.getAllRevenues(e.target.value, this.props.toDate);
        } else {
            this.props.getAllRevenueByFilterDates(e.target.value, this.props.toDate);
        }
    }

    changeToDate = e => {
        if(e.target.value === '' || this.props.fromDate === '') {
            this.props.getAllRevenues(this.props.fromDate, e.target.value);
        } else {
            this.props.getAllRevenueByFilterDates(this.props.fromDate, e.target.value);
        }
    }

    render() {  
        return (
            <div className="wr">
                <FormChangePassword />
                <Header />
                <section className="wr-main">
                    <div className="wr-filter-revenue">
                        <p>Ngày bắt đầu</p>
                        <input onChange={this.changeFromDate} type="date" />
                        <p>Ngày kết thúc</p>
                        <input onChange={this.changeToDate} type="date" />
                    </div>
                    <div className="wr-list-revenue">
                        <ul className="wr-list-revenue-header">
                            <li>
                                <span>Ngày</span>
                            </li>
                            <li>
                                <span>Doanh thu</span>
                            </li>
                            <li>
                                <span>Ngày tạo</span>
                            </li>
                            <li>
                                <span>Người tạo</span>
                            </li>
                            <li>
                                <span>Ngày sửa</span>
                            </li>
                            <li>
                                <span>Người sửa</span>
                            </li>
                        </ul>
                        <ul className="wr-list-revenue-content">
                            {
                                this.props.revenues.map((item, index) => {
                                    return (
                                        <li key={item._id}>
                                            <span>{item.revenueDate}</span>
                                            <span>{item.total.toFixed(2)} vnđ</span>
                                            <span>{item.createdDate}</span>
                                            <span>{item.createdBy}</span>
                                            <span>{(item.modifiedDate !== '' && item.modifiedDate !== null) ? item.modifiedDate : 'Không có'}</span>
                                            <span>{(item.modifiedBy !== '' && item.modifiedBy !== null) ? item.modifiedBy : 'Không có'}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </section>
                <Footer>
                    <p>
                        <span>Tổng doanh thu: </span>
                        <span>{this.props.sumTotal.toFixed(2)} vnđ</span>
                    </p>
                    <p>
                        <span>Tổng doanh thu hôm nay: </span>
                        <span>{this.props.totalPriceToday.toFixed(2)} vnđ</span>
                    </p>
                    <p>
                        <span>Tổng doanh thu tháng này: </span>
                        <span>{this.props.sumTotalMonth.toFixed(2)} vnđ</span>
                    </p>
                </Footer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        revenues: state.revenue.data,
        fromDate: state.revenue.fromDate,
        toDate: state.revenue.toDate,
        totalPriceToday: state.revenue.totalPriceToday,
        sumTotal: state.revenue.sumTotal,
        sumTotalMonth: state.revenue.sumTotalMonth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllRevenues: (fromDate, toDate) => dispatch(actionRevenue.getAllRevenues(fromDate, toDate)),
        resetRevenue: () => dispatch(actionRevenue.resetRevenue()),
        getAllRevenueByFilterDates: (fromDate, toDate) => dispatch(actionRevenue.getAllRevenueByFilterDates(fromDate, toDate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillComponent);