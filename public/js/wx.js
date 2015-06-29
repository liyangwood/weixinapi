(function(){

    function getConfig(){
        $.ajax({
            url : '/wxapi/js_ticket',
            type : 'get',
            dataType : 'json',
            success : function(rs){
                init(rs);
            }
        });
    }

    function init(config){
        //{"debug":false,"appId":"wxb25c77f56780bca1","timestamp":"1435528867","nonceStr":"8hvjdaa60ombzkt","signature":"2e68b16f18afc84e64183f6108f758acb74d4a79","jsApiList":["onMenuShareTimeline","onMenuShareAppMessage"]}
        //alert(JSON.stringify(config));
        wx.paramConfig = config;
        wx.config({
            debug : false,
            appId : config.appId,
            timestamp : config.timestamp,
            nonceStr : config.nonceStr,
            signature : config.signature,
            jsApiList : config.jsApiList
        });


        //wx.ready(function(){
        //    wx.getNetworkType({
        //        success: function (res) {
        //            var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
        //            alert(networkType)
        //        }
        //    });
        //});
    }


    getConfig();
})();