var express = require('express');
var router = express.Router();

var apiFn = require('../weixin/fn');
var wenxuecityAPI = require('../wenxuecity/request_API');


router.get('/:first', function(req, res, next){
    var first = req.params.first || 'welcome';


    F.renderPath(first, req, res);
});

router.get('/', function(req, res, next){
    F.renderPath('welcome', req, res);
});

router.get('/api/search', function(req, res, next){
    var key = req.query.q;
    if(!key){
        res.json({
            error : '没有搜索关键字'
        });
        return;
    }

    wenxuecityAPI.getGoogleSearchResult({
        key : key,
        max : 8,
        success : function(rs){
            var data = rs.items;
            var rsData = [];
            for(var i= 0,len=data.length; i<len; i++){
                var tmpData = {};
                tmpData.title = data[i].title;
                tmpData.description = data[i].snippet;
                tmpData.url = data[i].link;

                try{
                    var tmpImg = data[i].pagemap.cse_image[0]['src'];
                    tmpData.picurl = tmpImg;
                }catch(e){
                    //TODO
                }


                rsData.push(tmpData);
            }

            res.json(rsData);
        }
    });
});


var F = {
   renderPath : function(file, req, res){
       res.render('admin/index', {
           title : '微信公众号管理后台－－首页',
           filePath : file
       });
   }
};

module.exports = router;
