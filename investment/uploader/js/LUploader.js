/*
 * LUploader图片压缩上传插件
 * 
 * 作者：黄磊
 * 
 * 报告漏洞，意见或建议, 请联系邮箱：xfhxbb@yeah.net
 * 
 * 创建于：2016年3月16日
 * 
 * Copyright 2016
 *
 * 获得使用本类库的许可, 您必须保留著作权声明信息。
 *
 */
(function() {
    window.LUploader = function(el, params) {
        var _self = this;
        _self.trigger=el;
        _self.params = {
            accept: 'image/*',
            multiple: false,
            maxsize: 102400,
            imgObj: {},
            showsize: false,
            quality:0.1,
            url: ''
        }
        for (var param in params) {
            _self.params[param] = params[param];
        }
        _self.init();
    };
    LUploader.prototype.init = function() {
        var _self = this;
        _self.trigger.setAttribute('accept', _self.params.accept);
        _self.params.multiple && _self.trigger.setAttribute('multiple', '');

        var btn = document.querySelector('#' + _self.trigger.getAttribute('data-LUploader'));
        btn.addEventListener('click', function() {
            _self.trigger.click();
        });
        _self.trigger.addEventListener('change', function() {
            if (!this.files.length) return;
            var files = Array.prototype.slice.call(this.files);
            files.forEach(function(file, i) {
                if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
                var reader = new FileReader();
                _self.params.imgObj.size = file.size / 1024 > 1024 ? (~~(10 * file.size / 1024 / 1024)) / 10 + "MB" : ~~(file.size / 1024) + "KB";
                var li = document.createElement("li");
                li.innerHTML = '';//'<div class="LUploader-progress"><span></span></div>';
                if (_self.params.showsize) {
                    var div_size = document.createElement('div');
                    div_size.className = 'LUploader-size';
                    div_size.textContent = _self.params.imgObj.size;
                    li.appendChild(div_size);
                }
                var LUploaderList = _self.trigger.parentElement.querySelector('.LUploader-list');
                if (!_self.params.multiple) { //假如是单个上传
                    if (_self.old_li) {
                        LUploaderList.removeChild(_self.old_li);
                    } else {
                        _self.old_li = li;
                    }
                }
                LUploaderList.appendChild(li);
                LUploaderList.parentElement.nextElementSibling.style['display'] = 'none';
                //图片预览
                reader.onload = function() {
                    var params = dataSet(_self.trigger);
                    var url = _self.params.url;
                    var result = this.result;
                    var img = new Image();
                    _self.params.imgObj.src = img.src = result;                      					//console.log({"params":params,"url":url,"result":result,"img":img,"_self.params.imgObj.src":_self.params.imgObj.src});
                    li.style['background-image'] = 'url(' + result + ')';
                    li.parentElement.setAttribute("imgUrl",result);
                    console.log({"url":url,"img":img,"params":params,"file.type":file.type,"li":li,"compress":_self.compress});
/*                    if (result.length <= _self.params.maxsize) {
                        img = null;
                        _self.upload(url, params, result, file.type, li);
                        return;
                    }*/
                    if (img.complete) {
                    	console.log("img.complete");
                        /*callback();*/
                    } else {
                        img.onload = callback;
                        console.log("img.onload");
                    }
/*                    function callback() {
                        var data = _self.compress(img);                
                        img = null;
                    }*/
                };
                reader.readAsDataURL(file);
            });
        });
    };

    

    function isArray(arr) {
        if (Object.prototype.toString.apply(arr) === '[object Array]') return true;
        else return false;
    };
	//序列化对象
    function serializeObject(obj) {
    	/*console.log("obj",obj);*/
        if (typeof obj === 'string') return obj;
        var resultArray = [];
        var separator = '&';
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (isArray(obj[prop])) {
                    var toPush = [];
                    for (var i = 0; i < obj[prop].length; i++) {
                        toPush.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop][i]));
                    }
                    if (toPush.length > 0) resultArray.push(toPush.join(separator));
                } else {
                    resultArray.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
                }
            }

        }
        console.log("DataChannel",resultArray.join(separator));
        return resultArray.join(separator);
    };

    function dataSet(el) {
        var dataset = {};
        for (var i = 0; i < el.attributes.length; i++) {
            var attr = el.attributes[i];
            if (attr.name.indexOf('data-') >= 0) {
                dataset[toCamelCase(attr.name.split('data-')[1])] = attr.value;
            }
        }
        return dataset;
    }

    function toCamelCase(string) {
        return string.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    };
})();
