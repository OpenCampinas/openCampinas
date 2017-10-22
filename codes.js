var mongo = require('./mongo');
var moment = require('moment');
var fs = require('fs');
var schedule = require('node-schedule');
var request = require('request');

exports.post = function(socket){
  socket.on('getSheets', function(){
   
    mongo.getFuels(function(err, docs){
      if(err){ console.log(err);}
      else{
        //console.log(docs);
        socket.emit('showSheets', docs);
      }
    });
    
  });
},
  
  exports.api = function(socket){
  socket.on('getSheets', function(){
   
    mongo.getFuels(function(err, docs){
      if(err){ console.log(err);}
      else{
        socket.emit('showSheets', docs);
      }
    });
    
  });
},
  
exports.acao = function(socket){
  socket.on('getSheets', function(){
   
    mongo.getAcao(function(err, docs){
      if(err){ console.log(err);}
      else{
        socket.emit('showSheets', docs);
      }
    });
    
  });
},
  
exports.fonte = function(socket){
  socket.on('getSheets', function(){
   
    mongo.getFonte(function(err, docs){
      if(err){ console.log(err);}
      else{
        socket.emit('showSheets', docs);
      }
    });
    
  });
},
  
exports.orgao = function(socket){
  socket.on('getSheets', function(){
   
    mongo.getOrgao(function(err, docs){
      if(err){ console.log(err);}
      else{
        socket.emit('showSheets', docs);
      }
    });
    
  });
},
  
exports.recurso = function(socket){
  socket.on('getSheets', function(){
   
    mongo.getRecurso(function(err, docs){
      if(err){ console.log(err);}
      else{
        socket.emit('showSheets', docs);
      }
    });
    
  });
};