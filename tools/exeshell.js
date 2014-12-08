var exec = require('child_process').exec;
var iconv = require('iconv-lite');
var win = process.platform === 'win32';
// * [执行shell命令]
// * @param  {object} [shell命令配置项]
// * >@param  {string} [执行的shell命令 ]
// * >@param  {function} [shell命令执行完成的回调]
// * >@param  {function} [shell命令执行过程中的回调]   
// * >@param  {function} [shell命令执行过程出现异常的回调] 


var exe_shell = function() {
    var arg = arguments[0];
    var shl_cmd = exec(arg.shl_cmd, {
        encoding: 'binary'
    });
    shl_cmd.on('error', function(err) {
        if (arg.error) {
            arg.error(err);
        } else {
            return false;
        }
    });
    shl_cmd.stdout.on('data', function(chunk) {
        if (win) {
            chunk = iconv.decode(chunk, 'gbk');
        }
        arg.stdout(chunk);
    });
    shl_cmd.stdout.on('end', function(chunk) {
        if (arg.stdend) {
            arg.stdend(chunk)
        } else {
            return false;
        }
    });
    shl_cmd.stderr.on('data', arg.stderr);
    shl_cmd.on('exit', arg.shl_end);
};
module.exports = exe_shell;