function application() {
    this.level = 202003121716;
    this.regular = {
        realName: /([\u4e00-\u9fa5]{2,4})/,
        phone: /^[1][3-9][0-9]{9}$/,
        email: /^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/
    };
}
application.prototype = {
    itop: function() {
        $('html,body').stop().animate({
            scrollTop: 0
        }, 200);
    },
    alert: function(params) {
        var html = '';
        var title = params.title || '提示';
        var close = $('<a href="javascript:;" class="close">关闭</a>');
        var cancel = $('<button class="cancel">取消</button>');
        var confirm = $('<button class="confirm">确定</button>');
        html += '<div class="ui-layer">';
        html += '<div class="inner">';
        html += '<div class="head">';
        html += '<h3>' + title + '</h3>';
        html += '</div>';
        html += '<div class="main">';
        html += '<p>' + params.content + '</p>';
        html += '</div>';
        html += '<div class="foot">';
        html += '<div class="button">';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="shadow"></div>';
        html += '</div>';
        var layer = $(html);
        layer.appendTo('body');
        layer.find('.head').append(close);
        layer.find('.button').append(confirm);
        close.bind({
            click: function() {
                layer.remove();
            }
        });
        confirm.bind({
            click: function() {
                layer.remove();
                if (params.success) {
                    return params.success({
                        confirm: true
                    });
                }
            }
        });
    },
    showToast: function(params) {
        var html = '';
        var title = params.title || '成功';
        var duration = params.duration || 1000;
        var close = $('<a href="javascript:;" class="close">关闭</a>');
        var icon = $('<img class="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAAKlBMVEUAAAD6VVX6VFT5VFT6VFT6VVX5VFT6VVX6VFT6VFT8U1P8VFT/UFD6VVWzB/dLAAAADXRSTlMAYMDgoDCw0PBwUE8QJZIqgAAAAHZJREFUCNdjIAZwOalsgLBYa+/evR4AZkbcBYJWMLP28t27ttdBLMa7Cr5XmO4KAJlsdy+yOMjeTQAyme7eFWC8e1cBwnRgATLBCq4wCvgCFYC0GcheZAZrY7C9dPeu7mWwubEIK1ht7969DLGY4aSy2QRinA0AtTsuAoZRRRAAAAAASUVORK5CYII=" />');
        html += '<div class="ui-toast">';
        html += '<div class="inner">';
        html += '<span class="text">' + title + '</span>';
        html += '</div>';
        html += '</div>';
        var layer = $(html);
        layer.appendTo('body');
        layer.find('.inner').prepend(icon);
        layer.find('.inner').append(close);
        close.bind({
            click: function() {
                layer.remove();
            }
        });
        setTimeout(function() {
            layer.remove();
        }, duration);
    },
    bdmap: function(params) {
        var container = params.container || 'bdmap';
        var height = params.height || 400;
        var map = new BMap.Map(container);
        var point = new BMap.Point(params.longitude,params.latitude);
        var marker = new BMap.Marker(point);
        document.getElementById(container).style.height = height + 'px';
        map.addOverlay(marker);
        map.centerAndZoom(point, params.zoom);
        map.enableScrollWheelZoom(true);
        map.addControl(new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT,
            type: BMAP_NAVIGATION_CONTROL_SMALL
        }));
        var opts = {
            width: 320,
            height: 60,
            title: '<h3 style="color:#1b8dd0; font-size:16px; line-height:20px;">' + params.title + '</h3>',
            enableMessage: false,
            message: ''
        };
        var infoWindow = new BMap.InfoWindow('<p style="color:#999; padding-top:5px; line-height:18px;">' + params.content + '</p>',opts);
        marker.addEventListener('click', function() {
            map.openInfoWindow(infoWindow, point);
        });
    },
    validate: function(params) {
        var that = this;
        var container = $('#' + params.container);
        container.find('[type="submit"]').bind({
            click: function(e) {
                var boolen = true;
                container.find('[data-required]').each(function(index, element) {
                    var required = $(this).attr('data-required');
                    var name = $(this).attr('name');
                    var label = $(this).data('label');
                    var type = $(this).attr('type');
                    var value = $.trim($(this).val());
                    var placeholder = $(this).attr('placeholder') || '请完善' + label;
                    var error = $(this).attr('error') || placeholder;
                    if (required == 'required') {
                        var rval = ''
                        if (type == 'radio') {
                            rval = $(':radio[name="' + name + '"]:checked').val();
                        } else if (type == 'checkbox') {
                            rval = $(':checkbox[name="' + name + '"]:checked').val();
                        } else {
                            rval = value && value !== placeholder ? value : ''
                        }
                        if (!rval) {
                            that.showToast({
                                title: error
                            });
                            boolen = false;
                            return false;
                        }
                    } else {
                        var valid = true
                        if (required == 'realName' && !value.match(that.regular.realName) || (value == '' || value == placeholder)) {
                            valid = false
                        } else if (required == 'phone' && !value.match(that.regular.phone)) {
                            valid = false
                        } else if (required == 'email' && value != '' && !value.match(that.regular.email)) {
                            valid = false
                        } else if (required == 'huxing') {
                            if (value == '' || value.indexOf('-1') > -1 || value.indexOf(-1) > -1) {
                                valid = false
                            }
                        }
                        if (!valid) {
                            that.showToast({
                                title: error
                            });
                            boolen = false;
                            return false;
                        }
                    }
                });
                e.preventDefault();
                if (boolen && params.success) {
                    return params.success(true);
                } else {
                    if (!boolen && params.error) {
                        return params.error(false);
                    }
                }
            }
        });
        container.find('input, textarea').bind({
            focus: function() {
                if ($(this).val() == $(this).attr('placeholder')) {
                    $(this).val('');
                }
            },
            blur: function() {
                if ($(this).val() == '') {
                    $(this).val($(this).attr('placeholder'));
                }
            },
            keyup: function() {
            }
        });
    },
    scrollThumbs: function(params) {
        var $this = $('#' + params.id);
        var $list = $this.find('.carousel-list-box');
        var $list2 = $this.find('.carousel-thumb-list-box');
        var $prev = $this.find('.prev');
        var $next = $this.find('.next');
        var length = $this.find('.carousel-item-box').length;
        var width = $this.width();
        var index = 0;
        var autoplay = params.autoplay;
        var duration = params.duration;
        var speed = params.speed;
        var timer;
        $list.append($list.html());
        $list2.append($list2.html());
        $list.find('.carousel-item-box').width(width);
        function next() {
            if (index < length) {
                index++;
            } else {
                $list.css({
                    left: 0
                });
                $list2.css({
                    left: 0
                });
                index = 1;
            }
            scroll();
        }
        function prev() {
            if (index > 0) {
                index--;
            } else {
                $list.css({
                    left: -width * length
                });
                $list2.css({
                    left: -width * 0.2 * length
                });
                index = length - 1;
            }
            scroll();
        }
        function scroll() {
            $list.stop().animate({
                left: -width * index
            }, speed);
            $list2.stop().animate({
                left: -width * 0.2 * index
            }, speed);
            $list2.find('.carousel-thumb-item-box').eq(index).addClass('active').siblings().removeClass('active');
        }
        if (autoplay) {
            timer = setInterval(function() {
                next();
            }, duration);
        }
        $(window).bind({
            resize: function() {
                clearInterval(timer);
                width = $this.width();
                $list.find('.carousel-item-box').width(width);
                $list.css({
                    let: -width * index
                });
                if (autoplay) {
                    timer = setInterval(function() {
                        next();
                    }, duration);
                }
            }
        });
        $this.bind({
            mouseenter: function() {
                clearInterval(timer);
            },
            mouseleave: function() {
                if (autoplay) {
                    timer = setInterval(function() {
                        next();
                    }, duration);
                }
            }
        });
        $prev.bind({
            click: function() {
                prev();
            }
        });
        $next.bind({
            click: function() {
                next();
            }
        });
        $list2.find('.carousel-thumb-item-box').bind({
            click: function() {
                if ($(this).index() >= length) {
                    index = $(this).index() - length;
                } else {
                    index = $(this).index();
                }
                scroll();
            }
        });
    },
    scroll3D: function(params) {
        var $this = $('#' + params.id);
        var $list = $this.find('.carousel-list-box');
        var $prev = $this.find('.prev');
        var $next = $this.find('.next');
        var length = $this.find('.carousel-item-box').length;
        var width = $this.width();
        var index = 0;
        var autoplay = params.autoplay;
        var duration = params.duration;
        var speed = params.speed;
        var timer;
        $list.append($list.html());
        $list.find('.carousel-item-box').width(width * 0.3333)
            .eq(0).addClass('prevs').end()
            .eq(1).addClass('active').end()
            .eq(2).addClass('nexts');
        $list.find('.carousel-item-box').on('click', function () {
            index = $(this).index() - 1
            scroll()
        })
        function next() {
            if (index < length) {
                index++;
            } else {
                $list.css({
                    left: 0
                });
                index = 1;
            }
            scroll();
        }
        function prev() {
            if (index > 0) {
                index--;
            } else {
                $list.css({
                    left: -width * length
                });
                index = length - 1;
            }
            scroll();
        }
        function scroll() {
            $list.stop().animate({
                left: -width * 0.3333 * index
            }, speed);
            $list.find('.carousel-item-box').eq(index).addClass('prevs').siblings().removeClass('prevs');
            $list.find('.carousel-item-box').eq(index + 1).addClass('active').siblings().removeClass('active');
            $list.find('.carousel-item-box').eq(index + 2).addClass('nexts').siblings().removeClass('nexts');
        }
        if (autoplay) {
            timer = setInterval(function() {
                next();
            }, duration);
        }
        $(window).bind({
            resize: function() {
                clearInterval(timer);
                width = $this.width();
                $list.find('.carousel-item-box').width(width);
                $list.css({
                    let: -width * index
                });
                if (autoplay) {
                    timer = setInterval(function() {
                        next();
                    }, duration);
                }
            }
        });
        $this.bind({
            mouseenter: function() {
                clearInterval(timer);
            },
            mouseleave: function() {
                if (autoplay) {
                    timer = setInterval(function() {
                        next();
                    }, duration);
                }
            }
        });
        $prev.bind({
            click: function() {
                prev();
            }
        });
        $next.bind({
            click: function() {
                next();
            }
        });
    },
    showVideoDialog: function(params) {
        var code = params.code;
        var poster = params.poster || '';
        var autoMode = params.autoMode;
        if (code.match(/.+\.mp4/)) {
            window.videoDialogType = 'player';
            $('#videoPlayer').show();
            if ($('#myVideo').length) {} else {
                if ($('#newVideo').length) {
                    $('#newVideo').attr({
                        poster: poster,
                        src: code
                    });
                    if (!autoMode) {
                        newPlayer = document.getElementById('newVideo');
                        newPlayer.play();
                    }
                }
            }
        } else {
            window.videoDialogType = 'iframe';
            $('#videoIframe').show();
            $('#videoIframe').html(code);
        }
        $('#videoPlayerDialog').show();
        $('#videoPlayerDialog .video-player-close').unbind().on({
            click: function() {
                app.hideVideoDialog();
            }
        });
    },
    hideVideoDialog: function(params) {
        if ($('#myVideo').length) {}
        if ($('#newVideo').length) {
            if (window.videoDialogType === 'player') {
                newPlayer.pause();
            }
        }
        $('#videoIframe').hide().html('');
        $('#videoPlayer').hide();
        if ($('#myVideo').length) {
            $('#myVideo').attr({
                poster: ''
            });
            $('#myVideo .source').attr({
                src: ''
            });
        } else {
            if ($('#newVideo').length) {
                $('#newVideo').attr({
                    poster: '',
                    src: ''
                });
            }
        }
        $('#videoPlayerDialog').hide();
    },
    download: function(url, name) {
        if (url == '' || name == '') {
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function() {
            if (xhr.status === 200) {
                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(xhr.response, name);
                } else {
                    const link = document.createElement('a');
                    const body = document.querySelector('body');
                    link.href = window.URL.createObjectURL(xhr.response);
                    link.download = name;
                    link.style.display = 'none';
                    body.appendChild(link);
                    link.click();
                    body.removeChild(link);
                    window.URL.revokeObjectURL(link.href);
                }
            }
        }
        ;
        xhr.send();
    },
    formatForceNumber: function(obj) {
        obj.value = obj.value.replace(/[^\d.]/g, '');
        obj.value = obj.value.replace(/\.{2,}/g, '.');
        obj.value = obj.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
        obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        if (obj.value.indexOf('.') < 0 && obj.value != '') {
            obj.value = parseFloat(obj.value);
        }
    },
    sendSms: function(name) {
        var that = this;
        var timer = 120;
        var scode = $('#scode-' + name);
        var phone = $('input[name="' + name + '"]').val().trim();
        if (!phone.match(that.regular.phone)) {
            app.showToast({
                title: '请输入手机号码'
            })
        } else {
            $.post(SCENEID + '/sms', {
                phone: phone
            }, function (res) {
                scode.attr({
                    'data-disabled': 'disabled'
                });
                function clicker() {
                    timer -= 1;
                    scode.text(timer + '秒后重试');
                    if (timer > 0) {
                        setTimeout(clicker, 1000);
                    } else {
                        scode.removeAttr('data-disabled').text('发送验证码');
                    }
                }
                clicker();
            });
        }
        ;
    },
    refreshHits: function(params) {
        $.post(SCENEID + '/view', params)
    }
};
var app = new application();

