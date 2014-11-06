var express = require('express');
var router = express.Router();
var fs=require('fs');

/* GET home page. */
router.get('/', function(req, res) {
    // console.log(req);
    // console.log(req.param);
    // var test=JSON.stringify(req);
    // fs.writeFile('.log',test,'utf-8',function(data){
    //     console.log(data);
    // });
    // res.set({
    //   'Content-Type': 'text/plain',
    //   'Content-Length': '123',
    //   'ETag': '12345'
    // })
    res.send({param1:(req.param('param1'))});
    // res.render('index', { title: 'hhhhh' });
});

module.exports = router;