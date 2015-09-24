var express = require('express');
var router = express.Router();

var apiFn = require('../weixin/fn');
var wenxuecityAPI = require('../wenxuecity/request_API');
var request = require('request');

var fs = require('fs');
var uuid = require('node-uuid');


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

router.get('/api/get_user_info', function(req, res, next){
    var uid = req.query.uid;
    apiFn.getUserInfo({
        uuid : uid,
        success : function(data){
            res.json(data);
        }
    });
});

router.get('/api/testGetRemoteImage', function(req, res, next){
    var url = req.query.imageUrl || 'http://www.wenxuecity.com/images/wxc-logo.gif';
    var fileName = 'tempImage/'+uuid.v4()+'.png';

    request.head(url, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(url).pipe(fs.createWriteStream(fileName)).on('close', function(){
            console.log('success');
        });
    });

    //request.get(url).pipe(fs.createWriteStream('../tempImage/logo.png'));
    //request(url, function(err, rs, body){
    //    console.log(rs, body);
    //    res.json(body);
    //
    //    //console.log(__dirname);
    //
    //    fs.writeFile("../tempImage/logo.png", body, "binary", function(err){
    //        if(err){
    //            console.log("down fail");
    //            return;
    //        }
    //        console.log("down success");
    //    });
    //});
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
