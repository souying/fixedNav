;(function(undefined) {
        "use strict"
        var _global;
        // 工具函数
        // 对象合并函数
        function extend(o,n,override) {   
            for(var key in n){
                if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
                    o[key]=n[key];
                }
            }
            return o;     
        };
         // 插件构造函数 - 返回数组结构
        function fixed(opt){
            // console.log(this.init)
            this.init(opt);
        };

        fixed.prototype = {
            constructor: this,
            init:function(opt){
                // 默认参数
                var fixed = {
                    elem : ''
                };
                this.fixed = extend(fixed,opt,true);
                var _self = this;
                if(_self.fixed.elem!=''){
                    // console.log(_self.fixed.elem)
                    var elem = document.querySelector(_self.fixed.elem);
                    elem.style.zIndex = 99;
                    var top = _self.position(elem).top;
                    // console.log(top)
                    window.onscroll = function(){
                        // console.log(this)
                        var scrolls = _self.scroll(this).top;
                        // console.log(scrolls)
                        if (scrolls > top) {
                            if (window.XMLHttpRequest) {
                                elem.style.position = 'fixed';
                                elem.style.top = 0;
                            } else {
                                elem.style.top = scrolls; 
                            }
                        }else{
                            elem.style.position = 'static';
                            elem.style.top = top;
                        }
                    }
                }
                
            },
            position:function(target) {
                return {
                    top: target.offsetTop,
                    left: target.offsetLeft,
                }
            },
            scroll:function() {
                if(window.pageYOffset != null)  //  ie9+ 和其他浏览器
                {
                    return {
                        left: window.pageXOffset,
                        top: window.pageYOffset
                    }
                }
                else if(document.compatMode == "CSS1Compat")  // 声明的了 DTD
                  // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>
                {
                    return {
                        left: document.documentElement.scrollLeft,
                        top: document.documentElement.scrollTop
                    }
                }
                return { //  剩下的肯定是怪异模式的
                    left: document.body.scrollLeft,
                    top: document.body.scrollTop
                }
            },
        }

       // 最后将插件对象暴露给全局对象
        _global = (function(){ return this || (0, eval)('this'); }());
        if (typeof module !== "undefined" && module.exports) {
            module.exports = fixed;
        } else if (typeof define === "function" && define.amd) {
            define(function(){return fixed;});
        } else {
            !('fixed' in _global) && (_global.fixed = fixed);
        }
    }());