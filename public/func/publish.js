(function(){

    var isInMobile = (function is_mobile_browser(){
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    })();

    var isInWeixin = (function is_weixin_browser(){
        var ua = navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == "micromessenger";
    })();

    var previewBox, titleBox, addText, addTextBtn, pubBtn, addImage;
    var addImageBtn;

    var F = {
        init : function(){
            F.initVar();
            F.initView();
            F.initEvent();
            F.initEnd();

            if(isInWeixin){
                F.initWeixinConfig();
            }

        },
        initVar : function(){
            previewBox = $('#js_preview');
            titleBox = $('#title');
            addText = $('.js_addText');
            addTextBtn = $('.js_addBtn');
            addImage = $('.js_addImage');
            addImageBtn = $('.js_addImageBtn');
        },
        initView : function(){

        },
        initEvent : function(){
            titleBox.blur(function(){
                var val = titleBox.val();
                previewBox.find('h1').text(val);
            });

            addTextBtn.click(function(){
                var val = addText.val();
                if(!val) return false;

                previewBox.find('section').append('<p>'+val+'</p>');
                addText.val('');
            });

            F.setImageButton();
        },
        initEnd : function(){

        },

        setImageButton : function(){
            if(!isInWeixin){
                addImage.change(function(){
                    var files = addImage[0].files;

                    _.each(files, function(file){
                        F.addPreviewImage('file', file);
                    });

                    addImage.val('');
                });

                addImageBtn.click(function(e){
                   addImage.trigger('click');
                });
            }
            else{
                addImageBtn.click(function(){
                    wx.chooseImage({
                        count: 5, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            if(_.isArray(localIds)){
                                _.each(localIds, function(item){
                                    F.addPreviewImage('weixin', item);
                                });
                            }
                            else{
                                F.addPreviewImage('weixin', localIds);
                            }

                        }
                    });
                });
            }
        },

        addPreviewImage : function(type, data){
            var img = document.createElement('img');

            if(type === 'file'){
                img.file = data;

                var fr = new FileReader();
                fr.onload = function(e){
                    img.src = e.target.result;
                };
                fr.readAsDataURL(data);
            }
            else if(type === 'weixin'){
                img.src = data;
            }


            previewBox.find('section').append(img);
        },

        initWeixinConfig : function(){
            var url = '/wxapi/js_ticket?url='+encodeURIComponent(location.href.replace(location.hash, ''));
            $.ajax({
                url : url,
                type : 'GET',
                dataType : 'json',
                success : function(config){
                    wx.config({
                        debug : false,
                        appId : config.appId,
                        timestamp : config.timestamp,
                        nonceStr : config.nonceStr,
                        signature : config.signature,
                        jsApiList : config.jsApiList
                    });
                }
            });


        }
    };



    $(F.init);
})();