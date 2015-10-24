
var Const = require('../../Const');

var wechat = require('wechat');
var wechatList = wechat.List;

var WechatAPI = require('wechat-api');
var OAuthAPI = require('wechat-oauth');

var config = {
    token: 'weixin',
    appID: 'wxb25c77f56780bca1',
    appsecret : '2ffb619d24b766126fce9dfa55f4b4e3',
    encodingAESKey: ''
};

var api = new WechatAPI(config.appID, config.appsecret);
var oauthApi = new OAuthAPI(config.appID, config.appsecret);





var button = {

    //发布图文
    'publish-text-image' : {
        name : '发布图文',
        type : 'click',
        key : 'publish-text-image',
        clickFn : function(req, res){
            res.wait('publish-type1-step1');
        }
    }
};

var menu = {
    button : [
        {
            name : '发布',
            sub_button : [
                button['publish-text-image']
            ]
        }
    ]
};

var Message = {
    WELCOME : 'aaa'
};

var AUTO = {
    '哈哈' : function(req, res){
        res.reply('aaaaa');
    }
};

var F = {
    doMessage : function(msg, req, res){

        var type = msg.MsgType;
        if('event' === type){
            if('CLICK' === msg.Event){
                var key = msg.EventKey;
                if(button[key]){
                    button[key].clickFn.call(api, req, res, msg);
                    return;
                }

                res.reply('');
                return;
            }
            else if('subscribe' === msg.Event){
                //关注动作
                res.reply(Message.WELCOME);
                return;
            }
        }
        else if('text' === type) {
            var str = msg.Content.toLowerCase();
            if(AUTO[str]){
                AUTO[str].call(api, req, res, msg);

                return;
            }
        }


        res.reply('');
        //res.reply(JSON.stringify(msg));
    },
    getParams : function(message){
        return {
            fromUser : message.FromUserName,
            toUser : message.ToUserName
        }
    }
};

var WaitList = {
    'publish-type1-step1' : {
        list : [
            ['要制作哪种内容？'],
            ['{1} - 普通', function (req, res){

                var info = F.getParams(req.weixin);

                req.wxsession[info.fromUser] = {
                    title : '',
                    html : '',
                    type : 1
                };
                //console.log(req.wxsession, req.message);
                res.wait('publish-type1-step2');
            }],
            ['{2} - 图文', function (req, res){
                res.reply('未来实现');
            }]
        ],
        callback : function(msg, session, res, req){

        }
    },
    'publish-type1-step2' : {
        list : [
            ['请输入标题']
        ],
        callback : function(msg, session, res, req){
            if(msg.MsgType === 'text' && msg.Content){
                session.title = msg.Content;

                res.wait('publish-type1-step3')
            }
            else{
                res.reply('输入错误，请重新输入');
            }
        }
    },
    'publish-type1-step3' : {
        list : [
            ['请输入图片']
        ],
        callback : function(msg, session, res, req){
            if(msg.MsgType === 'image' && msg.PicUrl){
                session.html = '<img src="'+msg.PicUrl+'" />';

                res.nowait([
                    {
                        title : session.title,
                        description : session.html,
                        picurl : msg.PicUrl,
                        url : 'http://www.haiwai.com'
                    }
                ]);
                session = null;
            }
            else{
                res.reply('输入错误，请上传图片');
            }
        }
    }
};

module.exports = {
    init : function(app){
        app.use('/HaiWaiServices', wechat({
            token: config.token,
            appid: config.appID,
            encodingAESKey: config.encodingAESKey
        }, function (req, res, next) {

            // 微信输入信息都在req.weixin上
            var message = req.weixin;
            console.log(message);

            var info = F.getParams(message);

            var waitId = req.wxsession['_wait'];

            if(waitId && req.wxsession[info.fromUser]){
                console.log(req.wxsession);

                var session = req.wxsession[info.fromUser];


                if(message.EventKey && message.EventKey === 'publish-text-image'){
                    res.reply('还有没有完成的，放弃请输入 放弃');
                }
                else if(message.MsgType === 'text' && message.Content === '放弃'){
                    req.wxsession[info.fromUser] = null;
                    res.nowait('放弃成功');
                }
                else if(waitId){
                    WaitList[waitId].callback.call(res, message, session, res, req);
                }

            }
            else{
                F.doMessage(message, req, res);
            }




        }));

        //session 部分
        for(var x in WaitList){
            wechatList.add(x, WaitList[x].list);
        }




        api.createMenu(menu, function(err, rs){
            if(err) throw err;
            console.log('HaiWaiServices MENU BUTTON is update.');
        });



        console.log('--- start HaiWaiServices ---')
    }
};