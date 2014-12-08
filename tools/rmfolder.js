var fs = require('fs');
var path = require('path');

// * [异步删除文件夹]
// * @param  {string} [需要删除的文件夹路径 ]
// * @param  {function} [删除完成之后的回调函数]
var rm_folder = function(rmpath, callback) {
    fs.exists(rmpath, function(exists) {
        //如果文件路径不存在或文件路径不是文件夹则直接返回
        if (!exists || !fs.statSync(rmpath).isDirectory()) return callback('done');
        fs.readdir(rmpath, function(err, files) {
            if (err) return callback(err);
            //根据文件夹下的每个文件的完全路径创建一个数组
            var fullNames = files.map(function(file) {
                return path.join(rmpath, file);
            });
            //获取文件夹下的文件的属性
            get_files_stats(fullNames, fs.stat, function(err, stats) {
                var files = [];
                var dirs = [];
                //不要使用 for in 来遍历，如果有空值，会不一一对应
                for (var i = 0; i < fullNames.length; i++) {
                    if (stats[i].isDirectory()) {
                        dirs.push(fullNames[i]);
                    } else {
                        files.push(fullNames[i]);
                    }
                }
                //先删文件，后删文件夹
                serial(files, fs.unlink, function(err) {
                    if (err) return callback(err);
                    serial(dirs, rm_folder, function(err) {
                        if (err) return callback(err);
                        //最后删除根文件夹
                        fs.rmdir(rmpath, callback);
                    });
                });
            });
        });
    });
};
//获取文件的属性
var get_files_stats = function(list, stat, callback) {
    if (!list.length) return callback(null, []);
    //concat 中无参数，相当于拷贝一份数组，而不是引用数组
    var copy = list.concat();
    var statArray = [];

    stat(copy.shift(), function handler(err, stats) {
        statArray.push(stats);
        if (copy.length) {
            stat(copy.shift(), handler);
        } else {
            callback(null, statArray);
        }
    });
};
//删除文件
var serial = function(list, rmfile, callback) {
    if (!list.length) return callback(null, []);
    var copy = list.concat();
    rmfile(copy.shift(), function handler(err) {
        if (err) return callback(err);
        if (copy.length) {
            rmfile(copy.shift(), handler);
        } else {
            callback(null);
        }
    });
};
module.exports = rm_folder;