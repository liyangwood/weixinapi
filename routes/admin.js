var express = require('express');
var router = express.Router();

var apiFn = require('../weixin/fn');


router.get('/', function(req, res, next){
    res.render('admin/index', {
        title : '微信公众号管理后台－－首页'
    });
});

module.exports = router;
