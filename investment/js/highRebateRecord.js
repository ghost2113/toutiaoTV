"use strict";function bindTele(userID){var u=navigator.userAgent,isAndroid=-1<u.indexOf("Android")||-1<u.indexOf("Adr"),isiOS=!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);isAndroid?window.jsi.bindTele(userID):isiOS&&window.webkit.messageHandlers.bindTele.postMessage(userID)}$(function(){var reg,r,userID=(reg=new RegExp("(^|&)"+"userId"+"=([^&]*)(&|$)","i"),null!=(r=window.location.search.substr(1).match(reg))?unescape(r[2]):null);$(".rebate_tab span").eq(0).on("click",function(){window.location.href="./highRebate.html?userId="+userID});var page=0;$(".content").dropload({scrollArea:window,loadDownFn:function(me){page++;var html="";$.ajax({type:"post",url:ajaxUrl+"/investment/record/list?userId="+userID+"&pageNo="+page,dataType:"json",success:function(data){if(console.log(data),"success"==data.state)for(var recordState,taskProcess,result=data.data,strLen=data.data.length,i=0;i<strLen;i++)1==result[i].recordState?(recordState='<span class="red">审核中</span>',taskProcess="人工审核中请耐心等待"):2==result[i].recordState?(recordState="已通过",taskProcess="奖励已发放，请在我的奖励内查看"):3==result[i].recordState&&(recordState="未通过",taskProcess="没有相关记录，如有疑问请咨询客服"),html+='\n                    \t\t\t<li class="instrucItem">\n                    \t\t\t\t<span class="logoUrl"><img src="'+result[i].logoUrl+'" alt="" /></span>\n\t\t\t\t\t\t\t\t\t<p class="p1">\n\t\t\t\t\t\t\t\t\t\t<span class="task">'+result[i].taskName+" +"+result[i].rebateAmount+'</span>\n\t\t\t\t\t\t\t\t\t\t<span class="status gray">'+recordState+'</span>\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t<p class="p2 taskProcess">\n\t\t\t\t\t\t\t\t\t\t'+taskProcess+"\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t</li>\n                    \t\t";else console.log("数据已经加载全部!"),me.lock(),me.noData(),1==page&&($(".noDataTip").show(),$(".dropload-load").remove());setTimeout(function(){$(".instruc").append(html),me.resetload()},1e3)},error:function(xhr,type){}})}})});