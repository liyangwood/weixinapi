var express = require('express');
var router = express.Router();

var apiFn = require('../weixin/fn');


router.get('/:first', function(req, res, next){
    var first = req.params.first || 'welcome';


    F.renderPath(first, req, res);
});

router.get('/', function(req, res, next){
    F.renderPath('welcome', req, res);
});




var F = {
   renderPath : function(file, req, res){
       res.render('admin/index', {
           title : '微信公众号管理后台－－首页',
           filePath : 'admin/'+file
       });
   }
};

module.exports = router;
