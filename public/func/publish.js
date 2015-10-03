(function(){

    var isInMobile = (function is_mobile_browser(){
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    })();

    var isInWeixin = (function is_weixin_browser(){
        var ua = navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == "micromessenger";
    })();

    var previewBox, titleBox, addText, addTextBtn, pubBtn, addImage;

    var F = {
        init : function(){
            F.initVar();
            F.initView();
            F.initEvent();
            F.initEnd();
        },
        initVar : function(){
            previewBox = $('#js_preview');
            titleBox = $('#title');
            addText = $('.js_addText');
            addTextBtn = $('.js_addBtn');
            addImage = $('.js_addImage');
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
                    var file = addImage[0].files[0];
                    console.log(file);
                    F.previewImageByFile(file);
                    addImage.val('');
                });
            }
        },

        previewImageByFile : function(file){
            var img = document.createElement('img');
            img.file = file;

            var fr = new FileReader();
            fr.onload = function(e){
                img.src = e.target.result;
            };
            fr.readAsDataURL(file);

            previewBox.find('section').append(img);
        }
    };



    $(F.init);
})();