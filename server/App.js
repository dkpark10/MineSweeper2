"use strict";
exports.__esModule = true;
var express = require('express');
var app = express();
var helmet = require('helmet');
var compression = require('compression');
var bodyparser = require('body-parser');
var config = require('./config/Jwtkey');
var cors = require('cors');
var port = process.env.PORT || 8080;
app.use(cors());
// app.use = 요청들어올 떄 마다 실행
// app.use(session(secret)); // 세션값은 메모리에 저장 서버 재가동시 날아감 휘발성
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(compression());
app.use(helmet());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('jwt-secretKey', config.secret);
app.use(express.static(__dirname + '/public'));
app.use('/user');
app.get('/', function (request, response, next) {
    response.status(200).json({ id: 'ani sisisisi' });
});
app.post('/', function (request, response, next) {
    var _a = request.body, id = _a.id, pwd = _a.pwd;
    console.log(id, pwd);
    response.status(200).json({ id: '12345' });
});
app.use(function (error, request, response, next) {
    console.error(error.stack);
    response.status(500).send('Something broke');
});
app.listen(port, function () {
    console.log("Waiting... " + port);
});
