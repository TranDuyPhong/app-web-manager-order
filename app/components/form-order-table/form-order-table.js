import React from 'react';
import { connect } from 'react-redux';

import actionTables from '../../redux/actions/table';

import manipulationAccounts from '../../manipulations/account';

class FormOrderTable extends React.Component {
    constructor(props) {
        super(props);
    }

    orderTable = e => {
        e.preventDefault();
        const idTable = this.props.idTable;
        if(idTable && idTable !== '') {
            const inputOrderName = $(e.target).children('input[name="order-name"]');
            const inputPhoneOrder = $(e.target).children('input[name="phone-order"]');
            const inputCMNDOrder = $(e.target).children('input[name="cmnd-order"]');
            const inputCountPeopleComeIn= $(e.target).children('input[name="count-people-come-in"]');
            const inputTimeComeIn= $(e.target).children('input[name="time-come-in"]');
            const message = $('p.message-order-table');
            if(inputOrderName.val() === '') {
                $(inputOrderName).focus();
                $(message).text('Bạn chưa nhập tên người đặt');
            } else if (inputPhoneOrder.val() === '') {
                $(inputPhoneOrder).focus();
                $(message).text('Bạn chưa nhập số điện thoại người đặt');
            } else if (inputPhoneOrder.val().match(/(09|01[2|6|8|9])+([0-9]{8})\b/g) === null) {
                $(inputPhoneOrder).val('');
                $(inputPhoneOrder).focus();
                $(message).text('Số điện thoại không đúng định dạng');
            } else if (inputCMNDOrder.val() === '') {
                $(inputCMNDOrder).focus();
                $(message).text('Bạn chưa nhập số cmnd người đặt');
            } else if (inputCountPeopleComeIn.val() <= 0 || inputCountPeopleComeIn.val() === '') {
                $(inputCountPeopleComeIn).focus();
                $(message).text('Bạn chưa nhập số người đến');
            } else if (inputTimeComeIn.val() === '') {
                $(inputTimeComeIn).focus();
                $(message).text('Bạn chưa nhập thời gian đến');
            } else {
                const createdBy = manipulationAccounts.getUsername();
                const orderName = inputOrderName.val();
                const phoneOrder = inputPhoneOrder.val();
                const cmndOrder = inputCMNDOrder.val();
                const countPeopleComeIn = inputCountPeopleComeIn.val();
                let timeComeInSplit = inputTimeComeIn.val().split(':');
                let timeComeIn = new Date();
                timeComeIn.setHours(timeComeInSplit[0]);
                timeComeIn.setMinutes(timeComeInSplit[1]);
                this.props.orderTable(idTable, orderName, phoneOrder, cmndOrder, countPeopleComeIn, timeComeIn, createdBy, this.props.emitUpdateTable);
                this.props.sendSMSUserOrderTable(orderName, phoneOrder, cmndOrder, timeComeIn);
                $('a.close-container-order-table').trigger('click');
            }
        }
    }

    render() {
        return (
            <div className="wr-container-order-table">
                <div className="wr-order-table">
                    <h3>Đặt bàn</h3>
                    <a href="#" className="close-container-order-table">
                        <i className="fa fa-times" aria-hidden="true" />
                    </a>
                    <form onSubmit={this.orderTable}>
                        <p className="order-name">Tên người đặt</p>
                        <input type="text" autoFocus name="order-name" />
                        <p className="phone-order">Số điện thoại người đặt</p>
                        <input type="text" name="phone-order" />
                        <p className="cmnd-order">CMND người đặt</p>
                        <input type="text" name="cmnd-order" />
                        <p className="count-people-come-in">Số người đến</p>
                        <input type="number" name="count-people-come-in" defaultValue={1} min={1} max={4} />
                        <p className="time-come-in">Thời gian đến</p>
                        <input type="time" name="time-come-in" />
                        <input type="submit" className="order-table" value="Đặt bàn" />
                    </form>
                    <p className="message-order-table"></p>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderTable: (idTable, orderName, phoneOrder, cmndOrder, countPeopleComeIn, timeComeIn, createdBy, callbackEmit) => dispatch(actionTables.orderTable(idTable, orderName, phoneOrder, cmndOrder, countPeopleComeIn, timeComeIn, createdBy, callbackEmit)) 
    }
};

export default connect(null, mapDispatchToProps)(FormOrderTable);