(function() {
    var $id = $('.ui-product-album-box');
    var $list = $id.find('.ui-product-album');
    var $dots = $id.find('.dots');
    var $prev = $id.find('.prev');
    var $next = $id.find('.next');
    var width = $list.width();
    var offset = 118;
    var interval = 5000;
    var index = 0;
    var timer;
    var length = $list.find('.auto-img-box').length;
    var $preview = $('.ui-product-detail-preview');
    var $close = $('.ui-product-detail-preview-close')
    
    if (length <= 1) {
        $preview.on('click', function () {
            $('body').css({
                overflow: 'hidden'
            });
            $id.parent().addClass('fullscreen-preview').prev().show()
        })
        $close.on('click', function () {
            $('body').removeAttr('style')
            $id.parent().removeClass('fullscreen-preview').prev().hide()
        })
        return
    }

    $list.find('.auto-img-box').width(width);
    $dots.width(2 * length * offset);
    $list.append($list.html());
    $dots.append($dots.html());
    $dots.find('.auto-img-box').eq(0).addClass('active');

    function prev() {
        if (index < 0) {
            $list.css({
                left: -length * width
            });
            $dots.css({
                left: -length * offset
            });
            index = length - 1;
        }
        $list.stop().animate({
            left: -index * width
        });
        $dots.stop().animate({
           left: -index * offset
        }).find('.auto-img-box').eq(index).addClass('active').siblings().removeClass('active');
    }

    function next() {
        if (index > length) {
            $list.css({
                left: 0
            });
            $dots.css({
                left: 0
            });
            index = 1;
        }
        $list.stop().animate({
            left: -index * width
        });
        $dots.stop().animate({
           left: -index * offset
        }).find('.auto-img-box').eq(index).addClass('active').siblings().removeClass('active');
    }

    $id.bind({
        mouseenter: function() {
            clearInterval(timer);
        },
        mouseleave: function() {
            timer = setInterval(function() {
                index += 1;
                next();
            }, interval);
        }
    });

    $dots.on('click', '.auto-img-box', function() {
        index = $(this).index();
        next();
    });

    $prev.bind({
        click: function() {
            index -= 1;
            prev();
        }
    });

    $next.bind({
        click: function() {
            index += 1;
            next();
        }
    });

    $preview.on('click', function () {
        $('body').css({
            overflow: 'hidden'
        });
        $id.parent().addClass('fullscreen-preview').prev().show()
        width =$id.width();
        $list.width(2 * width * length).find('.auto-img-box').width(width);
        $list.css({
            left: -index * width
          });
        $dots.css({
            left: -index * offset
        }).find('.auto-img-box').eq(index).addClass('active').siblings().removeClass('active');
    })
    $close.on('click', function () {
        $('body').removeAttr('style');
        $id.parent().removeClass('fullscreen-preview').prev().hide()
        width = $id.width();
        $list.width(2 * width * length).find('.auto-img-box').width(width);
        $list.css({
            left: -index * width
          });
        $dots.css({
            left: -index * offset
        }).find('.auto-img-box').eq(index).addClass('active').siblings().removeClass('active');
    })

    timer = setInterval(function() {
        index += 1;
        next();
    }, interval);
}
)(window, jQuery);

