

var config = require('./config');
var api = global.ymApi;
var unionCityApi = global.unionCityApi;

var wenxuecityAPI = require('../wenxuecity/request_API');

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

    doMessageForUnionCity : function(msg, req, res){
        var type = msg.MsgType;
        if('event' === type){
            if('CLICK' === msg.Event){
                var key = msg.EventKey;
                if(key === 'wenxuecity_news'){

                    var rsData = [];
                    wenxuecityAPI.getNewsList({
                        channel : 'news',
                        max : 8,
                        success : function(list){
                            for(var i= 0,len=list.length; i<len; i++){
                                var tmpData = {
                                    title : list[i].title,
                                    url : list[i].url
                                };
                                if(list[i].images.length > 0){
                                    tmpData.picurl = list[i].images[0];
                                }

                                rsData.push(tmpData);
                            }

                            res.reply(rsData);
                        },
                        error : function(){
                            res.reply('wrong');
                        }
                    });

                    return;
                }
                else if(key === 'wenxuecity_gossip'){

                    var rsData = [];
                    wenxuecityAPI.getNewsList({
                        channel : 'gossip',
                        max : 8,
                        success : function(list){
                            for(var i= 0,len=list.length; i<len; i++){
                                var tmpData = {
                                    title : list[i].title,
                                    url : list[i].url
                                };
                                if(list[i].images.length > 0){
                                    tmpData.picurl = list[i].images[0];
                                }

                                rsData.push(tmpData);
                            }
console.log(rsData);
                            res.reply(rsData);
                        },
                        error : function(){
                            res.reply('wrong');
                        }
                    });

                    return;
                }
                else if(key === 'wenxuecity_ent'){

                    var rsData = [];
                    wenxuecityAPI.getNewsList({
                        channel : 'ent',
                        max : 8,
                        success : function(list){
                            for(var i= 0,len=list.length; i<len; i++){
                                var tmpData = {
                                    title : list[i].title,
                                    url : list[i].url
                                };
                                if(list[i].images.length > 0){
                                    tmpData.picurl = list[i].images[0];
                                }

                                rsData.push(tmpData);
                            }

                            res.reply(rsData);
                        },
                        error : function(){
                            res.reply('wrong');
                        }
                    });

                    return;
                }






                else if(key === 'union_biz_city_profile'){
                    res.reply([
                        {
                            title : 'City Snapshot',
                            picurl : 'http://38.106.5.171/home/showimage?id=282',
                            url : 'http://www.ci.union-city.ca.us/departments/economic-community-development/city-snapshot'
                        }
                    ]);
                    return;
                }
                else if(key === 'union_biz_contact'){
                    res.reply('Gloria Ortega, Economic Development Manager 3900 Alvarado-Niles Road Union City , CA 94587 Phone: 510-675-5396 Fax: 510-475-7318 Email: economicdevelopment@unioncity.org');

                    return;
                }

                else if(key === 'union_more_explore'){
                    res.reply([
                        {
                            title : 'Plan a day trip to Union City',
                            picurl : 'http://img1.sunset.timeinc.net/sites/default/files/styles/300x300/public/image/2010/03/alameda-creek-trail-0310-m.jpg?itok=3TucwZRz',
                            url : 'http://www.sunset.com/travel/california/union-city-trails'
                        }
                    ]);

                    return;
                }



                if(config.UNION_EVENT_BUTTON[key]){
                    res.reply('你点击了“'+config.UNION_EVENT_BUTTON[key].name+'”的Button');
                    return;
                }
            }
            res.reply('');
            return;
        }
        else if('text' === type){
            var str = msg.Content.toLowerCase();
            if(str === 'contact'){
                res.reply('City Hall Address : City of Union City 34009 Alvarado-Niles Road Union City, California 94587\nMain Phone Number : Telephone (510) 471-3232 Fax (510) 475-7318\nHours : Monday through Thursdays, 8:00 A.M. to 6:00 P.M. Fridays: 8:00 A.M. to 5:00 P.M. City Hall is closed on alternate Fridays.');
                return;
            }
            else if(str === 'demographics' || str === 'demo'){
                res.reply([
                    {
                        title : 'City Snapshot',
                        picurl : 'http://38.106.5.171/home/showimage?id=282',
                        url : 'http://www.ci.union-city.ca.us/departments/economic-community-development/city-snapshot'
                    }
                ]);

                return;
            }


            res.reply('Thanks for your message.');
            return;
        }

        res.reply(JSON.stringify(msg));
    },

    doMessageForYM : function(msg, req, res){
        var host = config.YM_WEIXIN_CONFIG.host;
        var type = msg.MsgType;
        if('event' === type){
            if('CLICK' === msg.Event){
                var key = msg.EventKey;

                if(key === 'ym_updates'){
                    res.reply([
                        {
                            title : 'News Releases',
                            picurl : 'http://www.nps.gov/pwr/yose/planyourvisit/images/AD7541AD-A7F8-4591-CFC890EDA4018CE8.jpg',
                            url : 'http://www.nps.gov/yose/learn/news/newsreleases.htm'
                        }
                    ]);

                    return;
                }
                else if(key === 'ym_camping'){
                    res.reply([
                        {
                            title : 'Campground Reservations',
                            picurl : host+'/img/camping.JPG',
                            url : 'http://www.nps.gov/yose/planyourvisit/camping.htm'
                        }
                    ]);

                    return
                }

                else if(key === 'ym_status'){
                    res.reply('Call 209/372-0200 (press 1 then 1) for the most up-to-date conditions (the information below only reflects planned or long-term closures).');
                    return;
                }

                else if(key === 'ym_about'){
                    res.reply([
                        {
                            title : 'Yosemite',
                            picurl : 'http://www.nps.gov/pwr/yose/planyourvisit/images/AD729C7C-B99D-00B4-7B5CE1EDD36771D1.jpg',
                            url : 'http://www.nps.gov/yose/index.htm'
                        }
                    ]);

                    return;
                }
                else if(key === 'ym_hours'){
                    res.reply('Yosemite National Park is open 24 hours per day, 365 days per year, and no reservations are required to visit. However, the Hetch Hetchy Entrance Station is open only during daylight hours (approximately) and some roads are closed due to snow from around November through May or June. (Check road conditions and Hetch Hetchy hours.)');
                    return;
                }



                if(config.YM_EVENT_BUTTON[key]){
                    res.reply('你点击了“'+config.YM_EVENT_BUTTON[key].name+'”的Button');
                    return;
                }
            }
            else if('subscribe' === msg.Event){
                res.reply([
                    {
                        title : 'Welcome to Yosemite National Park!',
                        description : 'Not just a great valley, but a shrine to human foresight, the strength of granite, the power of glaciers, the persistence of life, and the tranquility of the High Sierra. You can find all information you need here',
                        picurl : 'http://www.nps.gov/pwr/yose/planyourvisit/images/AD729C7C-B99D-00B4-7B5CE1EDD36771D1.jpg',
                        url : 'http://www.nps.gov/yose/index.htm'
                    }
                ]);

                return;
            }
            res.reply('');
            return;
        }
        else if('text' === type){
            var str = msg.Content.toLowerCase();
            if(str === 'contact'){
                res.reply('City Hall Address : City of Union City 34009 Alvarado-Niles Road Union City, California 94587\nMain Phone Number : Telephone (510) 471-3232 Fax (510) 475-7318\nHours : Monday through Thursdays, 8:00 A.M. to 6:00 P.M. Fridays: 8:00 A.M. to 5:00 P.M. City Hall is closed on alternate Fridays.');
                return;
            }
            else if(str === 'demographics' || str === 'demo'){
                res.reply([
                    {
                        title : 'City Snapshot',
                        picurl : 'http://38.106.5.171/home/showimage?id=282',
                        url : 'http://www.ci.union-city.ca.us/departments/economic-community-development/city-snapshot'
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
        opts = opts || {};
        var apiObj = opts.type==='union city'?unionCityApi:api;

        apiObj.getJsConfig({
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
            url: opts.url || 'http://130.211.186.174/jsdemo'
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



    massSendText : function(text, callback){
        var api = unionCityApi;
        //api.previewText('oizn9tpGAECZmyG0HtgEWQ9jahXQ', text, function(err, result){
        //    console.log(arguments);
        //
        //    callback(err, result);
        //});

        api.massSendText(text, '', function(err, result){
            console.log(arguments);

            callback(err, result);
        });
    },

    massSendNews : function(opts, callback){
        var api = unionCityApi;

        var imageUrl = '/Users/JackyLee/Desktop/weixinapi/public/img/circle-design.png';
        //api.uploadThumb(imageUrl, function(err, rs){
        //    console.log(err, rs);
        //
        //
        //});
        var news = {
            "articles": [
                {
                    "thumb_media_id":"9jsIeyEDd1UuFDfzMyd6YkhFpfol7b4PwIuXSeWcNtdaJvVL34dHJ_fR6AYvLHwW",
                    "author":"xxx",
                    "title": '<a href="http://www.baidu.com">Happy Day</a>',
                    "content_source_url":"www.wenxuecity.com",
                    "content":"content",
                    "digest":"digest",
                    "show_cover_pic":"0"
                },
                {
                    "thumb_media_id":"9jsIeyEDd1UuFDfzMyd6YkhFpfol7b4PwIuXSeWcNtdaJvVL34dHJ_fR6AYvLHwW",
                    "author":"xxx",
                    "title":"Happy Day11111111",
                    "content_source_url":"www.wenxuecity.com",
                    "content": '<a href="http://www.baidu.com">sdlfjsldfjsdf</a>',
                    "digest":"sdhfksdlfjsldfjsldfjl",
                    "show_cover_pic":"0"
                }
                //{
                //    //"thumb_media_id":"qI6_Ze_6PtV7svjolgs-rN6stStuHIjs9_DidOHaj0Q-mwvBelOXCFZiq2OsIU-p",
                //    "author":"xxx",
                //    "title":"Happy Day",
                //    "content_source_url":"www.qq.com",
                //    "content":"content",
                //    "digest":"digest",
                //    "show_cover_pic":"0"
                //}
            ]
        };

        api.uploadNews(news, function(err, rs){
            console.log(err, rs);

            var media_id = rs.media_id;
if(!media_id) return;
            api.previewNews('oizn9tpGAECZmyG0HtgEWQ9jahXQ', media_id, function(err, result){
                console.log(arguments);

                callback(err, result);
            });
        });
    },


    end : null
};



module.exports = F;