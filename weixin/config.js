var host = 'http://130.211.186.174';
var EVENT_BUTTON = {
    szfw_zuixintongzhi : {
        name : 'NEWS',
        type : 'click',
        key : 'szfw_zuixintongzhi'
    },
    szfw_bumenchaxun : {
        name : 'Highlights',
        type : 'click',
        key : 'szfw_bumenchaxun'
    },
    szfw_Directory : {
        name : 'Directory',
        type : 'view',
        url : 'https://www.fremont.gov/27/Departments'
    },
    szfw_lianluowomen : {
        name : 'Contact',
        type : 'view',
        url : host+'/html/contact.html'
    },

    sq_xinxianshi : {
        name : 'Profile',
        type : 'click',
        key : 'sq_xinxianshi'
    },
    sq_guanguang : {
        name : 'Silicon Valley',
        type : 'view',
        url : 'http://www.thinksiliconvalley.com/'
    },
    sq_jiatingfuwu : {
        name : 'Biz News',
        type : 'view',
        url : 'http://www.thinksiliconvalley.com/press-room/'
    },
    sq_fuwushequ : {
        name : 'FAQ',
        type : 'view',
        url : 'http://ca-fremont2.civicplus.com/DocumentCenter/Home/View/1480'
    },
    sq_shenghuofuwu : {
        name : 'Contact',
        type : 'view',
        url : 'http://www.thinksiliconvalley.com/contact-us'
    },

    zsyz_jiaruguigu : {
        name : 'Explore',
        type : 'view',
        //key : 'zsyz_jiaruguigu'
        url : 'http://ca-fremont2.civicplus.com/153/Attractions'
    },
    zsyz_chengshijianjie : {
        name : 'Shopping',
        type : 'click',
        key : 'zsyz_chengshijianjie'
    },
    zsyz_zhaoshangFAQ : {
        name : 'Food&Lodging',
        type : 'view',
        url : 'http://ca-fremont2.civicplus.com/DocumentCenter/View/18319'
    },
    zsyz_woyaozixun : {
        name : 'Tools',
        type : 'view',
        //key : 'zsyz_woyaozixun'
        url : 'http://www.qunar.com/'
    },
    zsyz_gethere : {
        name : 'Get here',
        type : 'view',
        url : host+'/jsdemo'
    }
};

var UNION_EVENT_BUTTON = {
    union_news : {
        name : 'News',
        type : 'click',
        key : 'union_news'
    },
    union_directory : {
        name : 'Directory',
        type : 'view',
        url : 'http://www.ci.union-city.ca.us/departments'
    },
    union_faq : {
        name : 'FAQ',
        type : 'view',
        url : 'http://www.ci.union-city.ca.us/how-do-i-'
    },
    union_city_contact : {
        name : 'Contact',
        type : 'click',
        key : 'union_city_contact'
    },


    union_biz_city_profile : {
        name : 'City Profile',
        type : 'click',
        key : 'union_biz_city_profile'
    },
    union_biz_programs : {
        name : 'Programs',
        type : 'view',
        url : 'http://www.ci.union-city.ca.us/departments/economic-community-development/environmental-programs'
    },
    union_biz_contact : {
        name : 'Contact',
        type : 'click',
        key : 'union_biz_contact'
    },

    union_more_weather : {
        name : 'Weather',
        type : 'view',
        url : 'https://weather.yahoo.com/united-states/california/union-city-2509769'
    },
    union_more_report : {
        name : 'Report',
        type : 'view',
        url : host+'/unioncity/report.html'
    },
    union_more_parking : {
        name : 'Parking',
        type : 'view',
        url : 'http://www.ci.union-city.ca.us/departments/parking-program/parking-map'
    },
    union_more_explore : {
        name : 'Explore',
        type : 'click',
        key : 'union_more_explore'
    },
    union_more_activities : {
        name : 'Activities',
        type : 'view',
        url : 'http://www.ci.union-city.ca.us/departments/leisure-services/activity-guide'
    }
};

var YM_EVENT_BUTTON = {
    ym_weather : {
        name : 'Weather',
        type : 'view',
        url : 'https://weather.yahoo.com/united-states/california/yosemite-national-park-91467160/'
    },
    ym_updates : {
        name : 'Updates',
        type : 'click',
        key : 'ym_updates'
    },
    ym_webcam : {
        name : 'Webcam',
        type : 'view',
        url : host+'/ym/webcam.html'
    },
    ym_camping : {
        name : 'Camping',
        type : 'click',
        key : 'ym_camping'
    },
    ym_food : {
        name : 'Food&Lodging',
        type : 'view',
        url : 'http://www.google.cn/maps/place/%E5%8C%97%E4%BA%AC%E5%B8%82%E4%B8%9C%E5%9F%8E%E5%8C%BA%E5%A4%A9%E5%AE%89%E9%97%A8/@39.9087144,116.397389,15z/data=!3m1!4b1!4m2!3m1!1s0x35f052bf93bd9cb5:0x44df237ca3fb1951'
    },

    ym_direction : {
        name : 'Direction',
        type : 'view',
        url : 'http://www.google.cn/maps/place/%E7%BE%8E%E5%9B%BD%E7%99%BD%E5%AE%AB/@38.8976763,-77.0365298,17z/data=!3m1!4b1!4m2!3m1!1s0x89b7b7bcdecbb1df:0x715969d86d0b76bf'
    },
    ym_status : {
        name : 'Road status',
        type : 'click',
        key : 'ym_status'
    },
    ym_transportation : {
        name : 'Transportation',
        type : 'view',
        url : host+'/ym/transportation.html'
    },
    ym_map : {
        name : 'Park Map',
        type : 'view',
        url : host+'/ym/parkmap.html'
    },

    ym_about : {
        name : 'About',
        type : 'click',
        key : 'ym_about'
    },
    ym_hours : {
        name : 'Hours',
        type : 'click',
        key : 'ym_hours'
    },
    ym_fees : {
        name : 'Fees',
        type : 'view',
        url : host+'/ym/zhifu.html'
    },
    ym_get_app : {
        name : 'Get App',
        type : 'view',
        url : 'https://appsto.re/cn/8ZhkO.i'
    }
};

