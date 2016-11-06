/**
 * UNIDADController
 *
 * @description :: Server-side logic for managing UNIDADS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getbyuser: function(req,res){
		var user = req.session.user;
		var area = user.AREA;
		var rol = user.ROLE.SUPERUSER;
		if(rol){
			UNIDAD.find().populate('AREA').exec(function(err,unidad){
				res.json(unidad);
			});
		}
		else
		{
			UNIDAD.find({
				AREA: area.ID_AREA
			}).populate('AREA').exec(function(err,unidad){
				res.json(unidad);
			});
		}
	}
};

