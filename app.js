var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

require('./weixin/init');
var weixinConfig = require('./weixin/config');
var apiFn = require('./weixin/fn');

var wechat = require('wechat');

var routes = require('./routes/index');
var weixinapi = require('./routes/weixinapi');
var adminApi = require('./routes/admin');





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'weixinapi',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(express.static(path.join(__dirname, 'public')));


app.use(express.query());

var wechatList = require('wechat').List;
wechatList.add('union_start_session', [
    ['回复{a}查看我的性别', function (info, req, res) {
        console.log(res.reply);
        res.reply('我是个妹纸哟');
    }],
    ['回复{b}查看我的年龄', function (info, req, res) {
        res.reply('我今年18岁');
    }],
    ['回复{c}查看我的性取向', '这样的事情怎么好意思告诉你啦- -']
]);


app.use('/fremontapi', wechat({
    token: weixinConfig.WEIXIN_CONFIG.token,
    appid: weixinConfig.WEIXIN_CONFIG.appID,
    encodingAESKey: weixinConfig.WEIXIN_CONFIG.encodingAESKey
}, function (req, res, next) {

    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    apiFn.doMessage(message, req, res);

}));

app.use('/ymapi', wechat({
    token: weixinConfig.YM_WEIXIN_CONFIG.token,
    appid: weixinConfig.YM_WEIXIN_CONFIG.appID,
    encodingAESKey: weixinConfig.YM_WEIXIN_CONFIG.encodingAESKey
}, function (req, res, next) {
    //if(req.query.echostr){
    //    res.send(req.query.echostr);
    //    return;
    //}

    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log(message);
    apiFn.doMessageForUnionCity(message, req, res);

}));

//union city
app.use('/unioncityapi', wechat({
    token: weixinConfig.UNIONCITY_WEIXIN_CONFIG.token,
    appid: weixinConfig.UNIONCITY_WEIXIN_CONFIG.appID,
    encodingAESKey: weixinConfig.UNIONCITY_WEIXIN_CONFIG.encodingAESKey
}, function (req, res, next) {
    //if(req.query.echostr){
    //    res.send(req.query.echostr);
    //    return;
    //}

    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log(message);
    apiFn.doMessageForUnionCity(message, req, res);

}));

//TANGER
app.use('/tangerapi', wechat({
    token : weixinConfig.TANGER_WEIXIN_CONFIG.token,
    appid : weixinConfig.TANGER_WEIXIN_CONFIG.appID,
    encodingAESKey : weixinConfig.TANGER_WEIXIN_CONFIG.encodingAESKey
}, function(req, res, next){
    var message = req.weixin;
    weixinConfig.TANGER_FN.doMessage(message, req, res);
}));

app.use('/', routes);
app.use('/wxapi', weixinapi);
app.use('/admin', adminApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
