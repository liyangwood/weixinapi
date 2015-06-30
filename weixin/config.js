var host = 'http://299b3207.ngrok.io';
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

    WEIXIN_CONFIG : {
        host : host,
        token: 'weixin',
        appID: 'wxb25c77f56780bca1',
        appsecret : '2ffb619d24b766126fce9dfa55f4b4e3',
        encodingAESKey: ''
    },

    UNIONCITY_WEIXIN_CONFIG : {
        host : host,
        token : 'weixin',
        appID : 'wx496c3ebfb62983a2',
        appsecret : '449b60830de7c4bc948fb5442d40e84e',
        encodingAESKey : ''
    },



    EVENT_BUTTON : EVENT_BUTTON,
    UNION_EVENT_BUTTON : UNION_EVENT_BUTTON
};