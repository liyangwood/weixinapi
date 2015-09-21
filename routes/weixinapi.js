var express = require('express');
var router = express.Router();

var apiFn = require('../weixin/fn');

var request = require('request');


router.get('/js_ticket', function(req, res, next){
    apiFn.getJsConfig({}, function(rs){
        res.json(rs);
    });
});

router.get('/oauth', function(req, res, next){
    var type = req.query.MsgType;
    if(type === 'getUserByCode'){
        var stype = req.query.type;
        if(stype === 'tanger'){
            global.TANGER_OAUTHAPI.getUserByCode(req.query.code, function(err, rs){
                if(err) throw err;

                res.json(rs);
            });
        }


        return;
    }


    res.json({
        status : 0,
        statusText : 'error'
    });
});

router.get('/testApi', function(req, res, next){
    var type = req.query.MsgType;
    if(!type){
        res.send('MsgType error');
    }

    switch(type){
        case 'getMenu':
            apiFn.getMenu(function(rs){
                res.json(rs);
            }, function(err){
                res.send(err);
            });
            break;

        default :
            res.send('MsgType is wrong');
    }
});



router.get('/uploadNews', function(req, res, next){
    var data = {
        "articles": [
            {
                "thumb_media_id":"qI6_Ze_6PtV7svjolgs-rN6stStuHIjs9_DidOHaj0Q-mwvBelOXCFZiq2OsIU-p",
                "author":"xxx",
                "title":"Happy Day",
                "content_source_url":"www.qq.com",
                "content":"content",
                "digest":"digest",
                "show_cover_pic":"1"
            },
            {
                "thumb_media_id":"qI6_Ze_6PtV7svjolgs-rN6stStuHIjs9_DidOHaj0Q-mwvBelOXCFZiq2OsIU-p",
                "author":"xxx",
                "title":"Happy Day",
                "content_source_url":"www.qq.com",
                "content":"content",
                "digest":"digest",
                "show_cover_pic":"0"
            }
        ]
    };
});

router.get('/massSendText', function(req, res, next){
    var text = '<a href="http://www.wenxuecity.com/news/2015/09/21/4580049.html">令完成筹码是什么？曝手握中共海外间谍绝密名单(图)</a> \n\n'
        +'<a href="http://www.wenxuecity.com/news/2015/09/21/4580011.html">西雅图加紧准备迎接习近平到访 将暂关9个街区(图)</a>\n\n'
        +'<a href="http://www.wenxuecity.com/news/2015/09/21/4579964.html">30年过去了 美方翻出习近平首次访美的名片(组图)</a>';
    text = '文学城最新新闻列表，查看更多请点击底部菜单。\n\n';

    var max = 12;

    request('http://api.wenxuecity.com/service/api/?act=index&channel=news&pagesize=10&version=2&format=json', function(err, response, body){
        //res.json(JSON.parse(body).list);
        var list = JSON.parse(body)['list'];
        if(!list){
            res.json(error);
            return;
        }

        for(var i= 0, len=(list.length>max?max:list.length); i<len; i++){
            var d = list[i].dateline.substring(0, 10).replace(/\-/g, '/');
            text += (i+1)+'. <a href="http://www.wenxuecity.com/news/'+d+'/'+list[i].postid+'.html">'+list[i].title+'</a> \n\n';
        }

        console.log(text);

        apiFn.massSendText(text, function(err, rs){
            if(err){
                res.json(err);
                return;
            }

            res.json(rs);

        });

    });



});

router.get('/massSendNews', function(req, res, next){
    apiFn.massSendNews({}, function(err, rs){
        if(err){
            res.json(err);
            return;
        }

        res.json(rs);

    });
});

module.exports = router;
