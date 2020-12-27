(function () {
  var type = ['ui-richtext', 'ui-picture', 'ui-button', 'ui-search-panel', 'ui-video', 'ui-form', 'ui-empty', 'ui-image-text', 'ui-article-list', 'ui-product-list', 'ui-many-image', 'ui-tabedx', 'ui-tabedy', 'ui-collapse']; // 文本 图片 按钮 搜索面板 留言表单 辅助分割 =====>同步动画+强调动画 // 图文信息 文章列表 产品列表 ======> 同步进场 + 异步进场 // 轮播图 横向标签 纵向标签 折叠标签
  var formatMap = { fadeIn: 1, moveIn: 2, zoomIn: 3, bounceIn: 4, flash: 5, rollIn: 6, flip: 7, elasticLarge: 8, elasticSmall: 9 };
  var formatStressMap = { flash: 50, bounce: 51, flip: 52, shake: 53, tada: 54, wobble: 55, swing: 56, rotating: 57, jello: 58, rubberBand: 59, translation: 60 };
  var direcMap = { Left: 1, Right: 2, Up: 3, Down: 4, LeftRight: 12, UpDown: 34 };
  var getFormatName = function (code, type) {
    var name = 'none';
    var mapData = type === 'stress' ? formatStressMap : formatMap;
    for (var item in mapData) {
      if (mapData[item] === code) {
        name = item;
        break;
      }
    }
    return name;
  };
  var getDirecName = function (code) {
    var name = '';
    for (var item in direcMap) {
      if (direcMap[item] === code) {
        name = item;
        break;
      }
    }
    return name;
  };
  var parseJson = function (data) {
    if (!data) {
      return null;
    }
    // var json = '"' + data + '"'; // `"${data}"`
    // data = data.replace(/\\/g, '');
    return JSON.parse(data);
  };
  var whichAnimationEvent = function () {
    var el = document.createElement('fakeelement');
    var animations = {
      animation: 'onanimationend',
      OAnimation: 'onoAnimationEnd',
      MozAnimation: 'onanimationend',
      WebkitAnimation: 'onwebkitAnimationEnd'
    };
    for (var t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
  };
  var animationEvent = whichAnimationEvent();

  var previewAnimate = function (dom, attrs, callback) {
    if (!dom) {
      return;
    }
    dom.style.animation = attrs.name + ' ' + attrs.duration + 's ease ' + attrs.delay + 's 1 both';
    dom.style.opacity = 1;
    // `${attrs.name} ${attrs.duration}s ease ${attrs.delay}s 1 both`
    if (animationEvent in document.documentElement) {
      dom[animationEvent] = function (e) {
        dom.style.animation = 'none';
        callback && callback();
      };
    } else {
      var times = (attrs.duration + attrs.delay) * 1000;
      setTimeout(function () {
        dom.style.animation = 'none';
        callback && callback();
      }, times);
    }
  };
  var previewStressAnimate = function (dom, attrs) { // 第一次动画的delay是delay，第二次的delay是间隔时间interval，循环n-1次
    if (!dom) {
      return;
    }
    dom.style.animation = attrs.name + ' ' + attrs.duration + 's ease ' + attrs.delay + 's 1 both';
    dom.style.opacity = 1;
    if (animationEvent in document.documentElement) {
      dom[animationEvent] = function (e) {
        dom.style.animation = 'none';
        if (attrs.n > 1) {
          setTimeout(function () {
            previewStressAnimate(dom, {
              name: attrs.name,
              duration: attrs.duration,
              delay: attrs.interval,
              interval: attrs.interval,
              n: --attrs.n
            });
          }, 0);
        }
      };
    } else { // 有浏览器无法监听动画结束事件  不清楚是什么原因
      var times = (attrs.duration + attrs.delay) * 1000;
      setTimeout(function () {
        dom.style.animation = 'none';
        if (attrs.n > 1) {
          setTimeout(function () {
            previewStressAnimate(dom, {
              name: attrs.name,
              duration: attrs.duration,
              delay: attrs.interval,
              interval: attrs.interval,
              n: --attrs.n
            });
          }, 5);
        }
      }, times);
    }
  };
  var stressAnimate = function (dom, data) {
    if (data && data.format) {
      previewStressAnimate(dom, {
        name: getFormatName(data.format, 'stress') + getDirecName(data.direc),
        duration: data.dur,
        delay: data.delay,
        interval: data.interval,
        n: data.n
      });
    }
  };
  var findParentNode = function (dom, type) {
    var parentNode = dom.parentNode;
    if (!parentNode) { // 如果
      return false;
    }
    if (parentNode.className && parentNode.className.indexOf(type) > -1) {
      return true;
    } else {
      return findParentNode(parentNode, type);
    }
  };
  var getAnimateDom = function (attr, excludes) {
    // excludes = excludes || ['ui-image-text', 'ui-article-list', 'ui-product-list'];
    excludes = excludes || [];
    return Array.from(document.querySelectorAll('[' + attr + ']'))
      .filter(function (dom) {
        // var isCarouselInFullmeasure = findParentNode(dom, 'el-carousel__container') && findParentNode(dom, 'ui-fullmeasure');
        var isCarouselInFullmeasure = findParentNode(dom, 'carousel-list-box') && findParentNode(dom, 'ui-fullmeasure');
        // var isInTab = findParentNode(dom, 'no-static-wrap');
        var isInTab = findParentNode(dom, 'ui-tabedy') || findParentNode(dom, 'ui-tabedx');
        var hasBlockClass = excludes.some(function (className) {
          return dom.className.indexOf(className) > -1;
        });
        return dom.getAttribute(attr).length && !isCarouselInFullmeasure && !isInTab && !hasBlockClass;
      });
  };
  var setDomInvisible = function () {
    // data-approach data-stress
    setTimeout(function () {
      var allMatchedDom = getAnimateDom('data-approach').concat(getAnimateDom('data-stress'));
      allMatchedDom.forEach(function (dom) {
        dom.style.opacity = 0;
      });
    }, 10);
  };
  // 获取元素是否在可视高度范围内
  var isElementInViewport = function (dom) {
    dom = findRealDom(dom);
    var rect = dom.getBoundingClientRect();
    var viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    return (rect.top > 0 && rect.top <= viewPortHeight - 50) || (rect.bottom > 0 && rect.bottom <= viewPortHeight);
  };
  var findRealDom = function (dom) { // 因为被vue渲染过了，所以不是真实的dom
    // var isVueRenderDom = ['ui-tabedx', 'ui-tabedy', 'ui-collapse'].some(function (cls) {
    //   return dom.className.indexOf(cls) >= 0;
    // });
    // if (isVueRenderDom) {
    //   var id = dom.id;
    //   if (id) {
    //     dom = document.getElementById(id);
    //   }
    // }
    return dom;
  };
  var loadAnimate = function (dom, type) {
    dom = findRealDom(dom);
    var approach = parseJson(dom.getAttribute('data-approach')); // 进场动画
    var stress = parseJson(dom.getAttribute('data-stress')); // 强调动画
    if (approach && approach.format) {
      if (approach.isAsyn) { // 是异步
        if (type === 'ui-image-text') { // 图文信息
          dom.style.opacity = 1;
          // var img = dom.querySelector('.img');
          var img = dom.querySelector('.ui-image-text-img');
          // var exp = dom.querySelector('.exp');
          var exp = dom.querySelector('.ui-image-text-info-box');
          var delay = 0;
          var dur = approach.dur;
          if (img) {
            if (exp) {
              dur = (dur / 2).toFixed(2);
            }
            previewAnimate(img, {
              name: getFormatName(approach.format) + getDirecName(approach.direc),
              duration: dur,
              delay: approach.delay
            });
            delay = dur;
          }
          if (exp) {
            dur = approach.dur;
            if (img) {
              dur = (dur / 2).toFixed(2);
            }
            previewAnimate(exp, {
              name: getFormatName(approach.format) + getDirecName(approach.direc),
              duration: dur,
              delay: delay
            });
          }
        }
        if (type === 'ui-article-list' || type === 'ui-product-list') { // 文章列表 or 产品列表
          dom.style.opacity = 1;
          // var childList = dom.querySelector('.list').querySelectorAll('li');
          var childList = dom.querySelectorAll('.carousel-item-box');
          delay = 0;
          dur = childList.length > 0 ? (approach.dur / childList.length).toFixed(2) : 0;
          dur = parseFloat(dur);
          for (var k = 0; k < childList.length; k++) {
            previewAnimate(childList[k], {
              name: getFormatName(approach.format) + getDirecName(approach.direc),
              duration: dur,
              delay: delay
            });
            delay += dur;
          }
        }
      } else {
        previewAnimate(dom, {
          name: getFormatName(approach.format) + getDirecName(approach.direc),
          duration: approach.dur,
          delay: approach.delay
        }, function () {
          stressAnimate(dom, stress);
        });
      }
    } else {
      stressAnimate(dom, stress);
    }
    dom.removeAttribute('data-approach');
    dom.removeAttribute('data-stress');
  };
  var domList = []; // 待执行动画的队列
  var queryDom = function () {
    for (var i = 0; i < type.length; i++) {
      var list = document.querySelectorAll('.' + type[i]);
      for (var j = 0; j < list.length; j++) {
        var isFullmeasure = findParentNode(list[j], 'ui-fullmeasure '); // 是否是通栏容器里面的元素
        var isCarousel = false;
        if (isFullmeasure) {
          // isCarousel = findParentNode(list[j], 'el-carousel__container'); // 是否是通栏容器轮播图里的元素
          isCarousel = findParentNode(list[j], 'carousel-list-box'); // 是否是通栏容器轮播图里的元素
        }
        if (isFullmeasure && isCarousel) { // 存在通栏容器 && 是轮播图时 不展示动画
          console.log('isFullmeasure isCarousel');
        } else if (isElementInViewport(list[j])) {
          loadAnimate(list[j], type[i]);
        } else {
          domList.push({
            dom: list[j],
            type: type[i]
          });
        }
      }
    }
  };
  var isQueryQueue = false; // 是否正在查询dom节点
  var queryDomList = function () {
    isQueryQueue = true;
    var list = [];
    for (var i = 0; i < domList.length; i++) {
      if (isElementInViewport(domList[i].dom)) {
        loadAnimate(domList[i].dom, domList[i].type);
      } else {
        list.push(domList[i]);
      }
    }
    domList = list;
    isQueryQueue = false;
  };
  var otherDomList = [];
  var loadOtherAnimate = function (dom, needPush) {
    setTimeout(function () {
      if (!isElementInViewport(dom)) {
        if (needPush === '0') { // 滚动时仍然不在可视范围内
          return;
        } else {
          otherDomList.push(dom); // 需要将该dom放入缓存，滚动时执行动画
          return;
        }
      }
      for (var i = 0; i < type.length; i++) {
        var list = dom.querySelectorAll('.' + type[i]);
        for (var j = 0; j < list.length; j++) {
          loadAnimate(list[j], type[i]);
        }
      }
    }, 200);
  };
  var queryOtherDom = function () {
    for (var i = 0; i < otherDomList.length; i++) {
      loadOtherAnimate(otherDomList[i], '0');
    }
  };
  var timer = null;
  var otherTimer = null;
  $(document).ready(function () {
    setDomInvisible();
    setTimeout(function () {
      queryDom();
    }, 20);
    $(document).scroll(function () {
      clearTimeout(timer);
      if (!isQueryQueue && domList.length > 0) {
        timer = setTimeout(function () {
          queryDomList();
        }, 200);
      }
      clearTimeout(otherTimer);
      otherTimer = setTimeout(function () {
        queryOtherDom();
      }, 200);
    });
  });
  this.loadOtherAnimate = loadOtherAnimate;
})();
