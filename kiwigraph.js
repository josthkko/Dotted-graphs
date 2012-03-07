function KiwiGraph(data) {
 
  	var axisx=[],
  	    axisy=[],
  	    innerData=[];
  	var lengthOfRow = 0;
  	var first = 0;
  	//var month_names_short= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  	//var date = new Date(unix_timestamp*1000);
  	//get data
	_.each(data.cols,function(num){ if(first) {axisy.push(num.id); } first = 1 ;});
	
	_.each(data.rows,function(num){ 
		var date = new Date(num[0]*1000);
		axisx.push(date.getDate() + "." + date.getMonth());
		for(var n=1 ; n < num.length ; n++ )
		{
			innerData.push(num[n]);
		}
		lengthOfRow = num.length-1;
	});
	
    // Draw
    
    var width = 800,
        height = 270,
        leftgutter = 70,
        bottomgutter = 10,
        titlespace = 10,
        r = Raphael("chart", width, height),
        txt = {"font": '10px Fontin-Sans, Arial', stroke: "none", fill: "#999"},
        title = {"font": '12px Fontin-Sans, Arial', stroke: "none", fill: "#999","font-weight": 'bold'},
        X = (width - leftgutter) / axisx.length,
        Y = (height - bottomgutter - titlespace) / axisy.length,
        color = $("#chart").css("color");
        max = Math.round(X / 2) - 1;
    // r.rect(0, 0, width, height, 5).attr({fill: "#000", stroke: "none"});
    for (var i = 0, ii = axisx.length; i < ii; i++) {
        r.text(leftgutter + X * (i + .5), height-6, axisx[i]).attr(txt);
    }
    for (var i = 0, ii = axisy.length; i < ii; i++) {
        r.text(30, Y * (i + .5), axisy[i]).attr(txt);
    }
    if(typeof data.kiwi_options != 'undefined')
    	if(typeof data.kiwi_options.title != 'undefined')
    		r.text((width+leftgutter)/2, 6, data.kiwi_options.title).attr(title);
    	
    var m = 0;
    for (var i = 0, ii = axisy.length; i < ii; i++) {
        var o = 0;
        for (var j = 0, jj = axisx.length; j < jj; j++) {
	    var R = innerData[o+m] && Math.min(Math.round(Math.sqrt(Math.abs(innerData[o+m]) / Math.PI) * 4), max);

            if (R) {
                (function (dx, dy, R, value) {
                    var color = "hsb(" + [(1 - R / max) * .67, .68, .81] + ")";
                    var dt = r.circle(dx + 60 + R, dy + 10, R).attr({stroke: "none", fill: color});
                    if (R < 6) {
                        var bg = r.circle(dx + 60 + R, dy + 10, 6).attr({stroke: "none", fill: "#000", opacity: .4}).hide();
                    }
                    var lbl = r.text(dx + 60 + R, dy + 10, innerData[o+m])
                            .attr({"font": '10px Fontin-Sans, Arial', stroke: "none", fill: "#fff"}).hide();
                    var dot = r.circle(dx + 60 + R, dy + 10, max).attr({stroke: "none", fill: "#000", opacity: 0});
                    dot[0].onmouseover = function () {
                        if (bg) {
                            bg.show();
                        } else {
                            var clr = Raphael.rgb2hsb(color);
                            clr.b = .5;
                            dt.attr("fill", Raphael.hsb2rgb(clr).hex);
                        }
                        lbl.show();
                    };
                    dot[0].onmouseout = function () {
                        if (bg) {
                            bg.hide();
                        } else {
                            dt.attr("fill", color);
                        }
                        lbl.hide();
                    };
                })(leftgutter + X * (j + .5) - 60 - R, Y * (i + .5) - 10, R, innerData[o+m]);
            }
            o+=axisy.length;
        }m++;
    }
}
