var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/jsdemo', function(req, res, next){
    res.render('jsdemo', { title: 'JS DEMO' });
});

//func
router.get('/func/publish', function(req, res, next){
    res.render('func/publish', {

    });
});

module.exports = router;
