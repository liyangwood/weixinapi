var fs = require('fs');
var WechatAPI = require('wechat-api');
var config = require('./config');

var api = global.weixinApi;

var MENU_BUTTON = config.MENU_BUTTON;


var F = {
    getAccessToken : function(callback){
        fs.readFile('access_token.txt', 'utf8', function(err, txt){
            console.log(err, txt);
            if(err){
                throw err;
            }
            var tmp = JSON.parse(txt),
                time = tmp.time,
                expires_in = tmp.expires_in;
            console.log(tmp);
            if(Date.now() < time+expires_in*1000){
                callback(null, tmp);
            }
        });
    },
    saveAccessToken : function(token, callback){
        console.log(token);
        fs.writeFile('access_token.txt', JSON.stringify(token), callback);
    },

    initMenu : function(){
        api.createMenu(MENU_BUTTON, function(err, rs){
            if(err){
                throw err;
            }
            console.log(rs);
        });
    }
};


function init(){
    api = new WechatAPI(config.WEIXIN_CONFIG.appID, config.WEIXIN_CONFIG.appsecret
        //, F.getAccessToken, F.saveAccessToken
    );

    F.initMenu();



    global.weixinApi = api;
}


if(!api){
    init();
}

exports.weixinApi = api;
