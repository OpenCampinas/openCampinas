$(function(){

  var socket = io.connect('http://hackincampinas.com.br/fonte');

  socket.emit('getSheets');
  
  socket.on('showSheets', function(data){
    
   var data2 = {};
		var sites = [];
		data.forEach(function(e) {
				sites.push(e._id);
				data2[e._id] = e.soma;
		})   
		
		var chart = c3.generate({
			bindto: '#chart',
    	data: {
				json: [data2],
				keys: {
					value: sites
				},
        type : 'pie',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
			}
		});
    
  });
});