
var fs = require('fs');
var request = require('request');
var GoogleSearch = require('google-search');
var googleSearch = null;
var uuid = require('node-uuid');




var F = {

    getGoogleSearchResult : function(opts){
        if(!googleSearch){
            googleSearch = new GoogleSearch({
                key: 'AIzaSyCwspUYBOMSDEri_GE3UGMLCTgo52eqQb8',
                cx: '011130059528697400467:tj9jxflx3wa'
            });
        }

        //TODO 注意使用GoolgeSearch的时候需要修改npm下来的源码，否则会有问题

        googleSearch.build({
            q: opts.key,
            fileType: "",
            num: opts.max || 10
            //siteSearch: "wenxuecity.com" // Restricts results to URLs from a specified site
        }, function(error, response){
            opts.success(response);
            //console.log(error, '\n-----\n----\n', response);
        });
    },

    requestGet : function(opts){
        var host = 'http://api.wenxuecity.com';
        var url = host + opts.url;

        url += '&format=json&version=2';

        request(url, function(err, res, body){
            if(err){
                opts.error(err);
                return;
            }

            if(body){
                opts.success(JSON.parse(body), res);
            }
            else{
                opts.error({'error' : 'wrong'});
            }
        });
    },

    getNewsList : function(opts){
        var channel = opts.channel || 'news',
            max = opts.max || 12,
            url = '/service/api/?act=index&channel='+channel+'&pagesize='+max;
        F.requestGet({
            url : url,
            success : function(rs){
                var data = rs.list;

                if(data.length > max){
                    data = data.slice(0, max);
                }

                for(var i= 0, len=data.length; i<len; i++){
                    data[i].url = F.getNewsListUrlByListData(channel, data[i]);
                }

                opts.success(data);
            },
            error : opts.error
        });
    },

    getNewsListUrlByListData : function(channel, data){
        var d = data.dateline.substring(0, 10).replace(/\-/g, '/'),
            url = 'http://www.wenxuecity.com/news/'+d+'/';
        //if(channel === 'news'){
        //    url += data.postid+'.html';
        //}
        //else{
        //    url += channel+'-'+data.postid+'.html';
        //}

        url = 'http://130.211.186.174/msite-wxc/news.html#/news/detail/'+channel+'/'+data.postid;

        return url;
    },

    getHotNewsFor48Hours : function(){
        var url = '/service/api/?func=hot&act=index'
    },


    getNewsDetail : function(opts){
        var url = '/service/api/?act=view&channel='+opts.channel+'&id='+opts.id;
        F.requestGet({
            url : url,
            success : function(rs){
                opts.success(rs);
            },
            error : function(err){
                throw err;
            }
        });
    }



};


module.exports = F;