!(function (n) {
    var o = {};
    function i (e) {
      if (o[e]) return o[e].exports;
      var t = o[e] = {
        i: e,
        l: !1,
        exports: {}
      };
      return n[e].call(t.exports, t, t.exports, i),
      t.l = !0,
      t.exports;
    }
    i.m = n,
    i.c = o,
    i.d = function (e, t, n) {
      i.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: n
      });
    },
    i.r = function (e) {
      typeof Symbol !== 'undefined' && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: 'Module'
      }),
      Object.defineProperty(e, '__esModule', {
        value: !0
      });
    },
    i.t = function (t, e) {
      if (1 & e && (t = i(t)), 8 & e) return t;
      if (4 & e && typeof t === 'object' && t && t.__esModule) return t;
      var n = Object.create(null);
      if (i.r(n), Object.defineProperty(n, 'default', {
        enumerable: !0,
        value: t
      }), 2 & e && typeof t !== 'string') {
        for (var o in t) {
          i.d(n, o,
            function (e) {
              return t[e];
            }.bind(null, o));
        }
      }
      return n;
    },
    i.n = function (e) {
      var t = e && e.__esModule
        ? function () {
          return e
            .default;
        }
        : function () {
          return e;
        };
      return i.d(t, 'a', t),
      t;
    },
    i.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    },
    i.p = '',
    i(i.s = 12);
  }({
    12: function (e, t, n) {
      'use strict';
      function o () {
        this.regular = {
          realName: /([\u4e00-\u9fa5]{2,4})/,
          phone: /^[1][3456789][0-9]{9}$/,
          email: /^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/
        };
      }
      n.r(t),
      window.nodeUnitTrans = function (e) {
        var t; var a; var l; var n; var o = document.documentElement;
        var i = (window.screen.width || window.innerWidth) / 375;
        i != 1 && (t = parseFloat(window.getComputedStyle(o).fontSize), a = function (e) {
          return e.nodeType === 1;
        },
        l = function (e) {
          return parseFloat(e) && e ? (e = parseFloat(e)) * i / t + 'rem' : e;
        },
        e.style.display = 'none', n = window.getComputedStyle(e).height, e.style.height = l(n),
        (function e (t) {
          var i = ['width', 'height', 'left', 'top', 'fontSize', 'lineHeight'];
          var r = ['fontSize', 'lineHeight'];
          Array.prototype.slice.call(t.childNodes).forEach(function (n) {
            var o;
            a(n) && (o = window.getComputedStyle(n), i.forEach(function (e) {
              var t = o[e];
              if (t.indexOf('px') > -1 && parseFloat(t) !== 0) {
                if (r.includes(e) && n.firstElementChild) return;
                n.style[e] = l(t);
              }
            }), n.childNodes && n.childNodes.length && e(n));
          });
        }(e)), e.style.display = 'block');
      },
      o.prototype = {
        itop: function () {
          $('html, body').stop().animate({
            scrollTop: 0
          },
          200);
        },
        alert: function (e) {
          var t = '';
          var n = e.title || '提示';
          var o = $('<a href="javascript:;" class="close">关闭</a>');
          var i = ($('<button class="cancel">取消</button>'), $('<button class="confirm">确定</button>'));
          t += '<div class="ui-layer">',
          t += '<div class="inner">',
          t += '<div class="head">',
          t += '<h3>' + n + '</h3>',
          t += '</div>',
          t += '<div class="main">',
          t += '<p>' + e.content + '</p>',
          t += '</div>',
          t += '<div class="foot">',
          t += '<div class="button">',
          t += '</div>',
          t += '</div>',
          t += '</div>',
          t += '<div class="shadow"></div>',
          t += '</div>';
          var r = $(t);
          r.appendTo('body'),
          r.find('.head').append(o),
          r.find('.button').append(i),
          o.bind({
            click: function () {
              r.remove();
            }
          }),
          i.bind({
            click: function () {
              if (r.remove(), e.success) {
                return e.success({
                  confirm: !0
                });
              }
            }
          });
        },
        showToast: function (params) {
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
            click: function () {
              layer.remove();
            }
          });
          setTimeout(function () {
            layer.remove();
          }, duration);
        },
        bdmap: function (e) {
          var t = e.container || 'bdmap';
          var n = e.height || 400;
          var o = new BMap.Map(t);
          var i = new BMap.Point(e.longitude, e.latitude);
          var r = new BMap.Marker(i);
          document.getElementById(t).style.height = n + 'px',
          o.addOverlay(r),
          o.centerAndZoom(i, e.zoom),
          o.enableScrollWheelZoom(!0),
          o.addControl(new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT,
            type: BMAP_NAVIGATION_CONTROL_SMALL
          }));
          var a = {
            width: 320,
            height: 60,
            title: '<h3 style="color:#1b8dd0; font-size:16px; line-height:20px;">' + e.title + '</h3>',
            enableMessage: !1,
            message: ''
          };
          var l = new BMap.InfoWindow('<p style="color:#999; padding-top:5px; line-height:18px;">' + e.content + '</p>', a);
          r.addEventListener('click',
            function () {
              o.openInfoWindow(l, i);
            });
        },
        validate: function (params) {
          var that = this;
          var container = $('#' + params.container);
          container.find('[type="submit"]').bind({
            click: function (e) {
              var boolen = true;
              container.find('[data-required]').each(function (index, element) {
                var required = $(this).attr('data-required');
                var name = $(this).attr('name');
                var label = $(this).attr('label');
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
            focus: function () {
              if ($(this).val() == $(this).attr('placeholder')) {
                $(this).val('');
              }
            },
            blur: function () {
              if ($(this).val() == '') {
                $(this).val($(this).attr('placeholder'));
              }
            },
            keyup: function () {
              $(this).removeClass('error');
            }
          });
        },
        download: function (e, n) {
          var o;
          e != '' && n != '' && ((o = new XMLHttpRequest()).open('GET', e, !0), o.responseType = 'blob', o.onload = function () {
            var e, t;
            o.status === 200 && (window.navigator.msSaveOrOpenBlob ? navigator.msSaveBlob(o.response, n) : (e = document.createElement('a'), t = document.querySelector('body'), e.href = window.URL.createObjectURL(o.response), e.download = n, e.style.display = 'none', t.appendChild(e), e.click(), t.removeChild(e), window.URL.revokeObjectURL(e.href)));
          },
          o.send());
        },
        formatForceNumber: function (obj) {
          obj.value = obj.value.replace(/[^\d.]/g, '');
          obj.value = obj.value.replace(/\.{2,}/g, '.');
          obj.value = obj.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
          obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
          if (obj.value.indexOf('.') < 0 && obj.value != '') {
            obj.value = parseFloat(obj.value);
          }
        },
        sendSms: function (name) {
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
              scode.attr({'data-disabled': 'disabled'});
              function clicker () {
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
          };
        },
        refreshHits: function (params) {
            $.post(SCENEID + '/view', params)
        }
      },
      window.app = new o();
    }
  }));
  
  (function () {
    $('#ui-picture-fullscreen .close').bind({
      click: function () {
        $('#ui-picture-fullscreen').hide();
      }
    });
  })(window, jQuery);
  
  (function () {
    var top = $('.ui-header-box').height() - 1
    $('.ui-magic.fixed').each(function (index, item) {
      $(item).css('top', top + 'px')
      console.log(top, item.offsetHeight)
      top += item.offsetHeight
    })
  })(window, jQuery);
  
  (function () {
    $('.ui-form .form-huxing').on('click', function () {
      $(this).next().show()
    })
    $('.ui-form .form-huxing-drop-wrap .close').on('click', function () {
      var arr = [];
      var htm = '';
      var $box = $(this).parent().parent().parent()
      $box.find('.main dd.active').each(function () {
        arr.push($(this).index())
        htm += '<span class="form-huxing-item">'+$(this).children().text()+'</span>'
      })
      $box.prev().find('.form-huxing-item-box').html(htm).next().val(arr)
      $box.hide()
    })
    $('.ui-form .form-huxing-drop-wrap .main dd').on('click', function () {
      $(this).addClass('active').siblings().removeClass('active');
    })
    $('.ui-form .huxing').each(function () {
      var that = $(this);
      that.find('.drop dd').bind({
        click: function () {
          $(this).addClass('active').siblings().removeClass('active');
          var arr = [];
          var htm = '';
          that.find('.drop dl').each(function (item, index) {
            var dd = $(this).find('.active');
            if (dd) {
              arr.push(dd.index());
              htm += '<dd>' + dd.children('span').text() + '</dd>';
            } else {
              arr.push('');
              htm += '<dd></dd>';
            }
            that.find('.txt dl').html(htm);
            that.find('.txt input').val(arr);
          });
        }
      });
    });
  })(window, jQuery);
  
  $.extend({
    createModal: (function () {
      if ($.createModal) {
        $.createModal = $.createModal;
        return;
      }
      function toggleClass () {
        $('.jw-dialog .wrapper').toggleClass('in');
        $('.jw-modal').toggleClass('in');
      }
      $('body').on('click', '.jw-dialog', function (e) {
        if (e.target === this) {
          toggleClass();
          setTimeout(function () {
            $(e.target).remove();
            $('.jw-modal').remove();
          }, 300);
        }
      });
      return function (str) {
        if ($('.jw-dialog').length) return;
        var modalHtml =
                  '<div class="jw-dialog"><div class="wrapper"><div class="content"><div class="right-icon"><div class="check-style-icon"></div></div><div class="title">' +
                  str + '</div></div></div></div><div class="jw-modal"></div>';
        $('body').append(modalHtml);
        setTimeout(function () {
          toggleClass();
        }, 0);
      };
    })()
  });
  
  /* 报价函数开始
  !(function (t) { var n = {}; function a (e) { if (n[e]) return n[e].exports; var r = n[e] = { i: e, l: !1, exports: {} }; return t[e].call(r.exports, r, r.exports, a), r.l = !0, r.exports; }a.m = t, a.c = n, a.d = function (e, r, t) { a.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: t }); }, a.r = function (e) { typeof Symbol !== 'undefined' && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }), Object.defineProperty(e, '__esModule', { value: !0 }); }, a.t = function (r, e) { if (1 & e && (r = a(r)), 8 & e) return r; if (4 & e && typeof r === 'object' && r && r.__esModule) return r; var t = Object.create(null); if (a.r(t), Object.defineProperty(t, 'default', { enumerable: !0, value: r }), 2 & e && typeof r !== 'string') for (var n in r)a.d(t, n, function (e) { return r[e]; }.bind(null, n)); return t; }, a.n = function (e) { var r = e && e.__esModule ? function () { return e.default; } : function () { return e; }; return a.d(r, 'a', r), r; }, a.o = function (e, r) { return Object.prototype.hasOwnProperty.call(e, r); }, a.p = '', a(a.s = 0); }([function (module, exports) { function _defineProperty (e, r, t) { return r in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; } function _slicedToArray (e, r) { return _arrayWithHoles(e) || _iterableToArrayLimit(e, r) || _unsupportedIterableToArray(e, r) || _nonIterableRest(); } function _nonIterableRest () { throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'); } function _unsupportedIterableToArray (e, r) { if (e) { if (typeof e === 'string') return _arrayLikeToArray(e, r); var t = Object.prototype.toString.call(e).slice(8, -1); return t === 'Object' && e.constructor && (t = e.constructor.name), t === 'Map' || t === 'Set' ? Array.from(e) : t === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(e, r) : void 0; } } function _arrayLikeToArray (e, r) { (r == null || r > e.length) && (r = e.length); for (var t = 0, n = new Array(r); t < r; t++)n[t] = e[t]; return n; } function _iterableToArrayLimit (e, r) { if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(e)) { var t = []; var n = !0; var a = !1; var o = void 0; try { for (var i, l = e[Symbol.iterator](); !(n = (i = l.next()).done) && (t.push(i.value), !r || t.length !== r); n = !0); } catch (e) { a = !0, o = e; } finally { try { n || l.return == null || l.return(); } finally { if (a) throw o; } } return t; } } function _arrayWithHoles (e) { if (Array.isArray(e)) return e; }!(function (window, $) { var NUMBER_TYPE = 5; var USER_INPUT = 0; var STATIC = 1; var CAL = 2; var IS_PRODUCT = 1; var IS_IF = 2; var IS_IFS = 3; var id = 0; var fields = []; var cache = Object.create(null); var $currentForm = $('body'); var createModalHtml; function floatFormat (e) { return typeof e !== 'string' && (e = parseFloat(e)), parseFloat(e.toFixed(2)); } function PRODUCT () { for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++)r[t] = arguments[t]; return floatFormat(r.reduce(function (e, r) { return e * r; }, 1)); } function IF (e, r, t) { return floatFormat(Number(e ? r || 0 : t || 0)); } function IFS (calc) { return calc = calc.split(';').map(function (e) { return e.replace(/\,/g, '?'); }).join(':') + ':0', floatFormat(Number(eval(calc))); } function parseCal (e) { return e.split('-').map(function (e) { var r = _slicedToArray(e.split(':'), 2); var t = r[0]; var n = r[1]; return t === 'v' && (n = '{'.concat(n, '}')), t === 'c' && (n = ''), n; }).join('').replace(/([}\d])(=)([{\d])/g, '$1===$3').replace(/\{((?:.|\n)+?)\}/g, 'getFieldPrice($&)').replace(/[{}]/g, ''); } function getDetailField (r) { return fields.find(function (e) { return e.id === r; }); } function getOfferDetail (e) { function r (e) { return { label: getFieldLabel(e), price: getFieldPrice(e) }; } return Array.isArray(e) ? e.map(r) : r(e); } function getFieldLabel (e) { return getDetailField(e).label; } function getFieldPrice (e) { if (cache[e]) return cache[e]; if (id++ > 299) throw new Error('函数之间不能循环调用！'); var r = null; var t = getDetailField(e); if (!t || t.format !== NUMBER_TYPE) return 0; var n = t.h; var a = t.calcType; return n === USER_INPUT && (r = parseFloat($currentForm.find('[name="'.concat(e, '"]')).val()) || 0), n === STATIC && (r = parseFloat(t.data) || 0), n === CAL && (r = getCalValue(parseCal(t.calc), a)), cache[e] = r; } function getCalValue (calc, type) { var _calMap; var calMap = (_calMap = {}, _defineProperty(_calMap, IS_PRODUCT, function () { return eval('PRODUCT('.concat(calc, ')')); }), _defineProperty(_calMap, IS_IF, function () { return eval('IF('.concat(calc, ')')); }), _defineProperty(_calMap, IS_IFS, function () { return IFS(calc); }), _calMap); return calMap[type](); } function toggleClass () { $('.jw-offer-dialog .offer-modal').toggleClass('in'), $('.jw-modal').toggleClass('in'); }window.startOffer = function (e) { var r = e.offer; var t = e._id; if (fields = e.fields, id = 0, $currentForm = $(t ? '#ui-'.concat(t) : 'body'), cache = Object.create(null), r && window.$) { var n = r.tot.fieldId; var a = r.det.map(function (e) { return e.fieldId; }); return { main: getOfferDetail(n), detail: getOfferDetail(a) }; } }, $.createOfferModal || ($('body').on('click', '.close-button', function (e) { toggleClass(), setTimeout(function () { $('.jw-offer-dialog').remove(), $('.jw-modal').remove(); }, 300); }), createModalHtml = function (e) { var r = startOffer(e); var t = $('\n    <div class="jw-offer-dialog">\n      <div class="offer-modal">\n        <div class="container">\n          <div class="main">\n          </div>\n          <div class="content">\n          </div>\n        </div>\n        <button type="button" class="close-button">\n          <span>关&nbsp;&nbsp;闭</span>\n        </button>\n      </div>\n    </div>\n    <div class="jw-modal"></div>\n    '); var n = r.main; var a = n.label; var o = n.price; var i = r.detail; var l = '\n      您的<span class="label">'.concat(a, '</span>\n          <div class="price"><span class="number">').concat(o, '</span>元</div>\n      '); var c = i.map(function (e) { var r = e.label; var t = e.price; return '\n      <div class="detail">\n        <span class="label">'.concat(r, '</span>：<span class="price">').concat(t, '</span>元\n      </div>\n        '); }).join(''); return t.find('.main').append(l), t.find('.content').append(c), i.length || t.find('.content').remove(), t; }, $.extend({ createOfferModal: function (e) { $('.jw-offer-dialog').length || ($('body').append(createModalHtml(e)), setTimeout(function () { toggleClass(); }, 0)); } })); }(window, jQuery)); }]));
  */
  // 报价函数结束
  
  (function (window, $) {
    const [NUMBER_TYPE, USER_INPUT, STATIC, CAL] = [5, 0, 1, 2];
    // const [IS_PRODUCT, IS_IF, IS_IFS] = ['PRODUCT', 'IF', 'IFS']
    const [IS_PRODUCT, IS_IF, IS_IFS] = [1, 2, 3];
    let id = 0;
    let fields = [];
    let cache = Object.create(null);
    let $currentForm = $('body');
  
    function floatFormat (num) {
      if (typeof num !== 'string') num = parseFloat(num);
      return parseFloat(num.toFixed(2));
    }
  
    function PRODUCT (...args) {
      return floatFormat(args.reduce((acc, cur) => acc * cur, 1));
    }
  
    function IF (condition, ifResult, thenResult) {
      return floatFormat(Number(condition ? (ifResult || 0) : (thenResult || 0)));
    }
  
    function IFS (calc) {
      calc = calc.split(';').map(str => str.replace(/\,/g, '?')).join(':') + ':0';
      return floatFormat(Number(eval(calc)));
    }
  
    function parseCal (calc) {
      const equalReg = /([}\d])(=)([{\d])/g;
      const formatReg = /\{((?:.|\n)+?)\}/g;
      const clearReg = /[{}]/g;
      const formatCal = calc.split('-').map(item => {
        let [t, v] = item.split(':');
        if (t === 'v') v = `{${v}}`;
        if (t === 'c') v = '';
        return v;
      }).join('');
      console.log('formatCal ==> ', formatCal)
      return formatCal
        .replace(equalReg, '$1===$3')
        .replace(formatReg, 'getFieldPrice($&)')
        .replace(clearReg, '');
    }
  
    function getDetailField (field) {
      return fields.find(({ id }) => id === field);
    }
  
    function getOfferDetail (fields) {
      const getSingleOffer = field => ({
        label: getFieldLabel(field),
        price: getFieldPrice(field)
      });
  
      if (Array.isArray(fields)) {
        return fields.map(getSingleOffer);
      } else {
        return getSingleOffer(fields);
      }
    }
  
    function getFieldLabel (field) {
      return getDetailField(field).label;
    }
  
    function getFieldPrice (field) {
      if (cache[field]) return cache[field]; // 如果有，直接调用缓存
      // 最大调用次数为299
      if (id++ > 299) {
        throw new Error('函数之间不能循环调用！');
      }
      let result = null;
      const fieldDetail = getDetailField(field);
  
      if (!fieldDetail || fieldDetail.format !== NUMBER_TYPE) return 0;
  
      const {
        h: type,
        calcType
      } = fieldDetail;
        // h 0- 用户输入，1： 固定值 ，2：公式计算
      if (type === USER_INPUT) {
        result = parseFloat($currentForm.find(`[name="${field}"]`).val()) || 0;
      }
  
      if (type === STATIC) {
        result = parseFloat(fieldDetail.data) || 0;
      }
  
      if (type === CAL) {
        const parsedCal = parseCal(fieldDetail.calc);
        result = getCalValue(parsedCal, calcType);
      }
      cache[field] = result;
      console.log('result ==> ', result)
  
      return result;
    }
  
    function getCalValue (calc, type) {
      const calMap = {
        [IS_PRODUCT]: () => {
          return eval(`PRODUCT(${calc})`);
        },
        [IS_IF]: () => {
          return eval(`IF(${calc})`);
        },
        [IS_IFS]: () => {
          return IFS(calc);
        }
      };
  
      return calMap[type]();
    }
  
    window.startOffer = (form) => {
      console.log('form ==> ', form)
      const { offer, _id } = form;
      fields = form.fields;
      id = 0;
      $currentForm = $(_id ? `#ui-${_id}` : 'body');
      cache = Object.create(null);
  
      if (!offer || !window.$) return;
  
      const mainField = offer.tot.fieldId;
      const titleFields = offer.det.map(({
        fieldId
      }) => fieldId);
      return {
        main: getOfferDetail(mainField),
        detail: getOfferDetail(titleFields)
      };
    };
  
    if ($.createOfferModal) {
      return;
    }
  
    function toggleClass () {
      $('.jw-offer-dialog .offer-modal').toggleClass('in');
      $('.jw-modal').toggleClass('in');
    }
    $('body').on('click', '.close-button', function (e) {
      toggleClass();
      setTimeout(function () {
        $('.jw-offer-dialog').remove();
        $('.jw-modal').remove();
      }, 300);
    });
    const createModalHtml = (form) => {
      const priceMap = startOffer(form);
      const $main = $(`
      <div class="jw-offer-dialog">
        <div class="offer-modal">
          <div class="container">
            <div class="main">
            </div>
            <div class="content">
            </div>
          </div>
          <button type="button" class="close-button">
            <span>关&nbsp;&nbsp;闭</span>
          </button>
        </div>
      </div>
      <div class="jw-modal"></div>
      `);
      const {
        main: {
          label,
          price
        },
        detail
      } = priceMap;
      const mainOfferHtml = `
        您的<span class="label">${label}</span>
            <div class="price"><span class="number">${price}</span>元</div>
        `;
      const detailOfferHtml = detail.map(({
        label,
        price
      }) => {
        return `
        <div class="detail">
          <span class="label">${label}</span>：<span class="price">${price}</span>元
        </div>
          `;
      }).join('');
  
      $main.find('.main').append(mainOfferHtml);
      $main.find('.content').append(detailOfferHtml);
      if (!detail.length) $main.find('.content').remove();
      return $main;
    };
  
    $.extend({
      createOfferModal: function (form) {
        if ($('.jw-offer-dialog').length) return;
        $('body').append(createModalHtml(form));
        setTimeout(function () {
          toggleClass();
        }, 0);
      }
    });
  })(window, jQuery);
  
  (function () {
    var url = window.location.pathname;
    var $active = $('.ui-tabbar [href="'+url+'"]')
    if ($active.find('.ui-tabbar-item-selected-img').attr('src')) {
      $active.addClass('active')
    }
  })(window, jQuery);
  
  (function () {
      // 导航栏
      $('.ui-header-box .ui-header-content-box').on('click', '.icon-daohang', function () {
          var $nav = $('.ui-nav').show()
          if ($nav.hasClass('layout-1') || $nav.hasClass('layout-0')) {
              $(this).removeClass('icon-daohang').addClass('icon-guanbi')
          }
      })
      $('.ui-header-box .ui-header-content-box').on('click', '.icon-guanbi', function () {
        var $nav = $('.ui-nav').hide()
        if ($nav.hasClass('layout-1') || $nav.hasClass('layout-0')) {
            $(this).removeClass('icon-guanbi').addClass('icon-daohang')
        }
      })
      $('.ui-nav.layout-1,.ui-nav.layout-2').on('click', '.icon-xiala-copy', function () {
          if ($(this).hasClass('active')) {
            $(this).removeClass('active').next().next().hide()
          } else {
            $(this).addClass('active').next().next().show()
          }
      })

      $('.ui-header-box .nav-layout-2-icon .icon-daohang').on('click', function () {
          $(this).parent().next().show()
      })
      $('.ui-nav.layout-3').on('click', '.icon-xiala-copy', function (e) {
          $(this).addClass('active')
          var arr = []
          $(this).next().next().find('.ui-nav-second-menu').each(function (index, item) {
              arr.push(item)
          })
          var $box = $('.ui-nav .ui-nav-float-box').empty().show()
          for (var i = 0; i < arr.length; i++) {
            $box.append(arr[i])
          }
          var top = $(this).parent().offset().top + 44;
          var left = $(this).parent().offset().left;
          var width = $(this).parent().width();
          $box.css({
              width: width,
              left: left,
              top: top
          })
      })
      $('.ui-nav.layout-3').on('touchmove', function () {
        $('.ui-nav .ui-nav-float-box').hide()
      })
      $('.ui-nav.layout-2').on('click', '.icon-guanbi', function () {
        $('.ui-nav.layout-2').hide()
      })

    // 搜索
    $('.ui-header-box .icon-sousuo1').on('click', function () {
        $('body').css({'overflow': 'hidden'})
        $('.ui-search-dialog').show().find('.ui-search-input').focus()
    })

    $('.ui-search-dialog [data-cancel]').on('click', function () {
        $('body').css({'overflow': ''})
        $('.ui-search-dialog').hide()
    })
    $('.ui-search-dialog .ui-search-input').on('keyup', function () {
        var key = $(this).val().trim()
        if (key) {
            $(this).prev().find('[data-cancel]').removeClass('active').prev().addClass('active')
        } else {
            $(this).prev().find('[data-cancel]').addClass('active').prev().removeClass('active')
        }
    })
    $('.ui-search-dialog [data-search]').on('click', function () {
        var value = $(this).parent().next().val().trim()
        searchUrl(value)
    })

    $('.ui-search-dialog .ui-search-key').on('click', function () {
        var value = $(this).text()
        searchUrl (value);
    })
    function searchUrl (keywords) {
      var type =  $('.ui-search-dialog .ui-search-input').data('type')
      type = ['', 'article', 'product'][type]
      window.location.href = SCENEID + '/' + type + '/search-' + keywords + '.html'
    }
  })(window, jQuery);

(function () {
  $('[data-prew="true"]').on('click', function () {
    var src = $(this).find('.ui-picture-img').attr('src')
    $('#ui-picture-fullscreen').find('.img').attr({'style': 'background-image: url('+ src +')'}).end().show();
  })
})();
// 百度推送代码
(function() {
  var script = document.createElement('script');
  script.src = '//push.zhanzhang.baidu.com/push.js';
  if (/^https/.test(window.location.protocol)){
      script.src = '//zz.bdstatic.com/linksubmit/push.js';
  }
  document.body.appendChild(script)
})();
