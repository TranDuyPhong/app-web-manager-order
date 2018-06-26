import React from 'react';

import { connect } from 'react-redux';

import iconRemove from '../../assets/imgs/icons/remove.png';

import actionCategory from '../../redux/actions/category';
import actionFood from '../../redux/actions/food';
import actionTable from '../../redux/actions/table';
import manipulationAccounts from '../../manipulations/account';

class FormOrder extends React.Component {
    constructor(props) {
        super(props);
        this.flagRender = true;
        this.state = {
            foodOrders: [],
            totalPrice: 0
        }
    }

    filterSearch = e => {
        this.props.getAllFoodByFilters(this.props.idCategory, this.props.filterPriceFrom, this.props.filterPriceTo, this.props.filterPriceSmallFrom, this.props.filterPriceLargeFrom, e.target.value);
    }

    filterCategoies = e => {
        this.props.getAllFoodByFilters(e.target.value, this.props.filterPriceFrom, this.props.filterPriceTo, this.props.filterPriceSmallFrom, this.props.filterPriceLargeFrom, this.props.keyword);
    }

    chosePrice = e => {
        var optionSelected = $(e.target).find(":selected");
        let filterPriceFrom = $(optionSelected).data('pricefrom');
        let filterPriceTo = $(optionSelected).data('priceto');
        let filterPriceSmallFrom = $(optionSelected).data('pricesmallfrom');
        let filterPriceLargeFrom = $(optionSelected).data('pricelargefrom');
        this.props.getAllFoodByFilters(this.props.idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom, this.props.keyword);
    }

    choseFood = e => {
        let id = $(e.target).closest('div.wr-item-food-list').data('id');
        let name = $(e.target).closest('div.wr-item-food-list').data('name');
        let price = $(e.target).closest('div.wr-item-food-list').data('price');
        let image = $(e.target).closest('div.wr-item-food-list').data('image');
        let priceSale = $(e.target).closest('div.wr-item-food-list').data('pricesale');
        let foodOrderTemps = [];
        Object.assign(foodOrderTemps, this.state.foodOrders);
        let foodItem = foodOrderTemps.find(p => p.id === id);
        if(foodItem === undefined) {
            foodOrderTemps.push({
                id: id,
                name: name,
                count: 1,
                price: price,
                priceSale: priceSale,
                total: priceSale > 0 ? priceSale : price,
                image: image
            });
        } else {
            foodItem.count += 1;
            foodItem.total = foodItem.count * (foodItem.priceSale > 0 ? foodItem.priceSale : foodItem.price);
        }
        let totalPrice = 0;
        foodOrderTemps.forEach(item => {
            totalPrice += item.total;
        });
        this.setState({
            foodOrders: foodOrderTemps,
            totalPrice: totalPrice
        });
    }

    subFoodOrder = e => {
        const id = $(e.target).closest('div.wr-item-food-for-table').data('id');
        let foodOrderTemps = [];
        Object.assign(foodOrderTemps, this.state.foodOrders);
        let foodItem = foodOrderTemps.find(p => p.id === id);
        if(foodItem !== undefined) {
            if(foodItem.count > 1) {
                foodItem.count -= 1;
                foodItem.total = foodItem.count * (foodItem.priceSale > 0 ? foodItem.priceSale : foodItem.price);
            } else {
                const startRemoveIndex = foodOrderTemps.indexOf(foodItem, 0);
                foodOrderTemps.splice(startRemoveIndex, 1);
            }
            let totalPrice = 0;
            foodOrderTemps.forEach(item => {
                totalPrice += item.total;
            });
            this.setState({
                foodOrders: foodOrderTemps,
                totalPrice: totalPrice
            });
        }
    }

    removeFoodOrder = e => {
        e.preventDefault();
        const id = $(e.target).closest('div.wr-item-food-for-table').data('id');
        let foodOrderTemps = [];
        Object.assign(foodOrderTemps, this.state.foodOrders);
        let foodItem = foodOrderTemps.find(p => p.id === id);
        if(foodItem !== undefined) {
            const startRemoveIndex = foodOrderTemps.indexOf(foodItem, 0);
            foodOrderTemps.splice(startRemoveIndex, 1);
            let totalPrice = 0;
            foodOrderTemps.forEach(item => {
                totalPrice += item.total;
            });
            this.setState({
                foodOrders: foodOrderTemps,
                totalPrice: totalPrice
            });
        }
    }

