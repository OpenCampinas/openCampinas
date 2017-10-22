$(function(){

  var socket = io.connect('http://hackincampinas.com.br/post');

  socket.emit('getSheets');
  
  socket.on('showSheets', function(data){
    
    for(var i=0; i<data.length; i++){
      if(data[i]._id.substr(0, 3) == 'Gab'){
        data[i]._id = data[i]._id.substr(10);
      }
    }
    
    var chart = c3.generate({
			bindto: '#chart',
			data: {
				json: data,
				keys: {
					x: '_id',
					value: ['soma', 'litros']
				},
        names: {
          'soma': 'Valor em Reais',
          'litros': 'Litros'
        },
        axes: {
            litros: 'y2'
        }
			},
      color: {
        pattern: ['#f60000', '#1f77b4']
      },
			axis: {
				x:{
					type: 'category',
					tick: {
						rotate: 30,
            multiline: false
					}
				},
        y : {
          tick: {
            format: function (d) { return "R$ " + d; }
          }
        },
        y2 : {
          show: true,
          tick: {
            format: function (d) { return d + " L"; }
          }
        }
			},
			legend:{
        position: 'bottom',
				show: true
			}
		});
    
  });
});