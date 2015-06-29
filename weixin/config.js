
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
        url : 'http://299b3207.ngrok.io/html/contact.html'
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
        url : 'http://299b3207.ngrok.io/jsdemo'
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

    WEIXIN_CONFIG : {
        token: 'weixin',
        appID: 'wxb25c77f56780bca1',
        appsecret : '2ffb619d24b766126fce9dfa55f4b4e3',
        encodingAESKey: ''
    },



    EVENT_BUTTON : EVENT_BUTTON
};