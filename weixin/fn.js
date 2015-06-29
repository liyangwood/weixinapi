

var config = require('./config');
var api = global.weixinApi;

var F = {



    getMenu : function(callback, errorFn){
        api.getMenu(function(err, rs){
            if(err){
                console.error(err);
                errorFn(err);
                return;
            }

            console.log(rs);
            callback(rs);
        });
    },

    doMessage : function(msg, req, res){
        var type = msg.MsgType;
        if('event' === type){
            if('CLICK' === msg.Event){
                var key = msg.EventKey;
                if(key === 'szfw_zuixintongzhi'){
                    res.reply([
                        {
                            title: 'Fireworks are banned in Fremont',
                            description: 'Fireworks are banned in Fremont',
                            picurl: 'https://www.fremont.gov/images/CivicAlerts/1/No%20Fireworks.jpg',
                            url: 'https://www.fremont.gov/CivicAlerts.aspx?AID=876'
                        }
                    ]);
                    return;
                }
                else if(key === 'szfw_bumenchaxun'){
                    res.reply([
                        {
                            title: 'National Night Out',
                            description: 'National Night Out',
                            picurl: 'https://www.fremont.gov/ImageRepository/Document?documentID=27152',
                            url: 'http://www.fremontpolice.org/index.aspx?NID=168'
                        },
                        {
                            title : 'Warm Springs/South Fremont',
                            picurl : 'https://www.fremont.gov/ImageRepository/Document?documentID=23891',
                            url : 'https://www.fremont.gov/1093/Warm-SpringsSouth-Fremont'
                        },
                        {
                            title : 'Downtown Fremont',
                            picurl : 'https://www.fremont.gov/ImageRepository/Document?documentID=24110',
                            url : 'https://www.fremont.gov/1655/Downtown'
                        },
                        {
                            title : 'Fremont Green Challenge',
                            picurl : 'https://www.fremont.gov/ImageRepository/Document?documentID=27154',
                            url : 'https://www.fremont.gov/1947/Sustainability'
                        }
                    ]);

                    return;
                }
                else if(key === 'sq_xinxianshi'){
                    res.reply([
                        {
                            title : 'City Profile',
                            picurl : 'https://www.fremont.gov/ImageRepository/Document?documentID=21696',
                            url : 'https://www.fremont.gov/183/City-Profile'
                        },
                        {
                            title: 'Demographics',
                            //description: 'National Night Out',
                            picurl: 'https://www.fremont.gov/ImageRepository/Document?documentID=21702',
                            url: 'https://www.fremont.gov/184/Demographics'
                        }

                    ]);

                    return;
                }
                else if(key === 'zsyz_chengshijianjie'){
                    res.reply([
                        {
                            title: 'Shopping Malls near you in Fremont, CA',
                            //description: 'Fireworks are banned in Fremont',
                            picurl: 'http://s3-media1.fl.yelpcdn.com/bphoto/yunp5KjJ3u5J-oE9JSTlQQ/90s.jpg',
                            url: 'http://www.yelp.com/search?find_desc=Shopping+Malls&find_loc=Fremont%2C+CA'
                        }
                    ]);

                    return;
                }


                if(config.EVENT_BUTTON[key]){
                    res.reply('你点击了“'+config.EVENT_BUTTON[key].name+'”的Button');
                    return;
                }
            }
            res.reply('');
            return;
        }
        else if('text' === type){
            var str = msg.Content.toLowerCase();
            if(str === 'contact'){
                res.reply('Think Fremont, think Silicon Valley! Welcome to call our economic development department to know more about "doing business with Fremont" at (510) 284-4020. You can also come to our office at 3300 Capitol Ave, Fremont, CA 94538. See more at: http://www.thinksiliconvalley.com/#sthash.FgfC1xbv.dpuf');
                return;
            }
            else if(str === 'demo' || str === 'demographic'){
                res.reply([
                    {
                        title : 'City Profile',
                        url : 'https://www.fremont.gov/183/City-Profile',
                        picurl : 'https://www.fremont.gov/ImageRepository/Document?documentID=21696'
                    }
                ]);

                return;
            }
            else if(str === 'fun' || str === 'street eating'){
                res.reply([
                    {
                        title : 'Downtown Events: Fremont Street Eats and Farmer’s Market',
                        url : 'https://www.fremont.gov/CivicAlerts.aspx?AID=865',
                        picurl : 'https://www.fremont.gov/images/CivicAlerts/1/Fremont%20Street%20Eats.jpg'
                    }
                ]);

                return;
            }

            res.reply('Thanks for your message.');
            return;
        }

        res.reply(JSON.stringify(msg));
    },

    getJsTicket : function(callback){
        api.getTicket(function(err, rs){
            if(err) throw err;

            callback(rs);
        });
    },

    getJsConfig : function(opts, callback){
        api.getJsConfig({
            debug: false,
            jsApiList: [
                'getNetworkType',
                'openLocation',
                'getLocation',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'onVoicePlayEnd',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'translateVoice',

                'hideOptionMenu',
                'showOptionMenu',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
            ],
            url: opts.url || 'http://299b3207.ngrok.io/jsdemo'
        }, function(err, rs){
            if(err) throw err;

            callback(rs);
        });
    },

    /**
     * 检查签名
     */
    //checkSignature : function(query, token){
    //    var signature = query.signature;
    //    var timestamp = query.timestamp;
    //    var nonce = query.nonce;
    //
    //    var shasum = crypto.createHash('sha1');
    //    var arr = [token, timestamp, nonce].sort();
    //    shasum.update(arr.join(''));
    //
    //    return shasum.digest('hex') === signature;
    //}


    end : null
};



module.exports = F;