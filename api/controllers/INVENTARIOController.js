/**
 * INVENTARIOController
 *
 * @description :: Server-side logic for managing INVENTARIOS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getbytag: function(req,res){
		var search = req.param('search');
		INVENTARIO.find({
		  or : [
		    { 
		    	CODIGO: {
		    		'contains': search 
		    	}
		    },
		    { 
		    	MODELO: {
		    		'contains': search 
		    	}
		    }
		  ]
		}).exec(function(err,inv){
			if(err) return res.serverError(err);
			var lista = [];
			for(i=0;i<inv.length;i++){
				lista.push({
					key: inv[i].ID_INVENTARIO,
					name: inv[i].MARCA+' - '+inv[i].MODELO
				});
				lista.push({
					key: inv[i].ID_INVENTARIO,
					name: inv[i].CODIGO
				});
			}
			return res.json(lista);
		})
	},
	getAllByTag: function(req,res){
		var search = req.param('search');
		INVENTARIO.find().exec(function(err,inv){
			if(err) return res.serverError(err);
			var lista = [];
			for(i=0;i<inv.length;i++){
				lista.push({
					key: inv[i].ID_INVENTARIO,
					name: inv[i].MARCA+' - '+inv[i].MODELO
				});
				lista.push({
					key: inv[i].ID_INVENTARIO,
					name: inv[i].CODIGO
				});
			}
			return res.json(lista);
		})
	}
	
};

