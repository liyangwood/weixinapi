var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('./weixin/init');
var weixinConfig = require('./weixin/config');
var apiFn = require('./weixin/fn');

var wechat = require('wechat');

var routes = require('./routes/index');
var weixinapi = require('./routes/weixinapi');




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
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.query());
app.use('/weixinapi', wechat({
    token: weixinConfig.WEIXIN_CONFIG.token,
    appid: weixinConfig.WEIXIN_CONFIG.appID,
    encodingAESKey: weixinConfig.WEIXIN_CONFIG.encodingAESKey
}, function (req, res, next) {
    if(req.query.echostr){
        res.send(req.query.echostr);
        return;
    }

    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log(message);
    apiFn.doMessage(message, req, res);

}));
app.use('/', routes);
app.use('/wxapi', weixinapi);

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
