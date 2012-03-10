function KiwiGraph(data, whichData) {
 
  	var axisx=[],
  	    axisy=[],
  	    innerData=[],
  	    tempaxisy = [],
  	    myData = [];
  	var first = 0;
  	var names = [];
  	
  	whichData = typeof whichData !== 'undefined' ? whichData : 1;

  	//var month_names_short= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  	var axisx_true= [23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12,11,10,9,8,7,6,5,4,3,2,1,0]
  	var axisx = ["11","10","9","8","7","6","5","4","3","2","1","12pm","11","10","9","8","7","6","5","4","3","2","1","12am"]
  	axisx = axisx.reverse();
  	axisx_true = axisx_true.reverse();
  	//var date = new Date(unix_timestamp*1000);
  	//get data
	_.each(data.cols,function(num){ if(first) {names.push(num.id);} first = 1;});
	
	_.each(data.rows,function(num){ 
		var date = new Date(num[0]*1000);
		myData.push(num);
		axisy.push(num[0]*1000);//date.getDate() + "." + date.getMonth());
		
		innerData.push(num[1]);
	});
	axisy = _.sortBy(axisy, function (name) {return name})

	
	_.each(axisy, function(value){
		var date = new Date(value);
		tempaxisy.push(date.getDate() + "." + (date.getMonth()+1));		
	});
	
	axisy = _.uniq(tempaxisy);
	
    // Draw
    var width = 800,
        height = 800,
        leftgutter = 45,
        bottomgutter = 20,
        titlespace = 10,
        buttonsHeight = 25,
        r = Raphael("chart", width, height),
        txt = {"font": '10px Fontin-Sans, Arial', stroke: "none", fill: "#999"},
        title = {"font": '12px Fontin-Sans, Arial', stroke: "none", fill: "#999","font-weight": 'bold'},
        X = (width - leftgutter) / axisx.length,
        Y = (height - bottomgutter - titlespace - buttonsHeight) / axisy.length,
        color = $("#chart").css("color");
        max = Math.round(X / 2) - 1;
    // r.rect(0, 0, width, height, 5).attr({fill: "#000", stroke: "none"});
    for (var i = 0, ii = axisx.length; i < ii; i++) {
        r.text(leftgutter + X * (i + .5), height-6-buttonsHeight, axisx[i]).attr(txt);
    }
    for (var i = 0, ii = axisy.length; i < ii; i++) {
        r.text(30, Y * (i + .5)+titlespace, axisy[i]).attr(txt);
    }
    if(typeof data.kiwi_options != 'undefined')
    	if(typeof data.kiwi_options.title != 'undefined')
    		r.text((width+leftgutter)/2, 6, data.kiwi_options.title + " : " + names[whichData-1]).attr(title);
    	
    
    for (var i = 0, ii = axisy.length; i < ii; i++) {
        for (var j = 0, jj = axisx.length; j < jj; j++) {
	    var R=0;
	    
	    var datesToWrite = [];
	    
	    
	    datesToWrite = _.filter(myData, function(num){ 
		    var myDate = new Date(num[0]*1000);
		    var compareDate = myDate.getDate() + "." + (myDate.getMonth()+1);
	    	    return compareDate == axisy[i]; 
	    });
	    
	    var hours = [];
	    _.each(datesToWrite,function(num){ 
	    	var myDate = new Date(num[0]*1000);
	    	hours.push(myDate.getHours());
	    });
	    
	    for(var t=0 ; t < hours.length ; t++){
	    	if(hours[t] == axisx_true[j]){
	  		innerData[i] = datesToWrite[t][whichData];
	  		R = innerData[i] && Math.min(Math.round(Math.sqrt(Math.abs(innerData[i]) / Math.PI) * 4), max);
	  	}
	    }
	    
            if (R) {
                (function (dx, dy, R, value) {
                    if(value > 0)
                    	var color = "hsb(" + [ (1 - R / max) *.70, (1 - R / max) *.80, .81] + ")";
                    else
                    	var color = "#F62817";
                    
                    var dt = r.circle(dx + 60 + R, dy + 10, R).attr({stroke: "none", fill: color});
                    
                    if (R < 6) {
                        var bg = r.circle(dx + 60 + R, dy + 10, 6).attr({stroke: "none", fill: "#000", opacity: .4}).hide();
                    }
                    var lbl = r.text(dx + 60 + R, dy + 10, innerData[i])
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
                })(leftgutter + X * (j + .5) - 60 - R, Y * (i + .5) - 10 + titlespace, R, innerData[i]);
            }
        }
    }
    

    
    for (var n = 0, nn = names.length; n < nn; n++) {
    (function (n) {
    	
    	
    	var button = r.set();
    	button.push(r.rect(19 +65*n ,height-20, 62 , 20 , 5).attr({stroke: "none", fill: "#D5EA49", opacity: .8}));
    	button.push(r.text(50 +65*n,height-10, names[n]));
    	
    	button.hover(  function () { 
    			button[0].attr("fill", "#000");
                        button[1].attr("fill", "#FFF");                      
                            /*var clr = Raphael.rgb2hsb(color);
                            clr.b = .8;
                            button.attr("fill", Raphael.hsb2rgb(clr).hex);
                        
                       // lbl.show();*/
                    },
          function () {
                        
                            button[0].attr("fill", "#D5EA49");
                            button[1].attr("fill", "#000");
                    })
         button.click(function () {
         		
         		$('#chart').empty();
                        KiwiGraph(data, n+1)
                    });
                   
    })(n);
    }
    
}
