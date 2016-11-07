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
	}
};

