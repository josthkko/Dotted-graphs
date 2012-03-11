// jQuery, Underscore and strftime are already included and available

// Sequentially load the needed scripts
_KIWI.loadScript('/renderer/punchcard/raphael-min.js', function(){ 
  console.log('loadScript() raphael loaded');
  _KIWI.loadScript('/renderer/punchcard/punchcard.js', function(){ 
    console.log('loadScript() punchcard loaded');
    $(document).ready(_KIWI.getData);
  });
});

// CSS for tooltips
_KIWI.loadStylesheet('/renderer/punchcard/punchcard_renderer.css', function(){
	console.log('loadStylesheet() delorean CSS loaded');
});


// INPUT: 
// kiwiData = {
//   rows : [ { id:'timestamp', type: 'unix_utc_timestamp' }, { id: 'kiwis', type: 'number' }, { id: 'apples', type: 'number' }, ... ]
//   cols : [ [123324324, 4, 54, ... ], [123324325, 10, 43, ...] ]
//   kiwi_options : { title: 'Shiny little chart' }
// }

// OUTPUT is the same as INPUT for punchcard:

// called with JSONP when kiwiData returns from _KIWI.getData()
rendererParseData = function(kiwiData) { console.log('punchcard_renderer.js:parseData(kiwiData)')
  renderChart(kiwiData);
}

renderChart = function(punchcardData) { console.log('punchcard_renderer.js:renderChart()')
  // console.log(deloreanData)
  // console.log(deloreanOptions)
  punchCard(punchcardData, 1, 'chart_div');
}










