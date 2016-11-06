/**
 * AREAController
 *
 * @description :: Server-side logic for managing AREAS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req,res){
		var data = req.params.all();
		AREA.create(data).exec(function(err,area){
			UNIDAD.create({
				NOMBRE: 'Principal',
				ROOT: true,
				AREA: area.ID_AREA
			}).exec(function(err2, unidad){
				return res.json(area);
			});
		});
	}
};