(function() {
    var huxing_height = 260;
    var window_height = $(window).height();
    var hid = '';
    var timer;
    var $picker = $('#huxingPicker')

    $('.form-huxing').on('mouseenter', function () {
        var left = $(this).offset().left;
        var top = $(this).offset().top;
        var height = $(this).height();
        var currentValue = $(this).find('input').val();
        hid = $(this).attr('id');

        var values = currentValue ? currentValue.split(',').map(Number) : [-1, -1, -1, -1, -1];
        var arrays = [['1室', '2室', '3室', '4室', '5室', '6室'], ['1厅', '2厅', '3厅', '4厅', '5厅', '6厅'], ['1厨', '2厨', '3厨', '4厨', '5厨', '6厨'], ['1卫', '2卫', '3卫', '4卫', '5卫', '6卫'], ['1阳台', '2阳台', '3阳台', '4阳台', '5阳台', '6阳台']];
        var htmlArr = arrays.map(function(item, index) {
            var strArr = item.map(function(it, i) {
                var temp = i == values[index] ? '<dd class="active">' : '<dd>'
                temp += '<span>' + it + '</span></dd>'
                return temp
            });
            return '<dl>' + strArr.join('') + '</dl>'
        });
        $picker.find('.list').html(htmlArr.join(''));
        
        var calcTop = top + height
        if (top + height + huxing_height > window_height) {
            calcTop = top - huxing_height
        }
        $picker.css({
            left: left,
            top: calcTop
        }).show();
    }).on('mouseleave', function () {
        timer = setTimeout(function() {
            $picker.hide();
        }, 300);
    })

    $picker.on('mouseenter', function () {
        clearTimeout(timer);
    }).on('mouseleave', function () {
        $(this).hide()
    }).on('click', 'dd', function() {
        $(this).addClass('active').siblings().removeClass('active');
        var tempArr = [];
        var tempHtmlArr = [];
        $picker.find('dd.active').each(function () {
            tempArr.push($(this).index())
            tempHtmlArr.push('<span class="form-huxing-item">'+$(this).children('span').text()+'</span>')
        })
        $('#' + hid).find('.form-huxing-item-box').html(tempHtmlArr.join('')).next().val(tempArr.join(''))
    });
    $(window).bind({
        scroll: function() {
            window_height = $(window).height() + $(window).scrollTop();
        }
    });
}
)(window, jQuery);

