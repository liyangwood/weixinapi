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

module.exports = router;
