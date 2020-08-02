var port = 3000;

//khai báo Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

//Khai báo Router
const userRoute = require('./router/user.router');
const bookRoute = require('./router/book.router');
const transRouter = require('./router/trans.router');


//thiết lập template PUG
app.set('view engine', 'pug');
app.set('views', './view');

function middlewareCookie(req, res, next) {
    console.log(req.cookies.count);
    if (!req.cookies.count)
        res.cookie('count', 1);
    else{
        var num = Number(req.cookies.count);
        res.cookie('count', ++num);
    }
    next();
};

app.get('/', middlewareCookie, function (req, res) {
    res.render('index', {
        name: 'Accel'
    });
});

//khai báo thư mực static files 
app.use(express.static('public'));

//sử dụng router
app.use('/users', userRoute);
app.use('/books', bookRoute);
app.use('/trans', transRouter);

//notification của server
app.listen(port, function () {
    console.log('server is start on port ' + port);
});