

var request = require('request');


var F = {
    getWeixinArticleDetailByUrl : function(url, callback){
        url = 'http://weixin.sogou.com'+url;

        url = url.replace(/\&amp;/g, '&');

        console.log(url);

        var opts = {
            url : url,
            headers : {
                //'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                //'Accept-Encoding' : 'gzip, deflate, sdch',
                //'Accept-Language' : 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
                'Cookie' : 'CXID=055A523CD47E2841857EAED4A157AFD4; SUID=91DE5A605809950A55F30CF50001F1F1; IPLOC=US; SUV=1443470476321649; ABTEST=5|1443470480|v1; weixinIndexVisited=1; SNUID=6A22A69CFBFEDC28D6EC7208FC9F730D; ld=xyllllllll2Qjz2GlllllVYJ$ntlllllYVrW6yllllwlllll4llll5@@@@@@@@@@; ad=tlllllllll2qDZ8ClllllVYJ$OylllllYVrW6yllllUlllll4Vxlw@@@@@@@@@@@; sct=5; wapsogou_qq_nickname=; LSTMV=0%2C0; LCLKINT=19123',
                'Host' : 'weixin.sogou.com',
                'Referer' : 'http://weixin.sogou.com',
                //'Upgrade-Insecure-Requests' : 1,
                'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.99 Safari/537.36'
            }
        };

        request(opts, function(err,res,body){
            console.log(body);
        });
    }
};



module.exports = F;