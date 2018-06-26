const GET_ALL_TABLE = 'http://192.168.1.211:3000/restful-api/table/get-all-table';
const GET_INFO_TABLE_BY_TABLE = 'http://192.168.1.211:3000/restful-api/table/get-info-table-by-table';
const PAYMENT = 'http://192.168.1.211:3000/restful-api/revenue/payment';
const REMOVE_BILL = 'http://192.168.1.211:3000/restful-api/bill/remove-bill';
const REMOVE_ORDER_TABLE = 'http://192.168.1.211:3000/restful-api/table/remove-order-table';
const ORDER_TABLE = 'http://192.168.1.211:3000/restful-api/table/order-table';
const ORDER_FOOD = 'http://192.168.1.211:3000/restful-api/bill/create-bill';
const ADD_FOOD_FOR_BILL = 'http://192.168.1.211:3000/restful-api/bill/add-food-for-bill';
const INCREMENT_COUNT_FOOD = 'http://192.168.1.211:3000/restful-api/bill/increment-count-food';
const DECREMENT_COUNT_FOOD = 'http://192.168.1.211:3000/restful-api/bill/decrement-count-food';
const REMOVE_FOOD = 'http://192.168.1.211:3000/restful-api/bill/remove-food';
const REMOVE_ALL_FOOD = 'http://192.168.1.211:3000/restful-api/bill/remove-all-food';
const SEND_SMS_USER = 'http://192.168.1.211:3000/restful-api/table/send-sms-user';

module.exports = {
    GET_ALL_TABLE: GET_ALL_TABLE,
    GET_INFO_TABLE_BY_TABLE: GET_INFO_TABLE_BY_TABLE,
    PAYMENT: PAYMENT,
    REMOVE_BILL: REMOVE_BILL,
    REMOVE_ORDER_TABLE: REMOVE_ORDER_TABLE,
    ORDER_TABLE: ORDER_TABLE,
    ORDER_FOOD: ORDER_FOOD,
    ADD_FOOD_FOR_BILL: ADD_FOOD_FOR_BILL,
    INCREMENT_COUNT_FOOD: INCREMENT_COUNT_FOOD,
    DECREMENT_COUNT_FOOD: DECREMENT_COUNT_FOOD,
    REMOVE_FOOD: REMOVE_FOOD,
    REMOVE_ALL_FOOD: REMOVE_ALL_FOOD,
    SEND_SMS_USER: SEND_SMS_USER
}