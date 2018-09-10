"use strict";var TJY=TJY||{};TJY.v="a1.4.1",TJY.checkBrowser=function(){return{mozilla:/firefox/.test(navigator.userAgent.toLowerCase()),webkit:/webkit/.test(navigator.userAgent.toLowerCase()),opera:/opera/.test(navigator.userAgent.toLowerCase()),msie:/msie/.test(navigator.userAgent.toLowerCase())}},TJY.pageHeight=function(){return TJY.checkBrowser().msie?"CSS1Compat"==document.compatMode?document.documentElement.clientHeight:document.body.clientHeight:self.innerHeight},TJY.pageWidth=function(){return TJY.checkBrowser().msie?"CSS1Compat"==document.compatMode?document.documentElement.clientWidth:document.body.clientWidth:self.innerWidth},TJY.TreeSelector=function(item,data,rootId,defaultValue){this._data=data,this._item=item,this._rootId=rootId,defaultValue&&(this.defaultValue=defaultValue)},TJY.TreeSelector.prototype.createTree=function(){for(var len=this._data.length,i=0;i<len;i++)if(this._data[i].pid==this._rootId){this._item.options.add(new Option(" "+this._data[i].text,this._data[i].id));for(var j=0;j<len;j++)this.createSubOption(len,this._data[i],this._data[j])}this.defaultValue&&(this._item.value=this.defaultValue)},TJY.TreeSelector.prototype.createSubOption=function(len,current,next){var blank="..";if(next.pid==current.id){intLevel=0;var intlvl=this.getLevel(this._data,this._rootId,current);for(a=0;a<intlvl;a++)blank+="..";blank+="├-",this._item.options.add(new Option(blank+next.text,next.id));for(var j=0;j<len;j++)this.createSubOption(len,next,this._data[j])}},TJY.TreeSelector.prototype.getLevel=function(datasources,topId,currentitem){var pid=currentitem.pid;if(pid!=topId)for(var i=0;i<datasources.length;i++)datasources[i].id==pid&&(intLevel++,this.getLevel(datasources,topId,datasources[i]));return intLevel},TJY.multSelect=function(opts){for(var e1=document.getElementById(opts.left),e2=document.getElementById(opts.right),i=0;i<e1.options.length;i++)if(e1.options[i].selected){var e=e1.options[i];e2.options.add(new Option(e.text,e.value)),e1.remove(i),i-=1}document.getElementById(opts.val).value=function(geto){for(var ids=[],i=0;i<geto.options.length;i++)ids.push(geto.options[i].value);return ids.join(",")}(document.getElementById(opts.vtarget))},TJY.digitalOnly=function(obj){obj.value=obj.value.replace(/\D/g,"")},TJY.getScrollTop=function(){var scrollTop=0;return document.documentElement&&document.documentElement.scrollTop?scrollTop=document.documentElement.scrollTop:document.body&&(scrollTop=document.body.scrollTop),scrollTop},TJY.getScrollHeight=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},TJY.isNumberKey=function(evt){var charCode=evt.which?evt.which:event.keyCode;return!(31<charCode&&(charCode<48||57<charCode))},TJY.isNumberdoteKey=function(evt){var e=evt||window.event,srcElement=e.srcElement||e.target,charCode=evt.which?evt.which:event.keyCode;if(31<charCode&&(charCode<48||57<charCode)&&46!=charCode)return!1;if(46==charCode){var s=srcElement.value;if(0==s.length||-1!=s.indexOf("."))return!1}return!0},TJY.isNumberCharKey=function(evt){var e=evt||window.event,charCode=(e.srcElement||e.target,evt.which?evt.which:event.keyCode);return 48<=charCode&&charCode<=57||65<=charCode&&charCode<=90||97<=charCode&&charCode<=122||8==charCode},TJY.isChinese=function(obj,isReplace){return!!/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/i.test(obj.value)&&(isReplace&&(obj.value=obj.value.replace(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi,"")),!0)},Number.prototype.toFixed=function(exponent){return parseInt(this*Math.pow(10,exponent)+.5)/Math.pow(10,exponent)},TJY.isUserName=function(evt){var charCode=(evt=evt||window.event).which?evt.which:evt.keyCode;return 95==charCode||46==charCode||64==charCode||48<=charCode&&charCode<=57||65<=charCode&&charCode<=90||97<=charCode&&charCode<=122||8==charCode},TJY.isEmail=function(v){return new RegExp("^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$").test(v)},TJY.isTel=function(v){return new RegExp("^[[0-9]{3}-|[0-9]{4}-]?([0-9]{8}|[0-9]{7})?$").test(v)},TJY.isPhone=function(v){return new RegExp("^[1][0-9]{10}$").test(v)},TJY.isUrl=function(str){return null!=str&&""!=str&&null!=str.match(/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\’:+!]*([^<>\"])*$/)},TJY.getTimeDiff=function(startTime,endTime,diffType){startTime=startTime.replace(/-/g,"/"),endTime=endTime.replace(/-/g,"/"),diffType=diffType.toLowerCase();var sTime=new Date(startTime),eTime=new Date(endTime),divNum=1;switch(diffType){case"second":divNum=1e3;break;case"minute":divNum=6e4;break;case"hour":divNum=36e5;break;case"day":divNum=864e5}return parseInt((eTime.getTime()-sTime.getTime())/parseInt(divNum))},TJY.cutStr=function(str,len){if(!str||""==str)return"";for(var strlen=0,s="",i=0;i<str.length;i++){if(len<=strlen)return s+"...";128<str.charCodeAt(i)?strlen+=2:strlen++,s+=str.charAt(i)}return s},TJY.checkChks=function(obj,cobj){$(cobj).each(function(){$(this)[0].checked=obj.checked})},TJY.getChks=function(obj){var ids=[];return $(obj).each(function(){$(this)[0].checked&&ids.push($(this).val())}),ids},TJY.showHide=function(t,str){var s=str.split(",");if(t)for(var i=0;i<s.length;i++)$(s[i]).show();else for(i=0;i<s.length;i++)$(s[i]).hide();s=null},TJY.blank=function(str,defaultVal){return"0000-00-00"==str&&(str=""),"0000-00-00 00:00:00"==str&&(str=""),str||(str=""),"null"==typeof str&&(str=""),void 0===str&&(str=""),""==str&&defaultVal&&(str=defaultVal),str},TJY.limitDecimal=function(obj,len){var s=obj.value;-1<s.indexOf(".")&&s.length-s.indexOf(".")-1>len&&(obj.value=s.substring(0,s.indexOf(".")+len+1)),s=null},TJY.getParams=function(obj){var s,params={},chk={};return $(obj).each(function(){"hidden"==$(this)[0].type||"number"==$(this)[0].type||"tel"==$(this)[0].type||"password"==$(this)[0].type||"select-one"==$(this)[0].type||"textarea"==$(this)[0].type||"text"==$(this)[0].type?params[$(this).attr("id")]=$.trim($(this).val()):"radio"==$(this)[0].type?$(this).attr("name")&&(params[$(this).attr("name")]=$("input[name="+$(this).attr("name")+"]:checked").val()):"checkbox"==$(this)[0].type&&$(this).attr("name")&&!chk[$(this).attr("name")]&&(s=[],chk[$(this).attr("name")]=1,$("input[name="+$(this).attr("name")+"]:checked").each(function(){s.push($(this).val())}),params[$(this).attr("name")]=s.join(","))}),s=chk=null,params},TJY.setValue=function(name,value){var input,val,first=name.substr(0,1),i=0;if((input="#"===first||"."===first?$(name):$("[name='"+name+"']")).eq(0).is(":radio"))input.filter("[value='"+value+"']").each(function(){this.checked=!0});else if(input.eq(0).is(":checkbox"))for($.isArray(value)?val=value:(val=new Array)[0]=value,i=0,len=val.length;i<len;i++)input.filter("[value='"+val[i]+"']").each(function(){this.checked=!0});else input.val(value)},TJY.setValues=function(obj){for(var key in obj)$("#"+key)[0]?TJY.setValue("#"+key,obj[key]):$("[name='"+key+"']")[0]&&TJY.setValue(key,obj[key])},TJY.parse_url=function(url){var parse=url.match(/^(?:([a-z]+):\/\/)?([\w-]+(?:\.[\w-]+)+)?(?::(\d+))?([\w-\/]+)?(?:\?((?:\w+=[^#&=\/]*)?(?:&\w+=[^#&=\/]*)*))?(?:#([\w-]+))?$/i);return parse||$.error("url格式不正确！"),{scheme:parse[1],host:parse[2],port:parse[3],path:parse[4],query:parse[5],fragment:parse[6]}},TJY.parse_str=function(str){for(var param,value=str.split("&"),vars={},i=0;i<value.length;i++)vars[(param=value[i].split("="))[0]]=param[1];return vars};