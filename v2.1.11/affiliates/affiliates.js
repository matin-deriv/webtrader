define(["jquery","websockets/binary_websockets","navigation/menu","lodash","common/util","affiliates/touch-device-fix"],function(a,b,c,d){var e=function(a,b,c,d,e,f,g){var h=a.attr("id");require(["charts/chartOptions","charts/tableView"],function(i,j){var k=j.init(a);i.init(h,b,c,k.show,d,e,!f,!g)})};fixTouchEvent();var f=new RegExp(/^(GMT[\+|-])\d{1,2}(\.\d{1,2})*$/),g=0,h=getParameterByName("timezone").toUpperCase().replace(" ","+");if(f.test(h)){var i=h.split("GMT")[1],j=parseInt(i.split(".")[0]),k=i.split(".")[1]?j>0?parseInt(i.split(".")[1]):-1*parseInt(i.split(".")[1]):0;g=-1*(60*j+k)}return Highcharts.setOptions({global:{timezoneOffset:g},plotOptions:{candlestick:{lineColor:"rgba(0,0,0,1)",color:"rgba(215,24,24,1)",upColor:"rgba(2,146,14,1)",upLineColor:"rgba(0,0,0,1)"}}}),{init:function(){a("body").addClass("affiliates"),require(["text!charts/chartWindow.html"],function(b){var c="webtrader-dialog-1",f=getParameterByName("timePeriod")||"1d",g="1t"==f?"line":"candlestick",h=a(b);h.attr("id",c).find("div.chartSubContainerHeader").attr("id",c+"_header").end().find("div.chartSubContainer").attr("id",c+"_chart").end(),require(["instruments/instruments","jquery-growl"],function(b){b.init().then(function(b){if(!a.isEmptyObject(b)){var i=getParameterByName("instrument"),j=getObjects(b,"symbol",i);if(j&&j.length>0&&j[0].symbol&&j[0].display_name)if(validateParameters()){var i=j[0].symbol,k=j[0].display_name,l=j[0].delay_amount||0,m="true"==getParameterByName("hideOverlay").toLowerCase(),n="true"==getParameterByName("hideShare").toLowerCase();require(["charts/charts","charts/chartWindow"],function(a,b){var j={instrumentCode:i,instrumentName:k,timePeriod:f,type:g,delayAmount:l,name:c};b.add_chart_options(c,j),a.drawChart("#"+c+"_chart",{instrumentCode:i,instrumentName:k,timePeriod:f,type:g,delayAmount:l}),e(h,f,g,k,i,n,m),d.defer(function(){a.triggerReflow("#"+c+"_chart")})})}else require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Invalid parameter(s)!"})}),h.find("div.chartSubContainerHeader").hide();else require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Instrument Code Unknown/Unavailable!"})}),h.find("div.chartSubContainerHeader").hide()}})["catch"](function(){require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Error getting market information!"})}),h.find("div.chartSubContainerHeader").hide()})}),a(".mainContainer").append(h),a("#"+c+" .chartSubContainer").height(a(window).height()-50).width(a(window).width()),a("#"+c+" .table-view").width(a(window).width()),a(window).resize(function(){a("#"+c+" .chartSubContainer").height(a(window).height()-50).width(a(window).width()),a("#"+c+" .table-view").width(a(window).width())})})}}});