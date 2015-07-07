

window.KG = {};
KG.app = angular.module('Demo', ['ionic']);

KG.util = {
    urlParam : function(key){
        var url = location.search.replace(/^\?/, '').split('&');
        var rs = null;
        _.each(url, function(item){
            var a = item.split('=')[0],
                b = item.split('=')[1];
            if(a === key){
                rs = b;
                return;
            }
        });
        return rs;
    }
};

