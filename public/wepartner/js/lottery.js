(function(){
    var name = $('#js_name'),
        email = $('#js_email'),
        phone = $('#js_phone'),
        note = $('#js_note'),
        btn = $('.js_btn');

    var bb = $('.bb'),
        cc = $('.cc');

    var F = {
        init : function(){
            btn.click(F.submit);
        },

        check : function(elem, type){
            var val = elem.val(),
                box = elem.parents('.form-group'),
                info = box.find('.control-label');
            if(!val){
                box.addClass('has-error');
                info.html(type + ' is request');
                return false;
            }
            if(type === 'Email'){
                if(!/^[_A-Za-z0-9-.]+@([_A-Za-z0-9-]+\.)+[A-Za-z0-9]{2,3}$/.test(val)){
                    box.addClass('has-error');
                    info.html('Email format is incorrect');
                    return false;
                }
            }
            if(type === 'Phone'){
                if(!/^[1-9]\d*$/.test(val)){
                    box.addClass('has-error');
                    info.html('Phone Number format is incorrect');
                    return false;
                }
            }

            box.removeClass('has-error').addClass('has-success');
            info.html('');
            return true;
        },

        submit : function(){
            var flag = true;
            if(!F.check(name, 'Name')){
                flag = false;
            }
            if(!F.check(email, 'Email')){
                flag = false;
            }
            if(!F.check(phone, 'Phone')){
                flag = false;
            }

            if(!flag){
                return false;
            }

            //TODO submit form


            bb.hide();
            cc.show();
        }
    };


    F.init();

})();