/**
 * USERSController
 *
 * @description :: Server-side logic for managing USERS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');

module.exports = {
	loginAdmin: function(req,res){
		var username = req.param('email');
		var password = req.param('password');
		USERS.findOne({
			EMAIL: username
		})
		.populateAll()
		.exec(function(err, user) {
			//VERIFICAMOS SI HAY ERROR
			if(err){ 
				return res.json({
					RESPONSE:500,
					CODE:'ERROR'
				});
			}
			//VERIFICAMOS SI ES USUARIO INCORRECTO
			if(!user) { 
				return res.json({
					RESPONSE:400,
					CODE:'USERINVALID'
				});
			}
			//VERIFICAMOS SI ES CONTRASEÑA INCORRECTA
			bcrypt.compare(password, user.PASSWORD, function(err, pass) {
                if(!pass) {
                	return res.json({
						RESPONSE:400,
						CODE:'PASSWORDINVALID'
					});
                }
     //            if(!user.ROLE.SUPERUSER){
     //            	return res.json({
					// 	RESPONSE:403,
					// 	CODE:'NOTPERMISION'
					// });
     //            }
                req.session.admin = true;
            	req.session.authenticated = true;
            	req.session.user = user;
            	return res.json({
            		RESPONSE: 200,
            		USER: user
            	});
            });
		});
	},
	login: function(req,res){
		var username = req.param('email');
		var password = req.param('password');
		USERS.findOne({
			EMAIL: username
		})
		.populateAll()
		.exec(function(err, user) {
			//VERIFICAMOS SI HAY ERROR
			if(err){ 
				return res.json({
					RESPONSE:500,
					CODE:'ERROR'
				});
			}
			//VERIFICAMOS SI ES USUARIO INCORRECTO
			if(!user) { 
				return res.json({
					RESPONSE:400,
					CODE:'USERINVALID'
				});
			}
			//VERIFICAMOS SI ES CONTRASEÑA INCORRECTA
			bcrypt.compare(password, user.PASSWORD, function(err, pass) {
                if(!pass) {
                	return res.json({
						RESPONSE:400,
						CODE:'PASSWORDINVALID'
					});
                }
                req.session.authenticated = true;
                req.session.user = user;
                if(user.ROLE.SUPERUSER){
                	req.session.admin = true;
                }
            	return res.json({
            		RESPONSE: 200,
            		USER: user
            	});
            });
		});
	},
	me: function(req,res){
		if(!req.session.user){
			return res.json({
				RESPONSE:404,
				CODE:'USERNOTLOGED'
			});
		}	
		return res.json({
			RESPONSE: 200,
			USER: req.session.user
		});
	},
	logout: function(req,res){
		if(req.session.user){
			req.session.user = null;
			req.session.authenticated = null;
			req.session.admin = null;
		}
		return res.json({
    		RESPONSE: 200
    	});
	},
	// register: function(req,res){

	// },
	getSubordinados: function(req,res){
		
	},
	create: function(req,res){
		var data = req.params.all();
		UNIDAD.findOne({
			AREA: data.AREA,
			ROOT: true
		}).exec(function(err,unidad){
			USERS.create(data).exec(function(err,user){
				ASIGNACION_UNIDAD.create({
					USUARIO: user.ID_USER,
					UNIDAD: unidad.ID_UNIDAD
				}).exec(function(err,asignacion){
					return res.json(user);
				})
			});
		});
	},
	update: function(req,res){
		var id = req.param('id');
		var data = req.params.all();
		UNIDAD.findOne({
			AREA: data.AREA,
			ROOT: true
		}).exec(function(err,unidad){
			USERS.update({
				ID_USER: id
			}, data, function(err,user){
				ASIGNACION_UNIDAD.update({
					USUARIO: id 
				},{
					UNIDAD: unidad.ID_UNIDAD
				}, function(err2,asign){
					USERS.findOne({
						ID_USER: id
					}).populateAll().exec(function(err,user){
						return res.json(user);
					});
				})
			});
		});	
	}
};

