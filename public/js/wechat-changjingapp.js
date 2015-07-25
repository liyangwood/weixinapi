(function(){
    'use strict';

    var now = {
        row : 1,
        col : 1
    };
    var last = {
        row : 0,
        col : 0
    };

    var towards = {
        up : 1,
        right : 2,
        down : 3,
        left : 4
    };
    var isAnimating = false;

    var C = {
        loadingDiv : null,
        mainDiv : null
    };

    var F = {
        init : function(config){

            F.initVar(config);
            F.initView(config);
            F.initEvent(config);

            F.initEnd();
        },

        setConfig : function(config){
            var rs =  $.extend({
                page : [
                    {
                        id : '1-1',
                        name : 'p11',
                        style : {
                            background : '#083846'
                        },
                        images : [
                            {
                                src : 'img/cover.png',
                                style : {
                                    height : 'auto',
                                    width : '248px',
                                    left : '50%',
                                    top : '1%',
                                    'margin-left' : '-124px'
                                },
                                step : 1,
                                animate : 'moveFromTop'
                            },
                            {
                                src : 'img/sampofurniture.png',
                                style : {
                                    height : 'auto',
                                    width : '185px',
                                    left : '50%',
                                    top : '62%',
                                    'margin-left' : '-92px'
                                },
                                step : 2,
                                animate : 'rotateCarouselRightIn'
                            },
                            {
                                src : 'img/icon_up.png',
                                style : {
                                    height : 'auto',
                                    width : '25px',
                                    left : '50%',
                                    top : '93%',
                                    'margin-left' : '-12px'
                                },
                                animate : 'moveIconUp'
                            }
                        ]
                    },
                    {
                        id : '2-1',
                        name : 'p21',
                        style : {
                            background : '#9261BF'
                        },
                        images : [
                            {
                                src : 'img/wording.png',
                                style : {
                                    height : 'auto',
                                    width : '158px',
                                    left : '50%',
                                    top : '2%',
                                    'margin-left' : '-79px'
                                },
                                animate : 'moveFromBottom'
                            },
                            {
                                src : 'img/circle.png',
                                style : {
                                    height : 'auto',
                                    width : '240px',
                                    left : '50%',
                                    top : '28%',
                                    'margin-left' : '-120px'
                                },
                                animate : 'moveCircle',
                                step : 2
                            },
                            {
                                src : 'img/people.png',
                                animate : 'rotateCarouselRightIn',
                                step : 3,
                                style : {
                                    height : 'auto',
                                    width : '241px',
                                    left : '50%',
                                    top : '36%',
                                    'margin-left' : '-120px'
                                }
                            },
                            {
                                src : 'img/dot1.png',
                                animate : 'scaleUp',
                                step : 5,
                                style : {
                                    height : 'auto',
                                    width : '20px',
                                    left : '50%',
                                    top : '87%',
                                    'margin-left' : '-10px'
                                }
                            },
                            {
                                src : 'img/check_develop.png',
                                animate : 'scaleUp',
                                step : 1,
                                style : {
                                    height : 'auto',
                                    width : '142px',
                                    left : '50%',
                                    top : '82%',
                                    'margin-left' : '-71px'
                                }
                            },
                            {
                                src : 'img/icon_up.png',
                                animate : 'moveIconUp',
                                step : 5,
                                style : {
                                    height : 'auto',
                                    width : '25px',
                                    left : '50%',
                                    top : '92%',
                                    'margin-left' : '-12px'
                                }
                            },
                            {
                                src : 'img/floating_develop.png',
                                animate : 'scaleUp',
                                step : 4,
                                style : {
                                    height : 'auto',
                                    width : '248px',
                                    left : '50%',
                                    top : '8%',
                                    'margin-left' : '-110px'
                                }
                            }
                        ]
                    },
                    {
                        id : '2-2',
                        name : 'p22',
                        style : {
                            background : '#9261BF'
                        },
                        images : [
                            {
                                //src : 'img/introduction.png',
                                src : 'http://www.huawei.com/cn/ucmf/groups/public/documents/multimedia/hw_u_397331.jpg',
                                animate : 'flipInLeft',
                                step : 1,
                                style : {
                                    height : 'auto',
                                    width : '293px',
                                    left : '50%',
                                    top : '5%',
                                    'margin-left' : '-146px'
                                }
                            }
                        ]
                    }

                ]
            }, config||{});

            rs.max = rs.page.length;

            rs.imageList = [];
            $.each(rs.page, function(i, page){
                $.each(page.images, function(j, item){
                    rs.imageList.push(item.src);
                });
            });

            return rs;
        },

        initVar : function(config){
            var s = window.innerHeight / 500,
                ss = 250*(1-s);
            $('.wrap').css('-webkit-transform','scale('+s+','+s+') translate(0px,-'+ss+'px)');

            C.loadingDiv = $('#js_loading');
            C.mainDiv = $('#js_main');
        },

        getStyleString : function(css){
            var rs = '';
            $.each(css, function(key, value){
                rs += key+':'+value+';';
            });

            return rs;
        },

        initView : function(config){
            var h = '';

            $.each(config.page, function(index, item){
                var ct = index<1?'page-current hide':'hide';
                h += '<div class="page page-'+item.id+' '+ct+'" data-name="'+item.name+'" style="'+ F.getStyleString(item.style)+'">'
                    +'<div class="wrap">';

                $.each(item.images, function(i, img){
                    h += '<img class="hide pt-page-'+img.animate+' pt-step'+(img.step||1)+'" src="'+img.src+'" style="'+ F.getStyleString(img.style)+'" />';
                });


                h += '</div></div>';
            });

            C.mainDiv.html(h);

        },

        checkPage : function(){
            return true;
        },

        initEvent : function(config){
            document.addEventListener('touchmove', function(e){
                e.preventDefault();
            }, false);

            $(document).swipeUp(function(e){
                if(isAnimating) return;
                if(!F.checkPage()) return;

                last.row = now.row;
                last.col = now.col;
                if(last.row < config.max){
                    now.row = last.row + 1;
                    now.col = 1;
                    F.pageMove(towards.up);
                }
            });

            $(document).swipeDown(function(e){
                if(isAnimating) return;
                if(!F.checkPage()) return;

                last.row = now.row;
                last.col = now.col;
                if(last.row > 1){
                    now.row = last.row - 1;
                    now.col = 1;
                    F.pageMove(towards.down);
                }
            });

            $(document).swipeLeft(function(e){
                if(isAnimating) return;
                if(!F.checkPage()) return;

                last.row = now.row;
                last.col = now.col;
                if(last.row > 1 && last.row < config.max && last.col === 1){
                    now.row = last.row;
                    now.col = 2;
                    F.pageMove(towards.left);
                }
            });

            $(document).swipeRight(function(e){
                if(isAnimating) return;
                if(!F.checkPage()) return;

                last.row = now.row;
                last.col = now.col;
                if(last.row > 1 && last.row < config.max && last.col==2){
                    now.row = last.row;
                    now.col = 1;
                    F.pageMove(towards.right);
                }
            });
        },

        pageMove : function(tw){
            var lastPage = ".page-"+last.row+"-"+last.col,
                nowPage = ".page-"+now.row+"-"+now.col;
            var outClass,inClass;

            switch(tw) {
                case towards.up:
                    outClass = 'pt-page-moveToTop';
                    inClass = 'pt-page-moveFromBottom';
                    break;
                case towards.right:
                    outClass = 'pt-page-moveToRight';
                    inClass = 'pt-page-moveFromLeft';
                    break;
                case towards.down:
                    outClass = 'pt-page-moveToBottom';
                    inClass = 'pt-page-moveFromTop';
                    break;
                case towards.left:
                    outClass = 'pt-page-moveToLeft';
                    inClass = 'pt-page-moveFromRight';
                    break;
            }
            isAnimating = true;
            var np = $(nowPage),
                lp = $(lastPage);

            np.removeClass("hide");

            lp.addClass(outClass);
            np.addClass(inClass);

            setTimeout(function(){
                lp.removeClass('page-current').removeClass(outClass).addClass("hide");
                lp.find("img").addClass("hide");

                np.addClass('page-current').removeClass(inClass);
                np.find("img").removeClass("hide");

                isAnimating = false;
            },600);
        },

        initEnd : function(){
            C.loadingDiv.addClass('hide');
            C.mainDiv.removeClass('hide');

            C.mainDiv.find('[data-name="p11"]').removeClass('hide').find('img').removeClass("hide");
        },


        start : function(setting){
            var config = F.setConfig(setting);

            var max = config.imageList.length,
                n = 0;

            function callback(src, state){
                console.log(src, ' -- ['+state+']');

                n++;

                $('#js_loading').find('.js_res').html(n + ' / '+max);

                if(n > max -1){
                    $('#js_loading').find('.js_res').html('load complete');
                    window.setTimeout(function(){
                        F.init(config);
                    }, 500);

                }
            }

            //load img
            $.each(config.imageList, function(index, one){
                var img = new Image();
                img.src = one;

                //img.addEventListener('load', function(e){
                //    n++;
                //    console.log(e);
                //    if(n > max-1){
                //        F.init(config);
                //    }
                //}, false);

                img.onerror = function(e){
                    callback(one, 'error');
                };
                img.onload = function(){
                    callback(one, 'success');
                }

            });
        }
    };



    F.start(window['WECHATDATA'] || {});



})();
