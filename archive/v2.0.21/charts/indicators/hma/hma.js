define(["jquery","jquery-ui","color-picker","ddslick"],function(a){function b(){a(this).dialog("close")}function c(c,d){require(["css!charts/indicators/hma/hma.css"]),require(["text!charts/indicators/hma/hma.html"],function(e){var f="#cd0a0a";e=a(e),e.appendTo("body"),e.find("#hma_stroke_color").each(function(){a(this).colorpicker({part:{map:{size:128},bar:{size:128}},select:function(b,c){a(this).css({background:"#"+c.formatted}).val(""),f="#"+c.formatted},ok:function(b,c){a(this).css({background:"#"+c.formatted}).val(""),f="#"+c.formatted}})});var g="Solid";a("#hma_dash_style").ddslick({imagePosition:"left",width:148,background:"white",onSelected:function(b){a("#hma_dash_style .dd-selected-image").css("max-width","115px"),g=b.selectedData.value}}),a("#hma_dash_style .dd-option-image").css("max-width","115px"),e.dialog({autoOpen:!1,resizable:!1,width:350,modal:!0,my:"center",at:"center",of:window,dialogClass:"hma-ui-dialog",buttons:[{text:"OK",click:function(){var c=a(".hma_input_width_for_period");if(!_.isInteger(_.toNumber(c.val()))||!_.inRange(c.val(),parseInt(c.attr("min")),parseInt(c.attr("max"))+1))return void require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+c.attr("min")+" to "+c.attr("max")+" is allowed for "+c.closest("tr").find("td:first").text()+"!"})});var d={period:parseInt(a("#hma_period").val()),maType:a("#hma_ma_type").val(),stroke:f,strokeWidth:parseInt(a("#hma_stroke_width").val()),dashStyle:g,appliedTo:parseInt(e.find("#hma_appliedTo").val())};a(a(".hma").data("refererChartID")).highcharts().series[0].addIndicator("hma",d),b.call(e)}},{text:"Cancel",click:function(){b.call(this)}}]}),e.find("select").selectmenu({width:150}),a.isFunction(d)&&d(c)})}return{open:function(b){return 0===a(".hma").length?void c(b,this.open):void a(".hma").data("refererChartID",b).dialog("open")}}});