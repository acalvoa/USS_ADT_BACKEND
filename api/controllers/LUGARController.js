/**
 * LUGARController
 *
 * @description :: Server-side logic for managing LUGARS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getbyuser: function(req,res){
		var user = req.session.user;
		var sede = user.SEDE;
		var rol = user.ROLE.SUPERUSER;
		if(rol){
			LUGAR.find().populate('SEDE').exec(function(err,sedes){
				res.json(sedes);
			});
		}
		else
		{
			LUGAR.find({
				SEDE: sede.ID_SEDE
			}).populate('SEDE').exec(function(err,sedes){
				res.json(sedes);
			});
		}
	},
	create: function(req,res){
		LUGAR.create({
			INVENTARIO: (req.param('INVENTARIO'))?JSON.parse(req.param('INVENTARIO')):[],
			NOMBRE_LUGAR: req.param('NOMBRE_LUGAR'),
			SEDE: req.param('SEDE')
		}).exec(function(err,lugar){
			if(err) return res.serverError(err);
			return res.json(lugar);
		})
	}
};