    removeFoodOrderAll = e => {
        this.setState({
            foodOrders: []
        });
    }

    foodOrderAll = async () => {
        let arrayFoods = $('div.wr-item-food-list');
        let foodOrderTemps = [];
        Object.assign(foodOrderTemps, this.state.foodOrders);
        await $.each(arrayFoods, (index, item) => {
            const id = $(item).data('id');
            let foodItem = foodOrderTemps.find(p => p.id == id);
            if(foodItem === undefined) {
                let name = $(item).data('name');
                let price = $(item).data('price');
                let image = $(item).data('image');
                let priceSale = $(item).data('pricesale');
                foodOrderTemps.push({
                    id: id,
                    name: name,
                    count: 1,
                    price: price,
                    priceSale: priceSale,
                    total: priceSale > 0 ? priceSale : price,
                    image: image
                });
            } else {
                foodItem.count += 1;
                foodItem.total = foodItem.count * (foodItem.priceSale > 0 ? foodItem.priceSale : foodItem.price);
            }
        });
        let totalPrice = 0;
        foodOrderTemps.forEach(item => {
            totalPrice += item.total;
        });
        this.setState({
            foodOrders: foodOrderTemps,
            totalPrice: totalPrice
        });
    }

    resetFormOrder = () => {
        this.props.closeFormOrder();
        this.props.resetFood();
        this.setState({
            foodOrders: [],
            totalPrice: 0
        });
        this.flagRender = true;
    }

    close = e => {
        e.preventDefault();
        this.resetFormOrder();
    }

    getAllCategories = () => {
        this.props.getAllCategories();
    }

    componentDidUpdate() {
        if(this.props.flagFormOrder === true && this.flagRender === true) {
            this.getAllCategories();
            this.props.getAllFoodByFilters(this.props.idCategory, this.props.filterPriceFrom, this.props.filterPriceTo, this.props.filterPriceSmallFrom, this.props.filterPriceLargeFrom, this.props.keyword);
            this.flagRender = false;
        }
    }

    order = e => {
        e.preventDefault();
        if(this.props.idBill === null || this.props.idBill === undefined || this.props.idBill === '') {
            let countPeople = $('input[name="countPeople"]').val();
            countPeople = parseInt(countPeople);
            if(countPeople <= 0) {
                alert('Bạn chưa nhập số người của bàn này');
                $('input[name="countPeople"]').focus();
                return;
            }
            $('a.close-container-order').trigger('click');
            this.state.foodOrders.forEach((item, index) => {
                delete item.image;
            });
            this.props.orderFood(this.props.idTable, this.state.foodOrders, manipulationAccounts.getUsername(), countPeople, this.props.emitUpdateTable);
            this.resetFormOrder();
        } else {
            $('a.close-container-order').trigger('click');
            this.state.foodOrders.forEach((item, index) => {
                delete item.image;
            });
            this.props.addFoodForBill(this.props.idBill, this.state.foodOrders, manipulationAccounts.getUsername(), this.props.emitUpdateTable);
            this.resetFormOrder();
        }
    }

