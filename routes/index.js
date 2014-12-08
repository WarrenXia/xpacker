var express = require('express');
var router = express.Router();
var redis = require('redis');
var rClient = redis.createClient('6379', '127.0.0.1');

// 数据出错渲染页面
function errorReader(err) {
    router.get('/', function(req, res) {
        res.render('index', {
            title: 'Xpacker',
            t4: '',
            t36: '',
            t35: '',
            error: err
        });
    })
}

rClient.on('error', errorReader);
// rClient.hset('pls', 't36', ['yunyingstyle'])
rClient.hgetall('pls', function(err, reply) {
    if (err) {
        errorReader(err);
    } else {
        if (reply !== null) {
            var t4Pls = reply.t4 || '',
                t36Pls = reply.t36 || '',
                t35Pls = reply.t35 || '';
        } else {
            var t4Pls = '',
                t36Pls = '',
                t35Pls = '';
        }
        router.get('/', function(req, res) {
            res.render('index', {
                title: 'Xpacker',
                t4: t4Pls.split(','),
                t36: t36Pls.split(','),
                t35: t35Pls.split(','),
                error: null
            });
        });
        rClient.end();
    }
})

module.exports = router;
