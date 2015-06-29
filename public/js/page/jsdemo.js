
wx.ready(function() {
    wx.checkJsApi({
        jsApiList: [
            'getLocation',
            'openLocation'
        ],
        success: function (res) {
            //alert(JSON.stringify(res));
        }
    });



    window.goToMap = function(){
        wx.openLocation({
            latitude: 39.9179059, // 纬度，浮点数，范围为90 ~ -90
            longitude: 116.3970322, // 经度，浮点数，范围为180 ~ -180。
            name: '北京故宫', // 位置名
            address: '', // 地址详情说明
            scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        });


        //wx.getLocation({
        //    success: function (res) {
        //        var latitude = res.latitude;
        //        var longitude = res.longitude;
        //        var speed = res.speed;
        //        var accuracy = res.accuracy;
        //        alert(JSON.stringify(res));
        //
        //        wx.openLocation({
        //            latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
        //            longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
        //            name: 'Here', // 位置名
        //            address: '', // 地址详情说明
        //            scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
        //            infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        //        });
        //    },
        //    cancel : function(){
        //        alert('wrong');
        //    }
        //});
    };




});








