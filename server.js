const express = require('express');
const path = require('path');
const config = require('config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { DATABASE_NAME } = require('./constants/constants');

const restfulApi = require('./restful-api');
const restfulApiMobile = require('./restful-api-mobile');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(`${config.get("db.path")}${DATABASE_NAME}`);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images/foods', express.static(path.join(__dirname, 'app/assets/imgs/foods')));

app.set('view engine', config.get('template.name'));
app.set('views', path.join(__dirname, 'views'));

function routeDefaultMiddleware(req, res) {
    res.render('index');
};

// require('./db/seeds/account/account');
// require('./db/seeds/category/category');
// require('./db/seeds/food/food');
// require('./db/seeds/table/table');

const server = require('http').Server(app);

const io = require('socket.io')(server);

io.on('connection', function(socket) {
    socket.on('update-table', function(data) {
        socket.broadcast.emit('update-table', data);
    });
    // socket.on('send-sms-user-order-table', function(data) {
    //     socket.broadcast.emit('send-sms-user-order-table', data);
    // });
});

server.listen(config.get("server.port"));

app.use('/restful-api', restfulApi);
app.use('/restful-api-mobile', restfulApiMobile);
app.use('/', routeDefaultMiddleware);



