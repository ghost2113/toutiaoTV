"use strict";var overscroll=function(el){el.addEventListener("touchstart",function(){var top=el.scrollTop,totalScroll=el.scrollHeight,currentScroll=top+el.offsetHeight;0===top?el.scrollTop=1:currentScroll===totalScroll&&(el.scrollTop=top-1)}),el.addEventListener("touchmove",function(evt){el.offsetHeight<el.scrollHeight&&(evt._isScroller=!0)})};overscroll(document.querySelector("#main")),document.body.addEventListener("touchmove",function(evt){evt._isScroller||evt.preventDefault()});var signFun=function(){var reg,r,userID=(reg=new RegExp("(^|&)"+"userId"+"=([^&]*)(&|$)","i"),null!=(r=window.location.search.substr(1).match(reg))?unescape(r[2]):null);console.log({"用户userId":userID,"地址":window.location.search});var dateArray=[],dateM=[],$dateBox=$("#js-qiandao-list"),$currentDate=$(".current-date"),$qiandaoBtn=$("#qiandaoBtn"),_html="",_handle=!0,myDate=new Date;$currentDate.text(myDate.getFullYear()+"年"+parseInt(myDate.getMonth()+1)+"月"+myDate.getDate()+"日");for(var monthFirst=new Date(myDate.getFullYear(),parseInt(myDate.getMonth()),1).getDay(),totalDay=new Date(myDate.getFullYear(),parseInt(myDate.getMonth()+1),0).getDate(),len=35<totalDay+monthFirst?42:35,isFirst=!0,i=0;i<len;i++)_html+=' <li><div class="qiandao-icon"></div></li>';$dateBox.html(_html);var $dateLi=$dateBox.find("li");null==userID&&(_handle=!1);for(i=0;i<totalDay;i++)$dateLi.eq(i+monthFirst).addClass("date"+parseInt(i+1)),$dateLi.eq(i+monthFirst).text(i+1);function qiandaoFun(){$qiandaoBtn.addClass("btnActived"),$qiandaoBtn.text("明日再来签到")}function qiandaoShow(){_handle=!1,isFirst&&[myDate.getDate()+6,myDate.getDate()+12,myDate.getDate()+18,myDate.getDate()+24].forEach(function(item,index){$(".date"+item).addClass("qiandaoActive"+index)}),$(".date"+(myDate.getDate()-1)).hasClass("qiandaoActive"),$(".date"+myDate.getDate()).addClass("qiandaoActive"),axios.post(ajaxUrl+"/sign/in?userId="+userID+"&isSubmit=1").then(function(response){console.log(response),"未连续签到，从头开始签到"==response.data.msg&&($(".qiandaoActive0").removeClass("qiandaoActive0"),$(".qiandaoActive1").removeClass("qiandaoActive1"),$(".qiandaoActive2").removeClass("qiandaoActive2"),$(".qiandaoActive3").removeClass("qiandaoActive3"),[myDate.getDate()+6,myDate.getDate()+12,myDate.getDate()+18,myDate.getDate()+24].forEach(function(item,index){$(".date"+item).addClass("qiandaoActive"+index)})),function(getGold){console.log("获取金币数为",getGold);var u=navigator.userAgent,isAndroid=-1<u.indexOf("Android")||-1<u.indexOf("Adr"),isiOS=!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);isAndroid?window.jsi.signIn(getGold):isiOS&&window.webkit.messageHandlers.signIn.postMessage(getGold)}(response.data.getGold)}).catch(function(error){console.log(error)})}axios.post(ajaxUrl+"/sign/in?userId="+userID+"&isSubmit=0").then(function(response){"今天还没签到"!=response.data.msg&&(_handle=!1,qiandaoFun());new Array;console.log("已经签到数组",response.data.signList),response.data.signList?response.data.signList.forEach(function(items,index){dateArray.push(items.createDate.split(" ")[0].substr(8,2))}):(console.log("空"),dateArray=[]),$dateLi.each(function(index,item){index+1-monthFirst<myDate.getDate()&&(item.style.color="#b2b2b2")});for(var k=0;k<dateArray.length;k++)dateArray[k]==parseInt(dateArray[k+1])+1&&(dateM.unshift(dateArray[k]),console.log(dateArray[k]));dateM.unshift(dateArray[dateM.length]);for(var i=0;i<totalDay;i++){$dateLi.eq(i+monthFirst).addClass("date"+parseInt(i+1)),$dateLi.eq(i+monthFirst).text(i+1);for(var j=0;j<dateArray.length;j++)i==dateArray[j]&&$dateLi.eq(i+monthFirst-1).addClass("qiandaoActive")}void 0!==dateM[0]&&(isFirst=!1),[parseInt(dateM[0])+6,parseInt(dateM[0])+12,parseInt(dateM[0])+18,parseInt(dateM[0])+24].forEach(function(item,index){$(".date"+item).addClass("qiandaoActive"+index)}),$(".date"+(myDate.getDate()-1)).hasClass("qiandaoActive")||($(".qiandaoActive0").removeClass("qiandaoActive0"),$(".qiandaoActive1").removeClass("qiandaoActive1"),$(".qiandaoActive2").removeClass("qiandaoActive2"),$(".qiandaoActive3").removeClass("qiandaoActive3"),[myDate.getDate()+6,myDate.getDate()+12,myDate.getDate()+18,myDate.getDate()+24].forEach(function(item,index){$(".date"+item).addClass("qiandaoActive"+index)}))}).catch(function(error){console.log("error")}),$(".date"+myDate.getDate()).hasClass("qiandaoActive")?(_handle=!1,console.log("今天是否签到")):$(".date"+myDate.getDate()).addClass("able-qiandao"),$dateBox.on("click","li",function(){if(!_handle)return!1;$(this).text()==myDate.getDate()&&(qiandaoShow(),qiandaoFun())}),$qiandaoBtn.on("click",function(){if(!_handle)return!1;qiandaoShow(),qiandaoFun()})}();