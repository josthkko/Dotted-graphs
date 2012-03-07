$(function () {
    // Grab the data
    KiwiGraph({"cols":[{"id":"timstamp","type":"unix_utc_timestamp"},{"id":"blueberries","type":"number"},{"id":"strawberries","type":"number"},{"id":"oranges","type":"number"},{"id":"kiwis","type":"number"}],"rows":[["1328486400",-14,28,5,3],["1328572800",-15,26,6,-6],["1328659200",140,27,5,3],["1328745600",14,37,6,0],["1328832000",14,-43,5,9],["1328918400",14,-40,6,-3],["1329004800",15,-43,4,-1],["1329091200",14,-13,4,-2],["1329177600",15,-43,4,-10],["1329264000",14,-43,6,9],["1329350400",15,-31,6,-7],["1329436800",15,-18,5,10],["1329523200",15,-33,6,7],["1329609600",14,-50,6,0],["1329696000",14,-24,4,-8],["1329782400",14,-45,6,-7],["1329868800",15,-16,4,10],["1329955200",15,-24,5,-5],["1330041600",15,-31,4,-5],["1330128000",14,-14,4,0],["1330214400",15,-16,6,-4],["1330300800",15,-17,4,-8],["1330387200",15,-34,5,-1],["1330473600",15,-31,4,4],["1330560000",14,-10,6,-7],["1330646400",14,-24,5,3],["1330732800",15,-12,5,-9],["1330819200",14,-32,6,-7],["1330905600",15,-27,4,-6],["1330992000",14,-10,6,-2],["1331078400",15,-31,5,-6]],"kiwi_options":{"title":"Tiny Happy Fruity Graph"}});
    
   /* var data = [],
        axisx = [],
        axisy = [],
        table = $("#for-chart");
    $("tbody td", table).each(function (i) {
        data.push(parseFloat($(this).text(), 10));
    });
    table.hide();
    $("tbody th", table).each(function () {
        axisy.push($(this).text());
    });
    $("tfoot th", table).each(function () {
        axisx.push($(this).text());
    });

    // Draw
    var width = 800,
        height = 400,
        leftgutter = 30,
        bottomgutter = 20,
        r = Raphael("chart", width, height),
        txt = {"font": '10px Fontin-Sans, Arial', stroke: "none", fill: "#fff"},
        X = (width - leftgutter) / axisx.length,
        Y = (height - bottomgutter) / axisy.length,
        color = $("#chart").css("color");
        max = Math.round(X / 2) - 1;
    // r.rect(0, 0, width, height, 5).attr({fill: "#000", stroke: "none"});
    for (var i = 0, ii = axisx.length; i < ii; i++) {
        r.text(leftgutter + X * (i + .5), height-6, axisx[i]).attr(txt);
    }
    for (var i = 0, ii = axisy.length; i < ii; i++) {
        r.text(10, Y * (i + .5), axisy[i]).attr(txt);
    }
    var o = 0;
    for (var i = 0, ii = axisy.length; i < ii; i++) {
        for (var j = 0, jj = axisx.length; j < jj; j++) {
            var R = data[o] && Math.min(Math.round(Math.sqrt(data[o] / Math.PI) * 4), max);
            if (R) {
                (function (dx, dy, R, value) {
                    var color = "hsb(" + [(1 - R / max) * .5, 1, .75] + ")";
                    var dt = r.circle(dx + 60 + R, dy + 10, R).attr({stroke: "none", fill: color});
                    if (R < 6) {
                        var bg = r.circle(dx + 60 + R, dy + 10, 6).attr({stroke: "none", fill: "#000", opacity: .4}).hide();
                    }
                    var lbl = r.text(dx + 60 + R, dy + 10, data[o])
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
                })(leftgutter + X * (j + .5) - 60 - R, Y * (i + .5) - 10, R, data[o]);
            }
            o++;
        }
    }*/
});