module.exports = {
    MENU_BUTTON : {
        "button":[
            {
                'name' : 'The City',
                'sub_button' : [
                    EVENT_BUTTON.szfw_zuixintongzhi,
                    EVENT_BUTTON.szfw_bumenchaxun,
                    EVENT_BUTTON.szfw_Directory,
                    EVENT_BUTTON.szfw_lianluowomen
                ]
            },
            {
                name : 'Do Biz',
                sub_button : [
                    EVENT_BUTTON.sq_xinxianshi,
                    EVENT_BUTTON.sq_guanguang,
                    EVENT_BUTTON.sq_jiatingfuwu,
                    EVENT_BUTTON.sq_fuwushequ,
                    EVENT_BUTTON.sq_shenghuofuwu
                ]
            },
            {
                name : 'Visitors',
                sub_button : [
                    EVENT_BUTTON.zsyz_jiaruguigu,
                    EVENT_BUTTON.zsyz_chengshijianjie,
                    EVENT_BUTTON.zsyz_zhaoshangFAQ,
                    EVENT_BUTTON.zsyz_woyaozixun,
                    EVENT_BUTTON.zsyz_gethere
                ]
            }
        ]
    },

    UNION_MENU_BUTTON : {
        button : [
            {
                name : 'The City',
                sub_button : [
                    UNION_EVENT_BUTTON.union_news,
                    UNION_EVENT_BUTTON.union_directory,
                    UNION_EVENT_BUTTON.union_faq,
                    UNION_EVENT_BUTTON.union_city_contact
                ]
            },
            {
                name : 'Do Biz',
                sub_button : [
                    UNION_EVENT_BUTTON.union_biz_city_profile,
                    UNION_EVENT_BUTTON.union_biz_programs,
                    UNION_EVENT_BUTTON.union_biz_contact
                ]
            },
            {
                name : 'More',
                sub_button : [
                    UNION_EVENT_BUTTON.union_more_weather,
                    UNION_EVENT_BUTTON.union_more_report,
                    UNION_EVENT_BUTTON.union_more_parking,
                    UNION_EVENT_BUTTON.union_more_explore,
                    UNION_EVENT_BUTTON.union_more_activities
                ]
            }
        ]
    },

    YM_MENU_BUTTON : {
        button : [
            {
                name : 'Services',
                sub_button : [
                    YM_EVENT_BUTTON.ym_weather,
                    YM_EVENT_BUTTON.ym_updates,
                    YM_EVENT_BUTTON.ym_webcam,
                    YM_EVENT_BUTTON.ym_camping,
                    YM_EVENT_BUTTON.ym_food
                ]
            },
            {
                name : 'Get there',
                sub_button : [
                    YM_EVENT_BUTTON.ym_direction,
                    YM_EVENT_BUTTON.ym_status,
                    YM_EVENT_BUTTON.ym_transportation,
                    YM_EVENT_BUTTON.ym_map
                ]
            },
            {
                name : 'More',
                sub_button : [
                    YM_EVENT_BUTTON.ym_about,
                    YM_EVENT_BUTTON.ym_hours,
                    YM_EVENT_BUTTON.ym_fees,
                    YM_EVENT_BUTTON.ym_get_app
                ]
            }
        ]
    },



    //WEIXIN_CONFIG : {
    //    host : host,
    //    token: 'weixin',
    //    appID: 'wxb25c77f56780bca1',
    //    appsecret : '2ffb619d24b766126fce9dfa55f4b4e3',
    //    encodingAESKey: ''
    //},

    UNIONCITY_WEIXIN_CONFIG : {
        host : host,
        token : 'weixin',
        appID : 'wx496c3ebfb62983a2',
        appsecret : '449b60830de7c4bc948fb5442d40e84e',
        encodingAESKey : ''
    },

    YM_WEIXIN_CONFIG : {
        host : host,
        token: 'weixin',
        appID: 'wxb25c77f56780bca1',
        appsecret : '2ffb619d24b766126fce9dfa55f4b4e3',
        encodingAESKey: ''
    },



    //EVENT_BUTTON : EVENT_BUTTON,
    UNION_EVENT_BUTTON : UNION_EVENT_BUTTON,
    YM_EVENT_BUTTON : YM_EVENT_BUTTON
};