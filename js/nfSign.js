"use strict";function getUrlParams(name){var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)","i"),r=window.location.search.substr(1).match(reg);return null!=r?unescape(r[2]):null}var olDate,userID=getUrlParams("userId"),dateArray=[],dateM=[],dateList=[],$dateBox=$("#js-qiandao-list"),$currentDate=$(".current-date"),$qiandaoBtn=$("#qiandaoBtn"),_html="",_handle=!0,myDate=new Date;$currentDate.text(myDate.getFullYear()+"年"+parseInt(myDate.getMonth()+1)+"月"+myDate.getDate()+"日");for(var monthFirst=new Date(myDate.getFullYear(),parseInt(myDate.getMonth()),1).getDay(),d=new Date(myDate.getFullYear(),parseInt(myDate.getMonth()+1),0),totalDay=d.getDate(),len=35<totalDay+monthFirst?42:35,isFirst=!0,i=0;i<len;i++)_html+=' <li><div class="qiandao-icon"></div></li>';$dateBox.html(_html);var $dateLi=$dateBox.find("li");null==userID&&(_handle=!1);for(i=0;i<totalDay;i++)$dateLi.eq(i+monthFirst).addClass("date"+parseInt(i+1)),$dateLi.eq(i+monthFirst).text(i+1);function qiandaoFun(){$qiandaoBtn.addClass("btnActived"),$qiandaoBtn.text("明日再来签到")}function qiandaoShow(){_handle=!1,axios.post(ajaxUrl+"/sign/in?userId="+userID+"&isSubmit=1").then(function(response){console.log(response),$(".date"+myDate.getDate()).addClass("qiandaoActive");var getMoney=response.data.getMoney;signIn(getMoney=getMoney.toFixed(2))}).catch(function(error){console.log(error)})}function signIn(getGold){var u=navigator.userAgent,isAndroid=-1<u.indexOf("Android")||-1<u.indexOf("Adr"),isiOS=!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);isAndroid?window.jsi.signIn(getGold):isiOS&&window.webkit.messageHandlers.signIn.postMessage(getGold)}function signRewardStyle(){$(".date"+(myDate.getDate()-1)).hasClass("qiandaoActive")||($(".qiandaoActive0").removeClass("qiandaoActive0"),$(".qiandaoActive1").removeClass("qiandaoActive1"),$(".qiandaoActive2").removeClass("qiandaoActive2"),$(".qiandaoActive3").removeClass("qiandaoActive3"),[myDate.getDate()+6,myDate.getDate()+12,myDate.getDate()+18,myDate.getDate()+24].forEach(function(item,index){}))}axios.post(ajaxUrl+"/sign/in?userId="+userID+"&isSubmit=0").then(function(response){console.log("签到详情",response),"今天还没签到"!=response.data.msg&&(_handle=!1,qiandaoFun());new Array;response.data.signList?response.data.signList.forEach(function(items,index){dateArray.push(items.createDate.split(" ")[0].substr(8,2))}):dateArray=[],console.log("已经签到数组",dateArray),$dateLi.each(function(index,item){index+1-monthFirst<myDate.getDate()&&(item.style.color="#b2b2b2")});for(var k=0;k<dateArray.length;k++)dateArray[k]==parseInt(dateArray[k+1])+1&&dateM.unshift(dateArray[k]);dateM.unshift(dateArray[dateM.length]),console.log({dateArray:dateArray,dataM:dateM,totalDay:totalDay});for(var i=0;i<totalDay;i++)$dateLi.eq(i+monthFirst).addClass("date"+parseInt(i+1)),$dateLi.eq(i+monthFirst).text(i+1);dateM.map(function(item,index){var inde=parseInt(item);console.log(".date"+inde),$(".date"+inde).addClass("qiandaoActive")})}).catch(function(error){console.log("error")}),$(".date"+myDate.getDate()).hasClass("qiandaoActive")?_handle=!1:$(".date"+myDate.getDate()).addClass("able-qiandao"),$dateBox.on("click","li",function(){if(!_handle)return!1;$(this).text()==myDate.getDate()&&(qiandaoShow(),qiandaoFun())}),$qiandaoBtn.on("click",function(){if(console.log("按钮签到",_handle),!_handle)return!1;qiandaoShow(),qiandaoFun()});