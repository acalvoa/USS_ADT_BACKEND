/**
 * SEDESController
 *
 * @description :: Server-side logic for managing SEDES
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req,res){
		SEDES.find().populateAll().exec(function(err,sedes){
			return res.json({
				response:200,
				sedes: sedes
			});
		});
	}
};