    render() {
        return (
            <div className="wr-container-order">
                <div className="wr-order">
                    <h3>Order - {this.props.tableName}</h3>
                    <a onClick={this.close} href="#" className="close-container-order">
                        <i className="fa fa-times" aria-hidden="true" />
                    </a>
                    <p className="countPeople">Số người</p>
                    <input name="countPeople" type="number" defaultValue={0} min={0} max={4} />
                    <p className="search">Tìm kiếm</p>
                    <input onChange={this.filterSearch} name="search" type="text" />
                    <div className="wr-filter">
                        <div className="wr-filter-categories">
                            <select onChange={this.filterCategoies} name="category">
                                <option key="all" value="all">Tất cả</option>
                                {
                                    this.props.categorys.map((item, index) => {
                                        return (
                                            <option key={item._id} value={item._id}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="wr-filter-type-food">
                            <select>
                                <option value='all'>Tất cả</option>
                                <option value='hot'>Bán chạy</option>
                            </select>
                        </div>
                        <div className="wr-filter-price">
                            <select onChange={this.chosePrice}>
                                <option>Không lọc giá</option>
                                <option data-pricesmallfrom={50000}>Dưới 50.000 vnđ</option>
                                <option data-pricefrom={50000} data-priceto={80000}>50.000 vnđ - 80.000 vnđ</option>
                                <option data-pricefrom={80000} data-priceto={120000}>80.000 vnđ - 120.000 vnđ</option>
                                <option data-pricefrom={120000} data-priceto={150000}>120.000 vnđ - 150.000 vnđ</option>
                                <option data-pricelargefrom={150000}>Trên 150.000 vnđ</option>
                            </select>
                        </div>
                    </div>
                    <div className="wr-order-food">
                        <div className="wr-order-food-for-table">
                            <div className="wr-item-food-for-table-header">
                                <span>Hình ảnh</span>
                                <span>Tên món</span>
                                <span>Giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <span>Xóa</span>
                            </div>
                            {
                                this.state.foodOrders.map((item, index) => {
                                    let image = '';
                                    try {
                                        image = require(`../../assets/imgs/foods/${item.image}`);
                                    } catch(e) {}
                                    return (
                                        <div onClick={this.subFoodOrder} data-id={item.id} key={item.id} className="wr-item-food-for-table">
                                            <span className="wr-img-food">
                                                <img src={image} alt={item.name} />
                                            </span>
                                            <span>{item.name}</span>
                                            <span>{item.price.toFixed(2)} vnđ</span>
                                            <span>{item.count}</span>
                                            <span>{item.total.toFixed(2)} vnd</span>
                                            <span className="wr-remove-food">
                                                <a onClick={this.removeFoodOrder} href="#">
                                                    <img src={iconRemove} alt="Remove" />
                                                </a>
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="wr-order-food-list">
                            <div className="wr-item-food-list-header">
                                <span>Hình ảnh</span>
                                <span>Tên món</span>
                                <span>Giá</span>
                            </div>
                            {
                                this.props.foods.map((item, index) => {
                                    let image = '';
                                    try {
                                        image = require(`../../assets/imgs/foods/${item.image}`);
                                    } catch(e) {}
                                    let price = null;
                                    if(item.priceSale > 0) {
                                        price = (
                                                    <Fragment>
                                                        <ins>{item.priceSale.toFixed(2)} vnđ</ins>
                                                        <del>{item.price.toFixed(2)} vnđ</del>
                                                    </Fragment>
                                                );
                                    } else {
                                        price = (
                                                    <ins>{item.price.toFixed(2)} vnđ</ins>
                                                );
                                    }
                                    return (
                                        <div onClick={this.choseFood} key={item._id} data-pricesale={item.priceSale} data-name={item.name} data-price={item.price} data-image={item.image} data-id={item._id} className="wr-item-food-list">
                                            <span className="wr-img-food">
                                                <img src={image} alt={item.name} />
                                            </span>
                                            <span>{item.name}</span>
                                            <span>
                                                {price}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <p>Tổng tiền: <span className="total-price-order-food">{this.state.totalPrice.toFixed(2)} vnđ</span></p>
                    <div className="wr-all-button">
                        <button onClick={this.removeFoodOrderAll} className="remove-all-food">Xóa hết tất cả</button>
                        <button onClick={this.order} className="order">Order</button>
                        <button onClick={this.foodOrderAll} className="order-all-food">Order hết tất cả</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        categorys: state.category,
        foods: state.food.data,
        idCategory: state.food.idCategory,
        filterPriceFrom: state.food.filterPriceFrom,
        filterPriceTo: state.food.filterPriceTo,
        filterPriceSmallFrom: state.food.filterPriceSmallFrom,
        filterPriceLargeFrom: state.food.filterPriceLargeFrom,
        keyword: state.food.keyword
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllCategories: () => dispatch(actionCategory.getAllCategories()),
        getAllFoodByFilters: (idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom, keyword) => dispatch(actionFood.getAllFoodByFilters(idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom, keyword)),
        resetFood: () => dispatch(actionFood.resetFoods()),
        orderFood: (idTable, foodOrders, createdBy, countPeople, callbackEmit) => dispatch(actionTable.orderFood(idTable, foodOrders, createdBy, countPeople, callbackEmit)),
        addFoodForBill: (idBill, foodOrders, modifiedBy, callbackEmit) => dispatch(actionTable.addFoodForBill(idBill, foodOrders, modifiedBy, callbackEmit))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormOrder);