import React from 'react';
import { connect } from 'react-redux';

import '../../../assets/scss/index.scss';
import indexJquery from '../../../assets/js/index.js';
import trash from '../../../assets/imgs/icons/trash.png';
import iconRemove from '../../../assets/imgs/icons/remove.png';
import iconAdd from '../../../assets/imgs/icons/add.png';
import iconSub from '../../../assets/imgs/icons/sub.png';

import FormChangePassword from '../../form-change-password/formChangePasswordComponent';
import Header from '../header/headerComponent';
import Footer from '../footer/footerComponent'
import FormOrderTable from '../../form-order-table/form-order-table';

import actionTable from '../../../redux/actions/table';
import actionFood from '../../../redux/actions/food';

import manipulationAccount from '../../../manipulations/account';
import FormOrder from '../../form-order/form-order';

import io from 'socket.io-client';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.tableName = 'Chưa chọn bàn';
        this.status = 'Không xác định';
        this.idBill = '';
        this.billInfos = null;
        this.countFood = 0;
        this.totalPrice = 0;
        this.userOrderName = 'Hiện không có ai';
        this.phoneOrder = 'Hiện không có số';
        this.timeOrder = 'Hiện không có giờ đặt';
        this.timeComeIn = 'Hiện không có giờ đến'
        this.idTable = '';
        this.countTableHavePeople = 0;
        this.countTableEmpty = 0;
        this.countTableOrdered = 0;
        this.state = {
            flagFormOrder: false
        }
        this.socket = io('http://192.168.1.211:3000/');
        this.emitUpdateTable = this.emitUpdateTable.bind(this);
    }

    emitUpdateTable = () => {
        this.socket.emit('update-table', true);
    }

    componentDidMount() {
        this.props.getAllTables();
        indexJquery.init();
    }

    componentWillUnmount() {
        this.props.resetTables();
    }

    choseTable = e => {
        const table = $(e.target).closest('div.table');
        const idTable = $(table).closest('div.table').data('idtable');
        const tableName = $(table).closest('div.table').data('tablename');
        const status = $(table).closest('div.table').data('status');
        this.props.getInfoTableByTable(idTable);
        this.tableName = tableName;
        this.idTable = idTable;
        switch(status) {
            case 1:
                this.status = 'Có người';
                break;
            case 2:
                this.status = 'Đã đặt';
                break;
            default:
                this.status = 'Trống';
                break;
        }
    }

    componentWillUnmount() {
        this.props.resetFood();
        this.props.resetTables();
    }

    componentWillReceiveProps(nextProps) {
        const tableOld = this.props.tables.find(p => p._id === this.idTable);
        const tableNew = nextProps.tables.find(p => p._id === this.idTable);
        if(tableOld !== undefined && tableNew !== undefined) {
            if(tableOld.status !== tableNew.status) {
                this.tableName = 'Chưa chọn bàn';
                this.status = 'Không xác định';
                this.idTable = '';
            }
        }
        this.countTableEmpty = nextProps.tables.filter(p => p.status === 0).length;
        this.countTableHavePeople = nextProps.tables.filter(p => p.status === 1).length;
        this.countTableOrdered = nextProps.tables.filter(p => p.status === 2).length;
    }

    payment = e => {
        e.preventDefault();
        if(this.props.bill.billInfos) {
            const messagePayment = `Bạn có chắc chắn muốn thanh toán tiền cho bàn ${this.tableName}` + "\n" +
                                   `Tổng tiền: ${this.totalPrice} vnđ không ?` + "\n" +
                                   `Ô bên dưới để nhập tiền trừ cho hóa đơn thanh toán như khuyến mãi, khách hàng vip...`;
            const resultQuestionPayment = prompt(messagePayment, '0');
            if(resultQuestionPayment !== null) {
                this.props.payment((new Date()).toLocaleDateString(),
                this.props.bill.totalPrice, manipulationAccount.getUsername(), this.props.bill._id, this.emitUpdateTable);
            }
        } else {
            if(this.tableName === 'Chưa chọn bàn') {
                alert('Bạn chưa chọn bàn cần thanh toán');
            } else {
                alert('Bàn hiện tại không có hóa đơn để thanh toán');
            }
        }
    }

    removeBill = e => {
        e.preventDefault();
        if(this.props.bill.billInfos) {
            if(confirm('Bạn chắc chắn muốn hủy hóa đơn bàn này chứ ?')) {
                this.props.removeBill(this.props.bill._id, this.emitUpdateTable);
            }
        } else {
            if(this.tableName === 'Chưa chọn bàn') {
                alert('Bạn chưa chọn bàn cần hủy hóa đơn');
            } else {
                alert('Bàn hiện tại không có hóa đơn để hủy');
            }
        }
    }

    orderTable = e => {
        e.preventDefault();
        if(this.tableName === 'Chưa chọn bàn' || this.idTable === '') {
            alert('Bạn chưa chọn bàn cần đặt');
        } else {
            if(this.props.userOrder.name) {
                alert('Bàn này hiện đã có người đặt, xin vui lòng đặt bàn khác');
            } else if (this.props.bill.billInfos) {
                alert('Bàn này hiện đang có người dùng, xin vui lòng đặt bàn khác');
            } else {
                $('div.wr-container-order-table').addClass('toggle-show-form-order-table');
                let focusInputTimeout = setTimeout(() => {
                    $('input[name="order-name"]').focus();
                    clearTimeout(focusInputTimeout);
                }, 100);
            }
        }
    }

    order = e => {
        e.preventDefault();
        if(this.tableName === 'Chưa chọn bàn' || this.idTable === '') {
            alert('Bạn chưa chọn bàn cần order món');
        } else if (this.props.userOrder.name) {
            alert('Bàn này đang được đặt, xin vui lòng chuyển trạng thái bàn này thành trống, sau đó tiến hành order món');
        } else {
            this.setState({
                flagFormOrder: true
            });
            $('div.wr-container-order').addClass('toggle-show-order');
            let focusInputTimeout = setTimeout(() => {
                $('input[name="search"]').focus();
                clearTimeout(focusInputTimeout);
            }, 100);
        }
    }

    removeOrderTable = e => {
        e.preventDefault();
        if(this.props.userOrder.name) {
            if(confirm('Bạn chắc chắn muốn hủy đặt bàn này chứ ?')) {
                this.props.removeOrderTable(this.props.userOrder._id, this.emitUpdateTable);
            }
        } else {
            if(this.tableName === 'Chưa chọn bàn') {
                alert('Bạn chưa chọn bàn cần hủy đặt');
            } else {
                alert('Bàn hiện tại không có khách hàng nào đặt');
            }
        }
    }

    closeFormOrder = () => {
        this.setState({
            flagFormOrder: false
        });
    }

    increment = e => {
        e.preventDefault();
        const idFood = $(e.target).closest('li').data('idfood');
        if(idFood !== null && idFood !== undefined && idFood !== '' && this.idBill !== null && this.idBill !== undefined && this.idBill !== '') {
            this.props.incrementCountFood(this.idBill, idFood, manipulationAccount.getUsername());
        }
    }

    decrement = e => {
        e.preventDefault();
        const idFood = $(e.target).closest('li').data('idfood');
        if(idFood !== null && idFood !== undefined && idFood !== '' && this.idBill !== null && this.idBill !== undefined && this.idBill !== '') {
            this.props.decrementCountFood(this.idBill, idFood, manipulationAccount.getUsername());
        }
    }

    removeFood = e => {
        e.preventDefault();
        const idFood = $(e.target).closest('li').data('idfood');
        if(idFood !== null && idFood !== undefined && idFood !== '' && this.idBill !== null && this.idBill !== undefined && this.idBill !== '') {
            this.props.removeFood(this.idBill, idFood, manipulationAccount.getUsername());
        }
    }

    removeAllFood = e => {
        e.preventDefault();
        if(this.idBill !== null && this.idBill !== undefined && this.idBill !== '') {
            this.props.removeAllFood(this.idBill, manipulationAccount.getUsername());
        }
    }

    sendSMSUserOrderTable = (orderName, phoneOrder, cmndOrder, timeComeIn) => {
        // const message = `Anh / chị ( ${orderName} ) với số điện thoại ( ${phoneOrder} ) và cmnd ( ${cmndOrder} ) đã đặt thành công bàn ( ${this.tableName} ) của nhà hàng chúng tôi
        //                 .Thời gian đặt ${(new Date()).toUTCString()}. Thời gian đến ${timeComeIn}
        //                 .Anh / chị vui lòng đến đúng giờ. Chân thành cảm ơn anh / chị.`;
        // this.socket.emit('send-sms-user-order-table', message);        
    }

    render() {
        if(this.props.userOrder.name && this.props.userOrder.phone && this.props.userOrder.timeOrder) {
            this.userOrderName = this.props.userOrder.name;
            this.phoneOrder = this.props.userOrder.phone;
            let timeFormat = new Date(this.props.userOrder.timeOrder);
            this.timeOrder = timeFormat.toUTCString();
            timeFormat = new Date(this.props.userOrder.timeComeIn);
            this.timeComeIn = timeFormat.toUTCString();
        } else {
            this.userOrderName = 'Hiện không có ai';
            this.phoneOrder = 'Hiện không có số';
            this.timeOrder = 'Hiện không có giờ đặt';
            this.timeComeIn = 'Hiện không có giờ đến'
        }
        if(this.props.bill.billInfos) {
            this.billInfos = this.props.bill.billInfos.map((item, index) => {
                return (
                    <li data-idfood={item.id} key={item.id}>
                        <p>{item.name}</p>
                        <p>{parseInt(item.price).toFixed(2)} vnđ</p>
                        <p>{item.priceSale == 0 ? 'Không sale' : `${parseInt(item.priceSale).toFixed(2)} vnđ`}</p>
                        <p>
                            <span>{item.count}</span>
                            <a onClick={this.increment} className="increment" href="#">
                                <img src={iconAdd} alt="Remove" />
                            </a>
                            <a onClick={this.decrement} className="decrement" href="#">
                                <img src={iconSub} alt="Remove" />
                            </a>
                        </p>
                        <p>{parseInt(item.total).toFixed(2)} vnđ</p>
                        <p>
                            <a onClick={this.removeFood} href="#">
                                <img src={iconRemove} alt="Remove" />
                            </a>
                        </p>
                    </li>
                )
            });
            this.idBill = this.props.bill._id;
            this.countFood = this.props.bill.billInfos.length;
            this.totalPrice = this.props.bill.totalPrice.toFixed(2);
        } else {
            this.idBill = '';
            this.billInfos = null;
            this.countFood = 0;
            this.totalPrice = 0;
        }
        return (
            <div className="wr">
                <FormOrder emitUpdateTable={this.emitUpdateTable} closeFormOrder={this.closeFormOrder} flagFormOrder={this.state.flagFormOrder} idTable={this.idTable} tableName={this.tableName} idBill={this.idBill} />
                <FormOrderTable sendSMSUserOrderTable={this.sendSMSUserOrderTable} emitUpdateTable={this.emitUpdateTable} idTable={this.idTable} />
                <FormChangePassword />
                <Header />
                <section className="wr-main">
                    <div className="wr-table">
                        {
                            this.props.tables.map((item, index) => {
                                let classActive = '';
                                if(item.status === 1) {
                                    classActive = 'table-active';
                                } else if (item.status === 2) {
                                    classActive = 'table-wait';
                                }
                                return (
                                    <div onClick={this.choseTable} data-status={item.status} data-tablename={item.name} data-idtable={item._id} key={item._id} className={`table ${classActive}`}>
                                        <p>{item.name}</p>
                                        <p className="countPeople">{`${item.countPeople}/${item.countTable}`} người</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="wr-manipulation-table">
                        <div className="wr-list-food">
                            <p className="title">Thông tin đặt món</p>
                            <ul>
                                <li>
                                    <span>Tên món</span>
                                </li>
                                <li>
                                    <span>Giá</span>
                                </li>
                                <li>
                                    <span>Giá sale</span>
                                </li>
                                <li>
                                    <span>Số lượng</span>
                                </li>
                                <li>
                                    <span>Thành tiền</span>
                                </li>
                                <li>
                                    <span>Xóa</span>
                                </li>
                            </ul>
                            <div className="wr-list">
                                <ul>
                                    {this.billInfos}
                                </ul>
                            </div>
                            <div className="wr-info-food">
                                <p>Tổng số món: <span>{this.countFood}</span></p>
                                <p>Tổng tiền: <span>{this.totalPrice} vnđ</span></p>
                            </div>
                            <div className="wr-trash">    
                                <button onClick={this.removeAllFood} className="remove-food-all">
                                    <img src={trash} alt="Thùng rác" />
                                </button>
                            </div>
                        </div>
                        <div className="wr-info-order">
                            <p className="title">Thông tin bàn</p>
                            <h3 className="table-name">{this.tableName}</h3>
                            <ul>
                                <li>
                                    <p>Tình trạng: <span>{this.status}</span></p>
                                </li>
                                <li>
                                    <p>Giờ đặt: <span>{this.timeOrder}</span></p>
                                </li>
                                <li>
                                    <p>Giờ đến: <span>{this.timeComeIn}</span></p>
                                </li>
                                <li>
                                    <p>Người đặt: <span>{this.userOrderName}</span></p>
                                </li>
                                <li>
                                    <p>Số điện thoại người đặt: <span>{this.phoneOrder}</span></p>
                                </li>
                            </ul>
                            <div className="wr-manipulation-order">
                                <a onClick={this.payment} className="payment" href="#">
                                    <i className="fa fa-money" aria-hidden="true" />
                                    <span>Thanh toán</span>
                                </a>
                                <a onClick={this.order} className="order" href="#">
                                    <i className="fa fa-book" aria-hidden="true" />
                                    <span>Order</span>
                                </a>
                                <a onClick={this.orderTable} className="order-table" href="#">
                                    <i className="fa fa-table" aria-hidden="true" />
                                    <span>Đặt bàn</span>
                                </a>
                                <a onClick={this.removeBill} className="remove-bill" href="#">
                                    <i className="fa fa-times" aria-hidden="true" />
                                    <span>Hủy hóa đơn</span>
                                </a>
                                <a onClick={this.removeOrderTable} className="remove-order-table" href="#">
                                    <i className="fa fa-times" aria-hidden="true" />
                                    <span>Hủy đặt bàn</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>   
                <Footer>
                    <p>
                        <span>Tổng số bàn hiện đang có người: </span>
                        <span>{this.countTableHavePeople}</span>
                    </p>
                    <p>
                        <span>Tổng số bàn trống: </span>
                        <span>{this.countTableEmpty}</span>
                    </p>
                    <p>
                        <span>Tổng số bàn đang đặt: </span>
                        <span>{this.countTableOrdered}</span>
                    </p>
                </Footer>
            </div>    
        );
    }
}

const mapStateToProps = state => {
    return {
        tables: state.table.data,
        bill: state.table.dataBill,
        userOrder: state.table.dataUserOrder
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAllTables: () => dispatch(actionTable.getAllTables()),
        resetTables: () => dispatch(actionTable.resetTables()),
        getInfoTableByTable: idTable => dispatch(actionTable.getInfoTableByTable(idTable)),
        payment: (day, money, createdBy, idTable, idBill, callbackEmit) => dispatch(actionTable.payment(day, money, createdBy, idTable, idBill, callbackEmit)),
        removeBill: (idBill, callbackEmit) => dispatch(actionTable.removeBill(idBill, callbackEmit)),
        removeOrderTable: (idUserOrder, callbackEmit) => dispatch(actionTable.removeOrderTable(idUserOrder, callbackEmit)),
        resetFood: () => dispatch(actionFood.resetFoods()),
        incrementCountFood: (idBill, idFood, modifiedBy) => dispatch(actionTable.incrementCountFood(idBill, idFood, modifiedBy)),
        decrementCountFood: (idBill, idFood, modifiedBy) => dispatch(actionTable.decrementCountFood(idBill, idFood, modifiedBy)),
        removeFood: (idBill, idFood, modifiedBy) => dispatch(actionTable.removeFood(idBill, idFood, modifiedBy)),
        removeAllFood: (idBill, modifiedBy) => dispatch(actionTable.removAllFood(idBill, modifiedBy))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);