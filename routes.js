var moment = require('moment'),
mongo = require('./mongo'),
nav = ['Chat','Notes','Player','Money','About','Help'],
fs = require('fs'),
php = require('exec-php'),
request = require('request'),
Converter = require("csvtojson").Converter;

function renderizar(res, data){
  res.render('post', {body: data.result.records});
}

exports.gauge = function(req, res){
	res.render('index', {});
};

exports.post = function(req, res){
  res.render('post', {body: {}});
};

exports.api = function(req, res){
	mongo.getFuels(function(err, docs){
		if(err){ console.log(err);}
		else{
			res.render('api', {data: docs});
		}
	});
};

exports.acao = function(req, res){
  res.render('acao', {body: {}});
};

exports.orgao = function(req, res){
  res.render('orgao', {body: {}});
};

exports.recurso = function(req, res){
  res.render('recurso', {body: {}});
};

exports.fonte = function(req, res){
  res.render('fonte', {body: {}});
};