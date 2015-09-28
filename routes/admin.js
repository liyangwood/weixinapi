var express = require('express');
var router = express.Router();

var apiFn = require('../weixin/fn');
var wenxuecityAPI = require('../wenxuecity/request_API');
var request = require('request');

var fs = require('fs');
var uuid = require('node-uuid');

var sogouApi = require('../weixin/sogouSearchApi');


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

router.get('/api/getSogouWeixinArticleList', function(req, res, next){
    var url = 'http://weixin.sogou.com/weixin?type=2&query='+encodeURIComponent('西雅图')+'&ie=utf8';

    var opts = {
        url : url,
        headers : {
            //'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            //'Accept-Encoding' : 'gzip, deflate, sdch',
            //'Accept-Language' : 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
            'Cookie' : 'CXID=055A523CD47E2841857EAED4A157AFD4; SUID=91DE5A605809950A55F30CF50001F1F1; IPLOC=US; SUV=1443470476321649; ABTEST=5|1443470480|v1; weixinIndexVisited=1; SNUID=6A22A69CFBFEDC28D6EC7208FC9F730D; ld=xyllllllll2Qjz2GlllllVYJ$ntlllllYVrW6yllllwlllll4llll5@@@@@@@@@@; ad=tlllllllll2qDZ8ClllllVYJ$OylllllYVrW6yllllUlllll4Vxlw@@@@@@@@@@@; sct=5; wapsogou_qq_nickname=; LSTMV=0%2C0; LCLKINT=19123',
            'Host' : 'weixin.sogou.com',
            'Referer' : 'http://weixin.sogou.com',
            //'Upgrade-Insecure-Requests' : 1,
            'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.99 Safari/537.36'
        }
    };

    request(opts, function(err, response, body){
        console.log(body);

        var reg=/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g,
            arr=[],
            match;
        while(match=reg.exec(body)){
            arr.push(match[1]);
        }

        console.log(arr);

        for(var i= 0,len=arr.length; i<len; i++){
            var l = arr[i];
            if(l.indexOf('/websearch/art.jsp') !== -1){

                sogouApi.getWeixinArticleDetailByUrl(l, function(){});

                return;
            }
        }


        res.json(arr);
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
