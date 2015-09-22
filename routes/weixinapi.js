var express = require('express');
var router = express.Router();

var apiFn = require('../weixin/fn');

var request = require('request'),
    wenxuecityAPI = require('../wenxuecity/request_API');


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
    var text = '文学城最新新闻列表，查看更多请点击底部菜单。\n\n';


    wenxuecityAPI.getNewsList({
        channel : 'news',
        max : 12,
        success : function(list){
            for(var i= 0,len=list.length; i<len; i++){
                text += (i+1)+'. <a href="'+list[i].url+'">'+list[i].title+'</a> \n\n';
            }

            console.log(text);

            apiFn.massSendText(text, function(err, rs){
                if(err){
                    res.json(err);
                    return;
                }

                res.json(rs);

            });
        },
        error : function(error){
            res.send(error);
        }
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