$.extend({
    createModal: (function() {
        if ($.createModal) {
            $.createModal = $.createModal;
            return;
        }
        function toggleClass() {
            $('.jw-dialog .wrapper').toggleClass('in');
            $('.jw-modal').toggleClass('in');
        }
        $('body').on('click', '.jw-dialog', function(e) {
            if (e.target === this) {
                toggleClass();
                setTimeout(function() {
                    $(e.target).remove();
                    $('.jw-modal').remove();
                }, 300);
            }
        });
        return function(str) {
            if ($('.jw-dialog').length)
                return;
            var modalHtml = '<div class="jw-dialog"><div class="wrapper"><div class="content"><div class="right-icon"><div class="check-style-icon"></div></div><div class="title">' + str + '</div></div></div></div><div class="jw-modal"></div>';
            $('body').append(modalHtml);
            setTimeout(function() {
                toggleClass();
            }, 0);
        }
        ;
    }
    )()
});
// 报价函数开始
!(function(t) {
    var n = {};
    function a(e) {
        if (n[e])
            return n[e].exports;
        var r = n[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(r.exports, r, r.exports, a),
        r.l = !0,
        r.exports;
    }
    a.m = t,
    a.c = n,
    a.d = function(e, r, t) {
        a.o(e, r) || Object.defineProperty(e, r, {
            enumerable: !0,
            get: t
        });
    }
    ,
    a.r = function(e) {
        typeof Symbol !== 'undefined' && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: 'Module'
        }),
        Object.defineProperty(e, '__esModule', {
            value: !0
        });
    }
    ,
    a.t = function(r, e) {
        if (1 & e && (r = a(r)),
        8 & e)
            return r;
        if (4 & e && typeof r === 'object' && r && r.__esModule)
            return r;
        var t = Object.create(null);
        if (a.r(t),
        Object.defineProperty(t, 'default', {
            enumerable: !0,
            value: r
        }),
        2 & e && typeof r !== 'string')
            for (var n in r)
                a.d(t, n, function(e) {
                    return r[e];
                }
                .bind(null, n));
        return t;
    }
    ,
    a.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default;
        }
        : function() {
            return e;
        }
        ;
        return a.d(r, 'a', r),
        r;
    }
    ,
    a.o = function(e, r) {
        return Object.prototype.hasOwnProperty.call(e, r);
    }
    ,
    a.p = '',
    a(a.s = 0);
}([function(module, exports) {
    function _defineProperty(e, r, t) {
        return r in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[r] = t,
        e;
    }
    function _slicedToArray(e, r) {
        return _arrayWithHoles(e) || _iterableToArrayLimit(e, r) || _unsupportedIterableToArray(e, r) || _nonIterableRest();
    }
    function _nonIterableRest() {
        throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
    }
    function _unsupportedIterableToArray(e, r) {
        if (e) {
            if (typeof e === 'string')
                return _arrayLikeToArray(e, r);
            var t = Object.prototype.toString.call(e).slice(8, -1);
            return t === 'Object' && e.constructor && (t = e.constructor.name),
            t === 'Map' || t === 'Set' ? Array.from(e) : t === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(e, r) : void 0;
        }
    }
    function _arrayLikeToArray(e, r) {
        (r == null || r > e.length) && (r = e.length);
        for (var t = 0, n = new Array(r); t < r; t++)
            n[t] = e[t];
        return n;
    }
    function _iterableToArrayLimit(e, r) {
        if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(e)) {
            var t = [];
            var n = !0;
            var a = !1;
            var o = void 0;
            try {
                for (var i, l = e[Symbol.iterator](); !(n = (i = l.next()).done) && (t.push(i.value),
                !r || t.length !== r); n = !0)
                    ;
            } catch (e) {
                a = !0,
                o = e;
            } finally {
                try {
                    n || l.return == null || l.return();
                } finally {
                    if (a)
                        throw o;
                }
            }
            return t;
        }
    }
    function _arrayWithHoles(e) {
        if (Array.isArray(e))
            return e;
    }
    !(function(window, $) {
        var NUMBER_TYPE = 5;
        var USER_INPUT = 0;
        var STATIC = 1;
        var CAL = 2;
        var IS_PRODUCT = 1;
        var IS_IF = 2;
        var IS_IFS = 3;
        var id = 0;
        var fields = [];
        var cache = Object.create(null);
        var $currentForm = $('body');
        var createModalHtml;
        function floatFormat(e) {
            return typeof e !== 'string' && (e = parseFloat(e)),
            parseFloat(e.toFixed(2));
        }
        function PRODUCT() {
            for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++)
                r[t] = arguments[t];
            return floatFormat(r.reduce(function(e, r) {
                return e * r;
            }, 1));
        }
        function IF(e, r, t) {
            return floatFormat(Number(e ? r || 0 : t || 0));
        }
        function IFS(calc) {
            return calc = calc.split(';').map(function(e) {
                return e.replace(/\,/g, '?');
            }).join(':') + ':0',
            floatFormat(Number(eval(calc)));
        }
        function parseCal(e) {
            return e.split('-').map(function(e) {
                var r = _slicedToArray(e.split(':'), 2);
                var t = r[0];
                var n = r[1];
                return t === 'v' && (n = '{'.concat(n, '}')),
                t === 'c' && (n = ''),
                n;
            }).join('').replace(/([}\d])(=)([{\d])/g, '$1===$3').replace(/\{((?:.|\n)+?)\}/g, 'getFieldPrice($&)').replace(/[{}]/g, '');
        }
        function getDetailField(r) {
            return fields.find(function(e) {
                return e.id === r;
            });
        }
        function getOfferDetail(e) {
            function r(e) {
                return {
                    label: getFieldLabel(e),
                    price: getFieldPrice(e)
                };
            }
            return Array.isArray(e) ? e.map(r) : r(e);
        }
        function getFieldLabel(e) {
            return getDetailField(e).label;
        }
        function getFieldPrice(e) {
            if (cache[e])
                return cache[e];
            if (id++ > 299)
                throw new Error('函数之间不能循环调用！');
            var r = null;
            var t = getDetailField(e);
            if (!t || t.format !== NUMBER_TYPE)
                return 0;
            var n = t.h;
            var a = t.calcType;
            return n === USER_INPUT && (r = parseFloat($currentForm.find('[name="'.concat(e, '"]')).val()) || 0),
            n === STATIC && (r = parseFloat(t.data) || 0),
            n === CAL && (r = getCalValue(parseCal(t.calc), a)),
            cache[e] = r;
        }
        function getCalValue(calc, type) {
            var _calMap;
            var calMap = (_calMap = {},
            _defineProperty(_calMap, IS_PRODUCT, function() {
                return eval('PRODUCT('.concat(calc, ')'));
            }),
            _defineProperty(_calMap, IS_IF, function() {
                return eval('IF('.concat(calc, ')'));
            }),
            _defineProperty(_calMap, IS_IFS, function() {
                return IFS(calc);
            }),
            _calMap);
            return calMap[type]();
        }
        function toggleClass() {
            $('.jw-offer-dialog .offer-modal').toggleClass('in'),
            $('.jw-modal').toggleClass('in');
        }
        window.startOffer = function(e) {
            var r = e.offer;
            var t = e._id;
            if (fields = e.fields,
            id = 0,
            $currentForm = $(t ? '#ui-'.concat(t) : 'body'),
            cache = Object.create(null),
            r && window.$) {
                var n = r.tot.fieldId;
                var a = r.det.map(function(e) {
                    return e.fieldId;
                });
                return {
                    main: getOfferDetail(n),
                    detail: getOfferDetail(a)
                };
            }
        }
        ,
        $.createOfferModal || ($('body').on('click', '.close-button', function(e) {
            toggleClass(),
            setTimeout(function() {
                $('.jw-offer-dialog').remove(),
                $('.jw-modal').remove();
            }, 300);
        }),
        createModalHtml = function(e) {
            var r = startOffer(e);
            var t = $('\n    <div class="jw-offer-dialog">\n      <div class="offer-modal">\n        <div class="container">\n          <div class="main">\n          </div>\n          <div class="content">\n          </div>\n        </div>\n        <button type="button" class="close-button">\n          <span>关&nbsp;&nbsp;闭</span>\n        </button>\n      </div>\n    </div>\n    <div class="jw-modal"></div>\n    ');
            var n = r.main;
            var a = n.label;
            var o = n.price;
            var i = r.detail;
            var l = '\n      您的<span class="label">'.concat(a, '</span>\n          <div class="price"><span class="number">').concat(o, '</span>元</div>\n      ');
            var c = i.map(function(e) {
                var r = e.label;
                var t = e.price;
                return '\n      <div class="detail">\n        <span class="label">'.concat(r, '</span>：<span class="price">').concat(t, '</span>元\n      </div>\n        ');
            }).join('');
            return t.find('.main').append(l),
            t.find('.content').append(c),
            i.length || t.find('.content').remove(),
            t;
        }
        ,
        $.extend({
            createOfferModal: function(e) {
                $('.jw-offer-dialog').length || ($('body').append(createModalHtml(e)),
                setTimeout(function() {
                    toggleClass();
                }, 0));
            }
        }));
    }(window, jQuery));
}
]));
// 报价函数结束

// 百度推送代码
(function() {
    var script = document.createElement('script');
    script.src = '//push.zhanzhang.baidu.com/push.js';
    if (/^https/.test(window.location.protocol)){
        script.src = '//zz.bdstatic.com/linksubmit/push.js';
    }
    document.body.appendChild(script)
})();

(function () {
    $('.ui-page-product-list .category-aside-icon-arrow').on('click', function () {
        $(this).next().next().toggleClass('active')
    })
    $('.ui-page-product-list .category-aside-item-link.active').parent().addClass('active')
})();
