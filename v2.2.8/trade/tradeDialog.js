define(["exports","babel-runtime/regenerator","lodash","jquery","moment","windows/windows","common/rivetsExtra","common/common","websockets/binary_websockets","charts/chartingRequestMap","text!trade/tradeDialog.html","./lookback","css!trade/tradeDialog.css","timepicker","jquery-ui","common/util"],function(e,t,a,r,i,o,s,n,u,l,c,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.init=S;var y=_(t),f=_(a),m=_(r),v=_(i),p=_(o),b=_(s),g=_(u),h=_(l),x=_(c),w=_(d);function _(e){return e&&e.__esModule?e:{default:e}}var k=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],r=!0,i=!1,o=void 0;try{for(var s,n=e[Symbol.iterator]();!(r=(s=n.next()).done)&&(a.push(s.value),!t||a.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{!r&&n.return&&n.return()}finally{if(i)throw o}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};function D(e){return function(){var n=e.apply(this,arguments);return new Promise(function(o,s){return function t(e,a){try{var r=n[e](a),i=r.value}catch(e){return void s(e)}if(!r.done)return Promise.resolve(i).then(function(e){t("next",e)},function(e){t("throw",e)});o(i)}("next")})}}require(["trade/tradeConf"]);var Y=function(t,a){return function(e){return e[t]=a,e}},M=b.default.formatters.debounce;function H(e,a){return g.default.cached.send({trading_times:e}).then(function(e){var t={open:"--",close:"--"};return e.trading_times.markets.forEach(function(e){e.submarkets.forEach(function(e){e.symbols.forEach(function(e){e.symbol===a&&(t={open:e.times.open[0],close:e.times.close[0]})})})}),t}).catch(function(e){return{open:"--",close:"--"}})}function q(t,a){t.template.name=a.name;f.default.find(t.categories.array,a.categories_value)?(t.categories.selected=a.categories_value.contract_category,f.default.defer(function(){var e;f.default.find(t.category_displays.array,function(e){return e.name===a.categoriy_displays_selected.name&&e.sentiment===a.categoriy_displays_selected.sentiment})?(t.category_displays.selected=a.categoriy_displays_selected,f.default.defer(function(){t.date_start.visible&&f.default.defer(function(){"now"!==t.date_start.value&&f.default.some(t.date_start.array,{value:1*a.date_start_value})?t.date_start.value=1*a.date_start_value:t.date_start.value="now"}),t.digits.visible&&(t.digits.value=a.digits_value),"spreads"!==t.categories.value.contract_category&&(t.duration.value=a.duration_value,"Duration"===t.duration.value&&f.default.defer(function(){t.duration_unit.value=a.duration_unit_value,f.default.defer(function(){t.duration_count.value=a.duration_count_value})}),"End Time"===t.duration.value&&f.default.defer(function(){t.date_expiry.value_date=a.expiry_value_date,!v.default.utc(t.date_expiry.value_date).isAfter(v.default.utc(),"day")&&f.default.defer(function(){t.date_expiry.value_hour=a.expiry_value_hour})})),t.barriers.barrier_count=a.barriers_barrier_count,1===t.barriers.barrier_count&&f.default.defer(function(){t.barriers.barrier=a.barriers_barrier}),2===t.barriers.barrier_count&&f.default.defer(function(){t.barriers.high_barrier=a.barriers_high_barrier,t.barriers.low_barrier=a.barriers_low_barrier}),"spreads"!==t.categories.value.contract_category&&f.default.defer(function(){t.basis.value=a.basis_value,t.currency.value=t.currency.value?t.currency.value:a.currency_value,t.basis.amount=a.basis_amount}),"spreads"===t.categories.value.contract_category&&(t.currency.value=a.currency_value,t.spreads.amount_per_point=a.spreads_amount_per_point,t.spreads.stop_type=a.spreads_stop_type,t.spreads.stop_loss=a.spreads_stop_loss,t.spreads.stop_profit=a.spreads_stop_profit)})):m.default.growl.warning({message:e||"Template applied partially.".i18n()})})):m.default.growl.error({message:"Template is not applicable.".i18n()})}function T(e){var t=e.hour,a=e.today_times,r=e.selected_date_unix,i=v.default.unix(+r).format("YYYY-MM-DD");if(!!v.default.utc(i).isAfter(v.default.utc(),"day"))return!0;var o=a.close,s=a.open;if("--"===s)return!0;var n=v.default.utc(),u=(0,v.default)(o,"HH:mm:ss").hour(),l=(0,v.default)(s,"HH:mm:ss").hour();return n.hour()>=l&&n.hour()<=u&&(l=n.hour()),l<=t&&t<=u||t<=u&&u<=l||l<=t&&u<=l}function E(e){var t=e.hour,a=e.minute,r=e.today_times,i=e.selected_date_unix,o=v.default.unix(+i).format("YYYY-MM-DD");if(!!v.default.utc(o).isAfter(v.default.utc(),"day"))return!0;var s=r.close,n=r.open;if("--"===n)return!0;var u=v.default.utc(),l=(0,v.default)(s,"HH:mm:ss").hour(),c=(0,v.default)(s,"HH:mm:ss").minute(),d=(0,v.default)(n,"HH:mm:ss").hour(),_=(0,v.default)(n,"HH:mm:ss").minute();return u.hour()>=d&&u.hour()<=l&&(d=u.hour(),_=u.minute()),d===t?_<=a:l===t?a<=c:d<t&&t<l||t<l||d<t}function P(u,l,c,d,e){var _={duration:{array:["Duration","End Time"],value:"Duration"},duration_unit:{array:[""],ranges:[{min:1,max:365}],value:""},duration_count:{value:1,min:1,max:365},date_start:{value:"now",array:[{text:"Now",value:"now"}],visible:!1,hour_minute:"",today_times:{open:"--",close:"--"},onHourShow:function(e){return T({hour:e,today_times:_.date_start.today_times,selected_date_unix:_.date_start.value})},onMinuteShow:function(e,t){return E({hour:e,minute:t,today_times:_.date_start.today_times,selected_date_unix:_.date_start.value})}},date_expiry:{value_date:v.default.utc().format("YYYY-MM-DD"),value_hour:v.default.utc().format("HH:mm"),value:0,today_times:{open:"--",close:"--",disabled:!1},min_date:0,onHourShow:function(e){return T({hour:e,today_times:_.date_expiry.today_times,selected_date_unix:_.date_expiry.value})},onMinuteShow:function(e,t){return E({hour:e,minute:t,today_times:_.date_expiry.today_times,selected_date_unix:_.date_expiry.value})}},categories:{array:[],value:"",paddingTop:function(){return{asian:"26px",callput:"8px",digits:"14px",endsinout:"4px",staysinout:"4px",touchnotouch:"12px",lookback:"26px",callputequal:"8px"}[_.categories.value.contract_category]||"3px"}},category_displays:{array:[],selected:""},barriers:{is_offset_barrier:!1,is_offset_low_barrier:!1,is_offset_high_barrier:!1,barrier_count:0,barrier:"",perv_barrier:"",was_perv_barrier_daily:!1,high_barrier:"",perv_high_barrier:"",was_perv_high_barrier_daily:!1,low_barrier:"",perv_low_barrier:"",was_perv_low_barrier_daily:!1,barrier_live:function(){return 1*this.barrier+1*_.tick.quote},high_barrier_live:function(){return 1*this.high_barrier+1*_.tick.quote},low_barrier_live:function(){return 1*this.low_barrier+1*_.tick.quote}},digits:{array:["0","1","2","3","4","5","6","7","8","9"],value:"0",visible:!1,text:"Last Digit Prediction".i18n()},currency:{array:["USD"],value:"USD",decimals:currencyFractionalDigits()},basis:{array:["Payout","Stake"],value:"payout",amount:8===currencyFractionalDigits()?.1:10,limit:null},spreads:{amount_per_point:1,stop_type:"point",stop_loss:(f.default.find(u,"stop_loss")||{stop_loss:10}).stop_loss,stop_profit:(f.default.find(u,"stop_profit")||{stop_profit:10}).stop_profit,spread:0,spot:"0.0",spot_time:"0",deposit_:function(){return"point"===this.stop_type?this.stop_loss*this.amount_per_point:this.stop_loss}},tick:{epoch:"0",quote:e,perv_quote:"0",down:function(){return 1*this.quote<1*this.perv_quote}},ticks:{array:[],loading:!0},proposal:{symbol:d.symbol,symbol_name:d.display_name,last_promise:null,id:"",ask_price:"0.0",date_start:0,display_value:"0.0",message:"Loading ...".i18n(),payout:0,spot:"0.0",spot_time:"0",multiplier:"0",error:"",loading:!0,netprofit_:function(){var e=_.category_displays.selected.contract_type;return!w.default.isLookback(e)&&formatPrice(this.payout-this.ask_price||0,_.currency.value)},payout_:function(){var e=_.category_displays.selected.contract_type;return w.default.isLookback(e)?w.default.formula(e,formatPrice(+_.basis.amount||0,_.currency.value,3)):formatPrice(+this.payout||0,_.currency.value)},return_:function(){var e=_.category_displays.selected.contract_type;return!(w.default.isLookback(e)||!this.payout||!this.ask_price)&&((this.payout-this.ask_price)/this.ask_price*100).toFixed(1)+"%"}},purchase:{loading:!1},tooltips:{barrier:{my:"left-215 top+10",at:"left bottom",collision:"flipfit"},barrier_p:{my:"left-5 top+10",at:"left bottom",collision:"flipfit"}},template:{name:"",visible:!1}},t=function(){g.default.is_authenticated()&&g.default.send({payout_currencies:1}).then(function(e){_.currency.value=e.payout_currencies[0],_.currency.array=e.payout_currencies}).catch(function(e){})};function p(e){return!(!e||!e.startsWith("+")&&!e.startsWith("-"))}_.template.hide=function(e){0===(0,m.default)(e.target).closest(".trade-template-manager").length&&(_.template.visible=!1)},_.template.toggle=function(){_.template.visible=!_.template.visible},(_.barriers.root=_).date_expiry.update_times=function(){H(_.date_expiry.value_date,_.proposal.symbol).then(function(e){_.date_expiry.today_times.open=e.open,_.date_expiry.today_times.close=e.close;var t=(0,f.default)(_.duration_unit.ranges).filter(["type","minutes"]).head();_.date_expiry.today_times.disabled=!t;var a=t?v.default.utc().add(t.min+1,"m").format("HH:mm"):"00:00";_.date_expiry.value_hour=a})},_.categories.update=function(e){_.categories.value=f.default.find(_.categories.array,{contract_category:_.categories.selected});var t=_.categories.value.contract_category,a=function(e){return-1!==["staysinout","endsinout"].indexOf(e)},r=a(t)?function(e){return a(e.contract_category)}:function(e){return e.contract_category==t};_.category_displays.array=[],(0,f.default)(u).filter(r).map("contract_display").uniq().value().forEach(function(e){var t={};t.name=e;var a=f.default.find(u,{contract_display:e});a&&(t.sentiment=a.sentiment,t.contract_type=a.contract_type),_.category_displays.array.push(t)}),/^lookback$/.test(t.toLowerCase())?(_.basis.array=["Multiplier"],_.basis.value="multiplier",_.currency.decimals=3):(_.basis.array=["Payout","Stake"],_.basis.value="payout",_.currency.decimals=currencyFractionalDigits()),_.category_displays.selected=f.default.head(_.category_displays.array)},_.category_displays.onclick=function(e){_.category_displays.selected={},_.category_displays.selected.name=(0,m.default)(e.target).attr("data-name"),_.category_displays.selected.sentiment=(0,m.default)(e.target).attr("data-sentiment"),_.category_displays.selected.contract_type=(0,m.default)(e.target).attr("data-contract_type")},_.date_start.update=function(){var e=(0,f.default)(u).filter({contract_category_display:_.categories.value.contract_category_display,contract_display:_.category_displays.selected.name,start_type:"forward"}).head();if(e){var t=(0,f.default)(u).filter({contract_category_display:_.categories.value.contract_category_display,contract_display:_.category_displays.selected.name,start_type:"spot"}).head(),a=e.forward_starting_options.map(function(e){var t=e.date;return{text:v.default.unix(t).format("ddd - MMMM Do, YYYY"),value:t}});t&&a.unshift({text:"Now",value:"now"});var r=_.date_start.value,i={value:r,array:[].concat(function(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}(a)),visible:!0};f.default.assign(_.date_start,i),"now"===r?_.date_start.hour_minute="00:00":_.setDateStartHourMinute(_.date_start.hour_minute)}else f.default.assign(_.date_start,{visible:!1,array:[],value:"now"})},_.setDateStartHourMinute=function(a){var e=v.default.unix(+_.date_start.value).format("YYYY-MM-DD"),r=v.default.utc(e+" "+a).unix(),i=!v.default.utc(e).isAfter(v.default.utc(),"day");H(e,_.proposal.symbol).then(function(e){if(_.date_start.today_times.open=e.open,_.date_start.today_times.close=e.close,i){var t=v.default.utc().format("HH:mm");_.date_start.hour_minute=a<t?t:a}else _.date_start.hour_minute=a;_.date_start.value=r})},_.date_expiry.update=function(e){var t=_.date_expiry.value_date,a=!v.default.utc(t).isAfter(v.default.utc(),"day"),r="Duration"===_.duration.value,i=_.duration_unit.array[0]&&!_.duration_unit.array.some(function(e){return-1!==["ticks","seconds","minutes","hours"].indexOf(e)});a?(e!==_.date_expiry.value_hour&&_.date_expiry.update_times(),i&&!r&&(_.date_expiry.min_date=1,_.date_expiry.value_date=v.default.utc().add(1,"days").format("YYYY-MM-DD")),_.date_expiry.value=v.default.utc(_.date_expiry.value_date+" "+_.date_expiry.value_hour).unix(),_.barriers.update(),M(_.date_expiry.value,_.proposal.onchange)):(_.date_expiry.today_times.disabled=!0,H(t,_.proposal.symbol).then(function(e){r&&(_.date_expiry.value_date=v.default.utc().format("YYYY-MM-DD"));var t="--"!==e.close?e.close:"23:59:59";_.date_expiry.min_date=i?1:0,_.date_expiry.value_hour=v.default.utc(t,"HH:mm:ss").format("HH:mm"),_.date_expiry.value=v.default.utc(_.date_expiry.value_date+" "+t).unix(),_.barriers.update(),M(_.date_expiry.value,_.proposal.onchange)}))},_.duration.update=function(){var e=_.categories.value.contract_category;(0,f.default)(["callput","endsinout","staysinout","touchnotouch","lookback"]).includes(e)?2!==_.duration.array.length&&(_.duration.array=["Duration","End Time"]):(_.duration.value="Duration",1!==_.duration.array.length&&(_.duration.array=["Duration"]))},_.duration_unit.update=function(){var e="now"!==_.date_start.value?"forward":"spot",t=(0,f.default)(u).filter({contract_category_display:_.categories.value.contract_category_display,contract_display:_.category_displays.selected.name,start_type:e}).map(function(e){return{min:e.min_contract_duration+"",max:e.max_contract_duration+"",type:e.expiry_type}}).value(),o=[],s=[];f.default.each(t,function(e){if((0,f.default)(["tick","daily"]).includes(e.type))return o.push({tick:"ticks",daily:"days"}[e.type]),void s.push({min:0|e.min.replace("d","").replace("t",""),max:0|e.max.replace("d","").replace("t",""),type:{tick:"ticks",daily:"days"}[e.type]});var t=e.min.replace("s","").replace("m","").replace("h",""),a=e.max.replace("s","").replace("m","").replace("h","").replace("d",""),r=(0,f.default)(e.min).last(),i=(0,f.default)(e.max).last();t*={s:1,m:60,h:3600}[r],a*={s:1,m:60,h:3600,d:86400}[i],"s"===r&&(o.push("seconds"),s.push({min:t,max:a,type:"seconds"})),(0,f.default)(["s","m"]).includes(r)&&60<=a&&(o.push("minutes"),s.push({min:Math.max(t/60,1),max:a/60,type:"minutes"})),(0,f.default)(["s","m","h"]).includes(r)&&3600<=a&&(o.push("hours"),s.push({min:Math.max(t/3600,1),max:a/3600,type:"hours"}))});var a={ticks:0,seconds:1,minutes:2,hours:3,days:4};o.sort(function(e,t){return a[e]-a[t]}),s.sort(function(e,t){return a[e.type]-a[t.type]}),o.length?(_.duration_unit.ranges=s,f.default.includes(o,_.duration_unit.value)?_.duration_count.update(!0):_.duration_unit.value=f.default.head(o),"lookback"===_.categories.selected&&(o=o.filter(function(e){return"minutes"===e})),_.duration_unit.array=o,_.barriers.update(),_.date_expiry.update_times()):_.barriers.update()},_.duration_count.update=function(e){var t=(0,f.default)(_.duration_unit.ranges).filter({type:_.duration_unit.value}).head();t&&(_.duration_count.min=t.min,_.duration_count.max=t.max,!0!==e?_.duration_count.value=t.min:(_.duration_count.value<t.min||_.duration_count.value>t.max)&&(_.duration_count.value=t.min))},_.digits.update=function(){var e=_.category_displays.selected.sentiment;if("digits"===_.categories.value.contract_category&&"odd"!==e&&"even"!==e){var t={match:["0","1","2","3","4","5","6","7","8","9"],differ:["0","1","2","3","4","5","6","7","8","9"],under:["1","2","3","4","5","6","7","8","9"],over:["0","1","2","3","4","5","6","7","8"]}[e],a={match:"Last Digit Prediction".i18n(),differ:"Last Digit Prediction".i18n(),under:"Last Digit is Under".i18n(),over:"Last Digit is Over".i18n()}[e];f.default.includes(t,_.digits.value)||(_.digits.value=t[0]),_.digits.array=t,_.digits.text=a,_.digits.visible=!0}else _.digits.visible=!1},_.barriers.update=function(){var e=_.duration_unit.value,s=(0,f.default)(["seconds","minutes","hours"]).includes(e)?"intraday":"days"===e?"daily":"tick",t=(0,f.default)(u).filter({contract_category_display:_.categories.value.contract_category_display,contract_display:_.category_displays.selected.name,expiry_type:s}).filter(function(e){return 1<=e.barriers}).head();if(_.barriers.barrier_count=t?t.barriers:0,t){var a=function(e,t,a,r,i){if("daily"===s&&"End Time"!==_.duration.value||"End Time"===_.duration.value&&v.default.utc(_.date_expiry.value_date).isAfter(v.default.utc(),"day"))r&&(t=e),e=(r?e:0)||a,r=!0;else{var o=(0<=1*a?i:"")+1*a;r&&/^[+-]/.test(t)?e=t:/^[+-]/.test(e)||(e=o),t=e,r=!1}return{barrier:e,perv_barrier:t,was_perv_barrier_daily:r}};if(t.barrier){var r=a(_.barriers.barrier,_.barriers.perv_barrier,t.barrier,_.barriers.was_perv_barrier_daily,"+");_.barriers.barrier=r.barrier,_.barriers.perv_barrier=r.perv_barrier,_.barriers.was_perv_barrier_daily=r.was_perv_barrier_daily}if(t.high_barrier){r=a(_.barriers.high_barrier,_.barriers.perv_high_barrier,t.high_barrier,_.barriers.was_perv_high_barrier_daily,"+");_.barriers.high_barrier=r.barrier,_.barriers.perv_high_barrier=r.perv_barrier,_.barriers.was_perv_high_barrier_daily=r.was_perv_barrier_daily}if(t.low_barrier){r=a(_.barriers.low_barrier,_.barriers.perv_low_barrier,t.low_barrier,_.barriers.was_perv_low_barrier_daily,"-");_.barriers.low_barrier=r.barrier,_.barriers.perv_low_barrier=r.perv_barrier,_.barriers.was_perv_low_barrier_daily=r.was_perv_barrier_daily}}},_.basis.update_limit=function(){var e=_.basis,t=(0,f.default)(u).filter({contract_category_display:_.categories.value.contract_category_display,contract_display:_.category_displays.selected.name}).head();t=t&&t.payout_limit||null,e.limit=t?1*t:null,e.limit&&(e.amount=Math.min(e.amount,e.limit))},_.proposal.onchange=function(){var r,e=(r=D(y.default.mark(function e(t,a,r){var i,o;return y.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:i=void 0,o=0;case 2:if(o<a)return e.prev=3,e.next=6,g.default.send(t);e.next=22;break;case 6:return i=e.sent,_.proposal.error="",_.proposal.id=i.proposal&&i.proposal.id,e.abrupt("break",22);case 12:if(e.prev=12,e.t0=e.catch(3),_.proposal.error=e.t0.message,_.proposal.message="",_.proposal.loading=!1,r&&r!==e.t0.code)return e.abrupt("break",22);e.next=19;break;case 19:o++,e.next=2;break;case 22:return e.abrupt("return",i);case 23:case"end":return e.stop()}},e,this,[[3,12]])})),function(e,t,a){return r.apply(this,arguments)}),t=_.duration_unit.value,a=(0,f.default)(["seconds","minutes","hours"]).includes(t)?"intraday":"days"===t?"daily":"tick";"spreads"===_.categories.value.contract_category&&(a="intraday");var i,o={proposal:1,subscribe:1,contract_type:(0,f.default)(u).filter({contract_category_display:_.categories.value.contract_category_display,contract_display:_.category_displays.selected.name,expiry_type:a}).head().contract_type,currency:_.currency.value,symbol:_.proposal.symbol};if("spreads"!==_.categories.value.contract_category){var s=!f.default.isNil(_.basis.amount)&&_.basis.amount.toString().match(/0*(\d+\.?\d*)/);s&&s.input!==s[1]&&(_.basis.amount=s[1]),o.amount=_.basis.amount,o.basis=_.basis.value}else o.amount_per_point=_.spreads.amount_per_point,o.stop_type=_.spreads.stop_type,o.stop_loss=_.spreads.stop_loss,o.stop_profit=_.spreads.stop_profit;!function(e,t){var a=e.barriers,r=a.barrier,i=a.high_barrier,o=a.low_barrier,s=a.barrier_count;if(2==+s)return t.barrier=i,t.barrier2=o;1==+s&&(t.barrier=r)}(_,o),(i=_).barriers.is_offset_barrier=p(i.barriers.barrier),i.barriers.is_offset_low_barrier=p(i.barriers.low_barrier),i.barriers.is_offset_high_barrier=p(i.barriers.high_barrier),"digits"===_.categories.value.contract_category&&(o.barrier=_.digits.value+""),"now"!==_.date_start.value&&(o.date_start=1*_.date_start.value),"Duration"===_.duration.value?(o.duration_unit=(0,f.default)(_.duration_unit.value).head(),o.duration=1*_.duration_count.value):o.date_expiry=_.date_expiry.value,_.proposal.loading=!0,_.proposal.last_promise&&_.proposal.last_promise.then(function(e){var t=e&&e.proposal&&e.proposal.id;t&&g.default.send({forget:t})});var n=e(o,2,"AlreadySubscribed");_.proposal.last_promise=n,_.proposal.id="",c.update_track(c.get_template())},_.purchase.onclick=D(y.default.mark(function e(){var t,a,r,i,o,s,n,u;return y.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=["digits","callput","callputequal","asian","touchnotouch"],_.purchase.loading=!0,a=function(e){e.appendTo(l),l.find(".trade-fields").css({left:"400px"}),l.find(".trade-conf").css({left:"0"})},r=function(e){l.find(".trade-fields").css({left:"0"}),l.find(".trade-conf").css({left:"-400px"}),_.purchase.loading=!1,e.remove(),_.proposal.onchange()},i={amount:_.basis.amount,currency:_.currency.value,symbol:_.proposal.symbol,symbol_name:_.proposal.symbol_name,category:_.categories.value,category_display:_.category_displays.selected,duration_unit:_.duration_unit.value,pip:d.pip,show_tick_chart:!1},(0,f.default)(t).includes(i.category.contract_category)&&"Duration"===_.duration.value&&"ticks"===i.duration_unit&&(i.digits_value=_.digits.value,i.tick_count=1*_.duration_count.value,"digits"!==i.category.contract_category&&("asian"!==i.category.contract_category&&(i.tick_count+=1),"callput"!==i.category.contract_category||(0,f.default)(["rise","fall"]).includes(i.category_display.name)||(i.barrier=_.barriers.barrier),i.show_tick_chart=!0)),g.default.is_authenticated()){e.next=11;break}return m.default.growl.warning({message:"Please log in".i18n()}),_.purchase.loading=!1,e.abrupt("return");case 11:return e.prev=11,e.next=14,require(["trade/tradeConf"]);case 14:return o=e.sent,s=k(o,1),n=s[0],e.next=19,g.default.send({buy:_.proposal.id,price:1*_.proposal.ask_price});case 19:u=e.sent,i.contract_id=u.buy.contract_id,i.transaction_id=u.buy.transaction_id,(i.show_tick_chart||"digits"===i.category.contract_category)&&g.default.proposal_open_contract.subscribe(i.contract_id),n.init(u,i,a,r,d),e.next=32;break;case 26:e.prev=26,e.t0=e.catch(11),_.purchase.loading=!1,m.default.growl.error({message:e.t0.message}),"InvalidToken"===e.t0.code?g.default.invalidate():_.proposal.onchange();case 32:case"end":return e.stop()}},e,this,[[11,26]])})),(0,f.default)(u).map("contract_category_display").uniq().value().filter(function(e){return n.SUPPORTED_CONTRACT_TYPES.includes(e.toLowerCase())}).forEach(function(e){var t={};t.contract_category_display=e;var a=f.default.find(u,{contract_category_display:e});a&&(t.contract_category=a.contract_category,_.categories.array.push(t))}),_.categories.value=(0,f.default)(_.categories.array).head(),_.categories.selected=_.categories.value.contract_category;var a=!1;return g.default.events.on("tick",function(e){e.tick&&e.tick.symbol==_.proposal.symbol&&(a=!0,_.tick.perv_quote=_.tick.quote,_.tick.epoch=e.tick.epoch,_.tick.quote=e.tick.quote,_.ticks.loading=!1,25<_.ticks.array.length&&_.ticks.array.shift(),_.ticks.array.push(e.tick))}),g.default.events.on("proposal",function(t){f.default.defer(function(){if(t.proposal&&t.proposal.id===_.proposal.id){if(t.error)return _.proposal.error=t.error.message,void(_.proposal.message="");if(!_.purchase.loading){var e=t.proposal;_.proposal.ask_price=e.ask_price,_.proposal.date_start=e.date_start,_.proposal.multiplier=e.multiplier||"0",_.proposal.display_value=e.display_value,_.proposal.message=e.longcode,_.proposal.payout=e.payout,_.proposal.spot=e.spot,_.proposal.spot_time=e.spot_time,_.spreads.spread=e.spread||0,_.spreads.spot=e.spot||"0.0",_.spreads.spot_time=e.spot_time||"0",_.proposal.loading=!1,!a&&e.spot&&(_.tick.epoch=e.spot_time,_.tick.quote=e.spot)}}})}),g.default.events.on("set_account_currency",t),g.default.events.on("login",t),t(),_}function S(t,e,a,r){var i,o=(0,m.default)(x.default).i18n(),s=(i=e.available,(0,f.default)(i).filter({contract_category:"callput",barrier_category:"euro_atm",barriers:0,sentiment:"up"}).each(Y("contract_display","rise")),(0,f.default)(i).filter({contract_category:"callput",barrier_category:"euro_atm",barriers:0,sentiment:"down"}).each(Y("contract_display","fall")),(0,f.default)(i).filter(["contract_category","endsinout"]).each(Y("contract_category_display","In/Out")),(0,f.default)(i).filter(["contract_category","staysinout"]).each(Y("contract_category_display","In/Out")),(0,f.default)(i).filter(["contract_category","digits"]).each(Y("barriers",0)),(0,f.default)(i).filter({contract_type:"EXPIRYMISS"}).each(Y("contract_display","ends outside")),(0,f.default)(i).filter({contract_type:"EXPIRYRANGE"}).each(Y("contract_display","ends between")),(0,f.default)(i).filter({contract_type:"RANGE"}).each(Y("contract_display","stays between")),(0,f.default)(i).filter({contract_type:"UPORDOWN"}).each(Y("contract_display","goes outside")),(0,f.default)(i).filter({contract_type:"ONETOUCH"}).each(Y("contract_display","touch")),(0,f.default)(i).filter({contract_type:"NOTOUCH"}).each(Y("contract_display","no touch")),i=f.default.sortBy(i,function(a){var e=f.default.find({"Up/Down":1,"Touch/No Touch":2,"In/Out":3,Digits:4,Asians:5,Spreads:6},function(e,t){if(t.i18n()==a.contract_category_display||t==a.contract_category_display)return e});return 4===e&&(e={odd:4,even:4.5}[a.contract_display]||3.5),e})),n=p.default.createBlankWindow(o,{title:t.display_name,resizable:!1,collapsable:!1,minimizable:!0,maximizable:!1,width:400,"data-authorized":"false","data-account-specific":"true",isTrackerInitiated:r,relativePosition:!0,close:function(){d.proposal.last_promise&&d.proposal.last_promise.then(function(e){var t=e&&e.proposal&&e.proposal.id;t&&g.default.send({forget:t})}),h.default.unregister(l),_.unbind(),n.destroy()}}),u=n.track({module_id:"tradeDialog",is_unique:!1,data:{symbol:t,template:a||{}}}),l=h.default.keyFor(t.symbol,0),c=(0,f.default)(s).map("min_contract_duration").some(function(e){return/^\d+$/.test(e)||"t"===f.default.last(e)});h.default[l]?h.default.subscribe(l):h.default.register({symbol:t.symbol,subscribe:1,style:"ticks"}).catch(function(e){c&&(m.default.growl.error({message:e.message}),f.default.delay(function(){n.dialog("close")},2e3))});var d=P(s,o,n,t,e.spot);c||(d.ticks.loading=!1);var _=b.default.bind(o[0],d);return d.categories.update(),n.dialog("open"),n.update_track=function(e){u({symbol:t,template:e})},n.get_template=function(e){return{name:e.template.name,categories_value:e.categories.value,categoriy_displays_selected:e.category_displays.selected,date_start_value:e.date_start.value,digits_value:e.digits.value,duration_value:e.duration.value,duration_count_value:e.duration_count.value,duration_unit_value:e.duration_unit.value,expiry_value_hour:e.date_expiry.value_hour,expiry_value_date:e.date_expiry.value_date,expiry_value:e.date_expiry.value,barriers_barrier_count:e.barriers.barrier_count,barriers_barrier:e.barriers.barrier,barriers_high_barrier:e.barriers.high_barrier,barriers_low_barrier:e.barriers.low_barrier,basis_value:e.basis.value,currency_value:e.currency.value,basis_amount:e.basis.amount,spreads_amount_per_point:e.spreads.amount_per_point,spreads_stop_type:e.spreads.stop_type,spreads_stop_loss:e.spreads.stop_loss,spreads_stop_profit:e.spreads.stop_profit}}.bind(void 0,d),n.set_template=q.bind(void 0,d),a&&void 0!==a.name&&n.set_template(a),n.hide_template_menu=function(){d.template.visible=!1},require(["trade/tradeTemplateManager"],function(e){e.init(o.find(".trade-template-manager-root"),n)}),(0,m.default)("#duration-input").keypress(function(e){(e.which<48||57<e.which)&&8!==e.which&&e.preventDefault()}),n}e.default={init:S}});