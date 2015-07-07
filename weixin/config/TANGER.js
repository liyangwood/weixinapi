var WechatAPI = require('wechat-api');
var OAuthAPI = require('wechat-oauth');

var host = 'http://130.211.186.174';
var button = {
    tg_outlet : {
        name : 'My Outlet',
        type : 'view',
        url : 'http://www.google.cn/maps/'
    },
    tg_event : {
        name : 'Events',
        type : 'click',
        key : 'tg_event',
        clickFn : function(req, res, opts){
            res.reply('未来实现');
            //TODO
        }
    },
    tg_parking_pin : {
        name : 'Parking Pin',
        type : 'view',
        url : host+'/tanger/map.html'
    },
    tg_services_locator : {
        name : 'Services Locator',
        type : 'click',
        key : 'tg_services_locator',
        clickFn : function(req, res){
            res.reply('未来实现');
            //TODO
        }
    },
    tg_my_rewards : {
        name : 'My Rewards',
        type : 'click',
        key : 'tg_my_rewards',
        clickFn : function(req, res){
            var url = oauthApi.getAuthorizeURL(host+'/tanger/oauth.html', 'state', 'snsapi_userinfo');

            res.reply('<a href="'+url+'">绑定账号</a>');
        },
        url : host+'/tanger/oauth.html'
    },

    tg_sales : {
        name : 'Sales',
        type : 'click',
        key : 'tg_sales',
        clickFn : function(req, res){
            res.reply('未来实现');
            //TODO
        }
    },
    tg_digital_coupon : {
        name : 'Digital Coupon',
        type : 'view',
        url : 'http://www.tangeroutlet.com/barstow/coupons'
    },
    tg_club_exclusive : {
        name : 'Club Exclusive',
        type : 'click',
        key : 'tg_club_exclusive',
        clickFn : function(req, res){
            var url = oauthApi.getAuthorizeURL(host+'/tanger/oauth.html', 'state', 'snsapi_userinfo');

            res.reply('<a href="'+url+'">绑定账号</a>');
        },
        url : host+'/tanger/oauth.html'
    },
    tg_weChat_exclusive : {
        name : 'WeChat Exclusive',
        type : 'click',
        key : 'tg_weChat_exclusive',
        clickFn : function(req, res){
            res.reply([
                {
                    title : 'WeChat Exclusive ',
                    picurl : 'http://www.tangeroutlet.com/images/promotions/TC-rewards/tangerclub-rewards-home.jpg',
                    url : 'http://www.tangeroutlet.com/'
                }
            ]);
        }
    },
    tg_sweepstakes : {
        name : 'Sweepstakes',
        type : 'view',
        url : host+'/tanger/choujiang.html'
    },

    tg_personal_shopper : {
        name : 'Personal shopper',
        type : 'view',
        url : 'http://www.tangeroutlet.com/personal-shopper'
    },
    tg_eGift_card : {
        name : 'eGift card',
        type : 'click',
        key : 'tg_eGift_card',
        clickFn : function(req, res){
            var url = oauthApi.getAuthorizeURL(host+'/tanger/oauth.html', 'state', 'snsapi_userinfo');

            res.reply('<a href="'+url+'">绑定账号</a>');
        }
    },
    tg_style_book : {
        name : 'Style Book',
        type : 'click',
        key : 'tg_style_book',
        clickFn : function(req, res){
            res.reply([
                {
                    title : 'Last Minute 4th of July Inspiration',
                    description : 'The 4th of July is all about celebrating your American pride, soaking up the sun and taking advantage of those extra moments to spend with friends and family. But, we all know that with all of this comes the added stress of finding the perfect outfit. Choosing the perfect combo of red, white and blue can be a pretty daunting task… especially if you’re attempting to stray away from the cliché american flag apparel.',
                    picurl : 'https://tangerstylemaker.files.wordpress.com/2015/07/ecaeddf31bc4f2599fa46c84d2eff640.jpg?w=1000&h=1500',
                    url : 'http://tangerstylemaker.com/'
                }
            ]);
        }
    },
    tg_get_app : {
        name : 'Get App',
        type : 'view',
        url : host+'/tanger/getapp.html'
    },
    tg_contact_us : {
        name : 'Contact us',
        type : 'click',
        key : 'tg_contact_us',
        clickFn : function(req, res){
            res.reply('Tanger Factory Outlet Centers, Inc.\n3200 Northline Avenue \nSuite 360 \nGreensboro, NC 27408 \nPhone 336-292-3010 \nFax 336-852-2096\n\nTangerclub, Giftcards and other online order inquiries \nPhone: 336-856-6100');
        }
    }
};

