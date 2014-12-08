var host = window.location.host;
socket = io.connect(host);
socket.on('connected', function(data) {
    if (data) {
        var $logWrap = $('#log-wrap');
        var $log = $('#log');

        // 信息提示tips
        function hint(type, text, anime) {
            $('.hint').html('');
            var type = type || 'succ';
            var text = text || '成功';
            var anime = anime || 'fadeInOut';
            var data = '<div class="form-tips ' + anime + '"><span class="' + type + '-tip"><i class="' + type + '-icon"></i><em class="' + type + '-txt">' + text + '</em></span></div>';
            $('.hint').html(data);
            if ($('body').scrollTop() > 0) {
                $('.form-tips').css('top', '45px');
            }
        }
        // 添加项目函数
        function addProject(project, inputContent, projectList) {
            var testReg = /[^a-zA-Z_0-9\/]/g;
            var exsit;
            if (inputContent === '') {
                hint('error', '你没有输入项目哦^^');
                return false;
            }
            projectList.each(function(index) {
                if ($(this).text() === inputContent) {
                    hint('error', '这个项目已经存在了哦^^');
                    $('.checked').removeClass('checked');
                    $(this).addClass('checked');
                    exsit = true;
                    return false;
                }
            });
            if (testReg.test(inputContent)) {
                hint('error', '项目格式好像有问题哦');
            } else {
                if (exsit) return false;
                var path = inputContent + '/';
                socket.emit('add project', {
                    project: project,
                    path: path
                });
                hint('loading', '添加项目中……', 'fadeIn');
            }
        }
        // 添加项目
        $('.add-btn').on('click', function() {
            var project = $(this).attr('project') + '/';
            var inputContent = $(this).siblings('.add-input').val();
            var projectList = $(this).parents('.art-body').find('.art-li');
            addProject(project, inputContent, projectList);
        })
        // 键盘绑定添加项目事件
        $('.add-input').on('keyup', function(event) {
            if (event.which === 13) {
                var project = $(this).siblings('.add-btn').attr('project') + '/';
                var inputContent = $(this).val();
                var projectList = $(this).parents('.art-body').find('.art-li');
                addProject(project, inputContent, projectList);
            }
            return false;
        });

        // 选择打包项目模块
        $('.art-li').on('click', function() {
            if (!$(this).hasClass('checked')) {
                if ($('.checked').length > 0) {
                    hint('error', '打包项目只能一个一个来哦^^')
                } else {
                    $(this).addClass('checked');
                }
            } else {
                $(this).removeClass('checked');
            }
        }, false);
        // 监听log事件
        socket.on('add project log', function(data) {
            data = data + '<br>';
            $log.append(data);
            $logWrap.scrollTop($log.height());
        });
        // 判断鼠标滚动，生成提示条吸顶效果
        $(document).scroll(function() {
            var $formTips = $('.form-tips');
            var scrollTop = $('body').scrollTop();
            if (scrollTop > 0) {
                $formTips.css('top', '45px');
            } else {
                $formTips.css('top', '61px');
            }
            $formTips = scrollTop = null;
        });
    }

});

