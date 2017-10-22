$(function(){

  var socket = io.connect('http://hackincampinas.com.br/api');

  socket.emit('getSheets');
  
  socket.on('showSheets', function(data){
    $("#dados").text(JSON.stringify(data));
  });
});