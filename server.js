var server = require('./app');
var io = require('socket.io').listen(server);
var config = require('config.json'),
    svn_base_path = config.svn_base_path,
    svn_trunk_path = config.svn_trunk_path;
var exe_shell = require('./tools/exeshell');
// 和浏览器通讯
io.sockets.on('connection', function(socket) {
    socket.emit('connected', true);
    socket.on('add project', function(data) {
        var project = data.project,
            path = data.path;
        var cmdpath = 'svn co ' + svn_base_path + project + path + svn_trunk_path + ' ./gulp/projects/' + project + path;
        exe_shell({
            shl_cmd: cmdpath,
            stdout: function(data) {
                socket.emit('add project log', data);
                console.log(data);
            },
            stderr: function(err) {
                console.log(err);
            },
            shl_end: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err);
            }
        });

    });
});