function getButton(config){
    var rs = {};
    rs.name = config.name;
    rs.type = config.type;
    if(rs.type === 'click'){
        if(!config.key) throw config.name+' [key] is not exist';
        rs.key = config.key;
        return rs;
    }
    if(rs.type === 'view'){
        if(!config.url) throw config.name+' [url] is not exist';
        rs.url = config.url;
        return rs;
    }

    throw config.name + 'config is wrong';
}

var menu = {
    button : [
        {
            name : 'My Outlet',
            sub_button : [
                getButton(button.tg_outlet),
                getButton(button.tg_event),
                getButton(button.tg_parking_pin),
                getButton(button.tg_services_locator),
                getButton(button.tg_my_rewards)
            ]
        },
        {
            name : 'Offers',
            sub_button : [
                getButton(button.tg_sales),
                getButton(button.tg_digital_coupon),
                getButton(button.tg_club_exclusive),
                getButton(button.tg_weChat_exclusive),
                getButton(button.tg_sweepstakes)
            ]
        },
        {
            name : 'More',
            sub_button : [
                getButton(button.tg_personal_shopper),
                getButton(button.tg_eGift_card),
                getButton(button.tg_style_book),
                getButton(button.tg_get_app),
                getButton(button.tg_contact_us)
            ]
        }
    ]
};

var config = {
    host : host,
    token: 'weixin',
    appID: 'wxb5d50cfd0c14b9e7',
    appsecret : '1980dd38ca712537f99f13089b0632ca',
    encodingAESKey: ''
};

var api = global.TANGER_API,
    oauthApi = global.TANGER_OAUTHAPI;
(function(){
    if(api) return;
    api = new WechatAPI(config.appID, config.appsecret);
    oauthApi = new OAuthAPI(config.appID, config.appsecret);

    api.createMenu(menu, function(err, rs){
        if(err) throw err;

        console.log('TANGER MENU BUTTON is update.');
    });

    global.TANGER_API = api;
    global.TANGER_OAUTHAPI = oauthApi;
})();



var F = {
    doMessage : function(msg, req, res){
        console.log(msg);
        var type = msg.MsgType;
        if('event' === type){
            if('CLICK' === msg.Event){
                var key = msg.EventKey;
                if(button[key]){
                    button[key].clickFn.call(api, req, res);
                    return;
                }

                res.reply('');
                return;
            }
            else if('subscribe' === msg.Event){
                //关注动作
                res.reply('Thank you for follow Tanger Outlet on WeChat! You can find the nearest outlet and its offers, wechat exclusive deals, check your Tanger Club Rewards and offers, buy eGift cards for you and your friends, instantly chat with our personal shopper and a lot more! And you can also get our APP on Google Play or App Store \nhttps://play.google.com/store/apps/details?id=com.mvl.tanger&hl=en \nhttp://itunes.apple.com/us/app/id409552790?mt=8 ');
                return;
            }
        }
        else if('text' === type) {
            var str = msg.Content.toLowerCase();
            if(str === 'contact us' || str === 'contact'){
                res.reply('Tanger Factory Outlet Centers, Inc.\n3200 Northline Avenue \nSuite 360 \nGreensboro, NC 27408 \nPhone 336-292-3010 \nFax 336-852-2096\n\nTangerclub, Giftcards and other online order inquiries \nPhone: 336-856-6100');
                return;
            }
            else if(str === 'personal shopper'){
                res.reply([
                    {
                        title : 'PERSONAL SHOPPER',
                        url : 'http://www.tangeroutlet.com/personal-shopper',
                        picurl : 'http://www.tangeroutlet.com/images/promotions/personal-shopper/personal-shopper-page-main.jpg'
                    }
                ]);
                return;
            }


            res.reply('Thanks for your message!');
            return;
        }


        res.reply('');
        //res.reply(JSON.stringify(msg));
    }
};



module.exports = {
    EVENT_BUTTON : button,
    MENU_BUTTON : menu,
    WEIXIN_CONFIG : config,
    FN : F
};