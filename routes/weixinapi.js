var express = require('express');
var router = express.Router();

var apiFn = require('../weixin/fn');


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
    var text = '<a href="http://www.baidu.com">第一条新闻</a> \n\n'
        +'<a href="http://www.wenxuecity.com">第二条新闻</a>\n\n'
        +'<a href="http://www.haiwai.com">第三条新闻</a>';
    apiFn.massSendText(text, function(err, rs){
        if(err){
            res.json(err);
            return;
        }

        res.json(rs);

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
