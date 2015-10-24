
var haiwai = require('./config/HaiWaiServices');

module.exports = {
    start : function(app){

        //start haiwai
        haiwai.init(app);

    }
};