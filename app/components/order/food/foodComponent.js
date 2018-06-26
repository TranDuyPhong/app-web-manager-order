import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import '../../../assets/scss/foods.scss';
import foodsJquery from '../../../assets/js/foods';

import FormChangePassword from '../../form-change-password/formChangePasswordComponent';
import Header from '../header/headerComponent';
import Footer from '../footer/footerComponent'

import actionCategory from '../../../redux/actions/category';
import actionFood from '../../../redux/actions/food';

class Food extends React.Component {
    constructor(props) {
        super(props);
        this.countFood = 0;
    }
    componentDidMount() {
        foodsJquery.init();
        this.props.getAllCategories();
        this.props.getAllFoodByFilterPrices(this.props.filterPriceFrom, this.props.filterPriceTo, this.props.filterPriceSmallFrom, this.props.filterPriceLargeFrom);
    }
    
    componentWillReceiveProps(nextProps) {
        this.countFood = nextProps.foods.length;
    }

    choseCategory = e => {
        e.preventDefault();
        let idCategory = $(e.target).data('idcategory');
        $('a.menu-active').removeClass('menu-active');
        $(e.target).addClass('menu-active');
        if(idCategory !== '') {
            idCategory = idCategory.toString().trim();
            if(idCategory === '-1') {
                this.props.getAllFoodByFilterPrices(this.props.filterPriceFrom, this.props.filterPriceTo, this.props.filterPriceSmallFrom, this.props.filterPriceLargeFrom);
            } else {
                this.props.getFoodsByCategory(idCategory, this.props.filterPriceFrom, this.props.filterPriceTo, this.props.filterPriceSmallFrom, this.props.filterPriceLargeFrom);
            }
        }
    }

    choseFilterPrice = e => {
        let filterPriceFrom = $(e.target).data('pricefrom');
        let filterPriceTo = $(e.target).data('priceto');
        let filterPriceSmallFrom = $(e.target).data('pricesmallfrom');
        let filterPriceLargeFrom = $(e.target).data('pricelargefrom');
        if(this.props.idCategory === '') {
            this.props.getAllFoodByFilterPrices(filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom);
        } else {
            this.props.getFoodsByCategory(this.props.idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom);
        }
    }

    componentWillUnmount() {
        this.props.resetFoods();
        this.props.resetCategories();
    }

    render() {    
        return (
            <div className="wr">
                <FormChangePassword />
                <Header />
                <section className="wr-main">
                    <div className="wr-menu-food">
                        <h3 className="title">Danh mục món</h3>
                        <ul>
                            <li key='-1'>
                                <a className="menu-active" onClick={this.choseCategory} data-idcategory='-1' href="#">Tất cả</a>
                            </li>
                            {
                                this.props.categorys.map((item, index) => {
                                    return (
                                        <li key={item._id}>
                                            <a onClick={this.choseCategory} data-idcategory={item._id} href="#">{item.name}</a>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <div className="wr-foods">
                        <div className="wr-filter-food">
                            <h3 className="title-tab title-tab-active" data-tab="all">
                                <span>Tất cả</span>
                            </h3>
                            <h3 className="title-tab" data-tab="hot">
                                <span>Bán chạy</span>
                            </h3>
                            <h3 className="filter-price">
                                <span>Không lọc giá</span>
                            <ul>
                                <li>
                                     <p onClick={this.choseFilterPrice}>Không lọc giá</p>
                                </li>
                                <li>
                                    <p onClick={this.choseFilterPrice} data-pricesmallfrom={50000}>Dưới 50.000 vnđ</p>
                                </li>
                                <li>
                                    <p onClick={this.choseFilterPrice} data-pricefrom={50000} data-priceto={80000}>50.000 vnđ - 80.000 vnđ</p>
                                </li>
                                <li>
                                    <p onClick={this.choseFilterPrice} data-pricefrom={80000} data-priceto={120000}>80.000 vnđ - 120.000 vnđ</p>
                                </li>
                                <li>
                                    <p onClick={this.choseFilterPrice} data-pricefrom={120000} data-priceto={150000}>120.000 vnđ - 150.000 vnđ</p>
                                </li>
                                <li>
                                    <p onClick={this.choseFilterPrice} data-pricelargefrom={150000}>Trên 150.000 vnđ</p>
                                </li>
                            </ul>
                            </h3>
                        </div>
                        <div className="wr-list-food">
                            <div className="wr-list-food-item container-food-active" data-tab="all">
                                {
                                    this.props.foods.map((item, index) => {
                                        let image = '';
                                        try {
                                            image = require(`../../../assets/imgs/foods/${item.image}`);
                                        } catch(e) {}
                                        let price = null;
                                        if(item.priceSale > 0) {
                                            price = (
                                                        <Fragment>
                                                            <p>
                                                                <ins>{item.priceSale.toFixed(2)} vnđ</ins>
                                                            </p>
                                                            <p>
                                                                <del>{item.price.toFixed(2)} vnđ</del>
                                                            </p>
                                                        </Fragment>
                                                    );
                                        } else {
                                            price = (
                                                        <p>
                                                            <ins>{item.price.toFixed(2)} vnđ</ins>
                                                        </p>
                                                    );
                                        }
                                        return (
                                            <div key={item._id} className="food">
                                                <img src={image} alt={item.name} />
                                                <p>{item.name}</p>
                                                {price}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="wr-list-food-item" data-tab="hot">
                                
                            </div>
                        </div>
                    </div>
                </section> 
                <Footer>
                    <p>
                        <span>Tổng số món: </span>
                        <span>{this.countFood}</span>
                    </p>
                </Footer>
            </div>         
        );
    }
}

const mapStateToProps = state => {
    return {
        categorys: state.category,
        foods: state.food.data,
        filterPriceFrom: state.food.filterPriceFrom,
        filterPriceTo: state.food.filterPriceTo,
        idCategory: state.food.idCategory,
        filterPriceSmallFrom: state.food.filterPriceSmallFrom,
        filterPriceLargeFrom: state.food.filterPriceLargeFrom
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllCategories: () => dispatch(actionCategory.getAllCategories()),
        getFoodsByCategory: (idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom) => dispatch(actionFood.getFoodsByCategory(idCategory, filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom)),
        getAllFoodByFilterPrices: (filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom) => dispatch(actionFood.getAllFoodByFilterPrices(filterPriceFrom, filterPriceTo, filterPriceSmallFrom, filterPriceLargeFrom)),
        resetFoods: () => dispatch(actionFood.resetFoods()),
        resetCategories: () => dispatch(actionCategory.resetCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Food);