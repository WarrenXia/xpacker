var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    // if((/packer/g).test(req.path)){
    //     console.log('message');
    //     res.render('index', { title: 'Xpacker' });
    // }
    // console.log(req.body);
  res.render('index', { title: 'Xpacker' });
  // console.log(req.ip);
  
});

module.exports = router;
