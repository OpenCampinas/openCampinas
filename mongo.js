var mc = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/hack';
var bcrypt = require('bcrypt');
var db;

mc.connect(url, function(err, database){
	if(err) throw err;
	db = database;
});

module.exports = {
	saveSheet: function(data){
		var sheets = db.collection('sheets');
    data.VENCIMENTOS = JSON.parse(data.VENCIMENTOS.replace("R$ ", "").replace(".", "").replace(",", "."));
    sheets.save(data, {w: 1}, function(err, record){
      if(err){ console.log(err);}
    });
	},
	saveCc: function(data){
		var cc = db.collection('cc');
		cc.save(data, {w: 1}, function(err, record){
      if(err){console.log(err);}
    });
	},
	saveFuels: function(data){
		var fuels = db.collection('fuels');
		data.valor_total = JSON.parse(data.valor_total);
		data.quantidade_litros = JSON.parse(data.quantidade_litros);
    fuels.save(data, {w: 1}, function(err, record){
      if(err){ console.log(err);}
    });
	},
	getFuels: function(callback){
	var fuels = db.collection('fuels');
	fuels.aggregate( [{$group:{_id: "$gab", soma: {$sum: "$valor_total"}, litros: {$sum: "$quantidade_litros"}}}, {$sort: {soma: -1}}] ).toArray(function(err, docs){
		if(err){console.log(err); callback(err, null);
		}else{callback(null, docs);}
	});
	},
	getAcao: function(callback){
	var despesas = db.collection('despesas');
	despesas.aggregate( [{$group:{_id: "$ds_acao", soma: {$sum: "$vl_despesa"}}}] ).toArray(function(err, docs){
		if(err){console.log(err); callback(err, null);
		}else{callback(null, docs);}
	});
	},
	getOrgao: function(callback){
	var receitas = db.collection('receitas');
	receitas.aggregate( [{$group:{_id: "$ds_orgao", soma: {$sum: "$vl_arrecadacao"}}}] ).toArray(function(err, docs){
		if(err){console.log(err); callback(err, null);
		}else{callback(null, docs);}
	});
	},
	getRecurso: function(callback){
	var receitas = db.collection('receitas');
	receitas.aggregate( [{$group:{_id: "$ds_fonte_recurso", soma: {$sum: "$vl_arrecadacao"}}}] ).toArray(function(err, docs){
		if(err){console.log(err); callback(err, null);
		}else{callback(null, docs);}
	});
	},
	getFonte: function(callback){
	var receitas = db.collection('receitas');
	receitas.aggregate( [{$group:{_id: "$ds_fonte", soma: {$sum: "$vl_arrecadacao"}}}] ).toArray(function(err, docs){
		if(err){console.log(err); callback(err, null);
		}else{callback(null, docs);}
	});
	}
}

//db.sheets.aggregate([{$group: {_id: "$CARGO", maximo: {$max: "$VENCIMENTOS"}, minimo: {$min: "$VENCIMENTOS"} }}])
//db.fuels.aggregate([{$group: {_id: "$gab", soma: {$sum: "$valor_total"} }}, { $sort: { soma: -1 } }])
//db.despesas.aggregate([{$group: {_id: "$ds_acao", soma: {$sum: "$vl_despesa"} }}])
//db.receitas.aggregate([{$group: {_id: "$ds_orgao", soma: {$sum: "$vl_arrecadacao"} }}])