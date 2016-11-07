/**
 * TAREASController
 *
 * @description :: Server-side logic for managing TAREAS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createAdmin: function(req,res){
		var tarea = req.params.all();
		var categorias = [];
		tarea.CATEGORIA = JSON.parse(tarea.CATEGORIA);
		for(i=0; i<tarea.CATEGORIA.length;i++){
			categorias.push(tarea.CATEGORIA[i].ID_CATEGORIA);
		}
		var retorno = {};
		TAREAS.create({
			NOMBRE: tarea.NOMBRE,
			DESCRIPCION: tarea.DESCRIPCION,
			CATEGORIA: categorias,
			UNIDAD: tarea.UNIDAD
		}).exec(function(err,tarea_c){
			var counter_act = 0;
			var retorno = JSON.parse(JSON.stringify(tarea_c));
			retorno.ACTIVIDADES = [];
			tarea.ACTIVIDADES = JSON.parse(tarea.ACTIVIDADES);
			for(l=0;l<tarea.ACTIVIDADES.length;l++){
				var tasklists = tarea.ACTIVIDADES[l].TASKLIST;
				ACTIVIDADES.create({
					NOMBRE: tarea.ACTIVIDADES[l].NOMBRE,
					DESCRIPCION: tarea.ACTIVIDADES[l].DESCRIPCION,
					TAREA: tarea_c.ID_TAREA
				}).exec(function(err2,actividad){
					var new_act = JSON.parse(JSON.stringify(actividad));
					var task = [];
					for(g=0; g<tasklists.length; g++){
						task.push({
							DESCRIPCION: tasklists[g].DESCRIPCION,
	  						ACTIVIDAD: actividad.ID_ACTIVIDAD,
						  	LUGAR: tasklists[g].LUGAR
						});
					}
					TASKLIST.create(task).exec(function(err3,taskt){
						var LIST = [];
						for(k=0;k<taskt.length;k++){
							LIST.push(taskt[k]);
						}
						new_act.TASKLIST = LIST;
						retorno.ACTIVIDADES.push(new_act);
						counter_act++;
						if(counter_act == tarea.ACTIVIDADES.length){
							res.json(retorno);
						}
					})
				})
			}
		});
	},
	editAdmin: function(req,res){
		var tarea = req.params.all();
		var categorias = [];
		var actividades = [];
		tarea.CATEGORIA = JSON.parse(tarea.CATEGORIA);
		tarea.ACTIVIDADES = JSON.parse(tarea.ACTIVIDADES);
		for(i=0; i<tarea.CATEGORIA.length;i++){
			categorias.push(tarea.CATEGORIA[i].ID_CATEGORIA);
		}
		for(i=0; i<tarea.ACTIVIDADES.length;i++){
			actividades.push(tarea.ACTIVIDADES[i].ID_ACTIVIDAD);
		}
		// BUSCAMOS LAS ACTIVIDADES ELMINADAS
		ACTIVIDADES.find({
			TAREA: tarea.id,
			ID_ACTIVIDAD:{
				'!': actividades
			}
		}).exec(function(err,act){
			var acti = [];
			if(!act) act = [];
			for(i=0;i<act.length;i++){
				if(typeof act[i].ID_ACTIVIDAD != "undefined") acti.push(act[i].ID_ACTIVIDAD);
			}
			// BUSCAMOS LAS SUS TASKLIST Y LAS ELIMINAMOS
			TASKLIST.destroy({
				ACTIVIDAD: acti
			}).exec(function(err1,tsk){
				// ELIMINAMOS DE LA DB LAS ACTIVIDADES A ELIMINAR
				ACTIVIDADES.destroy({
					TAREA: tarea.id,
					ID_ACTIVIDAD:{
						'!': actividades
					}
				}).exec(function(err2,act){
					// ACTUALIZAMOS LA TAREA
					TAREAS.update({
						ID_TAREA: tarea.id
					},{
						NOMBRE: tarea.NOMBRE,
						DESCRIPCION: tarea.DESCRIPCION,
						CATEGORIA: categorias,
						UNIDAD: tarea.UNIDAD
					}).exec(function(err3,tarea_c){
						// REVISAMOS LAS LABORES DE LAS ACTIVIDADES RESTANTES y BORRAMOS LAS INEXISTENTES
						var task_l = [];
						var count_act = 0;
						tarea.ACTIVIDADES.forEach(function(acti_tmp, index_acti) {
							//BUSCAMOS EDITAR O CREAR
							var acti = acti_tmp;
							ACTIVIDADES.findOrCreate({
								ID_ACTIVIDAD: acti.ID_ACTIVIDAD
							},{
								NOMBRE: acti.NOMBRE,
								DESCRIPCION: acti.DESCRIPCION,
								TAREA: tarea.id
							}).exec(function(err4, activi){
								var count_task = 0;
								acti.TASKLIST.forEach(function(task, index) {
								  	TASKLIST.findOrCreate({
										ID_TASKLIST: task.ID_TASKLIST
									},{
										ACTIVIDAD: activi.ID_ACTIVIDAD
									}).exec(function(err5,task_ed){
										task_l.push(task_ed.ID_TASKLIST)
										task_ed.DESCRIPCION = task.DESCRIPCION;
										task_ed.LUGAR = task.LUGAR;
										task_ed.save(function(err6){
									        if(++count_task == acti.TASKLIST.length) count_act++;
									        //ELIMINAMOS LAS TAREAS QUITADAS
									        if(count_act == tarea.ACTIVIDADES.length) {
									        	TASKLIST.destroy({
									        		ID_TASKLIST:{
									        			'!': task_l
									        		}
									        	}).exec(function(err7){
									        		res.json({
									        			RESPONSE:200
									        		})
									        	})
									        }
									    });
									})
								});
							})
						});
					});
				});
			})
		})
		// TAREAS.update({
		// 	NOMBRE: tarea.NOMBRE,
		// 	DESCRIPCION: tarea.DESCRIPCION,
		// 	CATEGORIA: tarea.CATEGORIA,
		// 	UNIDAD: tarea.UNIDAD
		// }).exec(function(err,tarea_c){
		// 	for(i=0;i<tarea.ACTIVIDADES.length;i++){
		// 		User.findOrCreate({name:'Walter'}, {name:'Jessie'}).exec(function createFindCB(error, createdOrFoundRecords){
		// 		  console.log('What\'s cookin\' '+createdOrFoundRecords.name+'?');
		// 		});
		// 	}
		// });
		// 	var counter_act = 0;
		// 	var retorno = JSON.parse(JSON.stringify(tarea_c));
		// 	retorno.ACTIVIDADES = [];
		// 	tarea.ACTIVIDADES = JSON.parse(tarea.ACTIVIDADES);
		// 	for(l=0;l<tarea.ACTIVIDADES.length;l++){
		// 		var tasklists = tarea.ACTIVIDADES[l].TASKLIST;
		// 		ACTIVIDADES.create({
		// 			NOMBRE: tarea.ACTIVIDADES[l].NOMBRE,
		// 			DESCRIPCION: tarea.ACTIVIDADES[l].DESCRIPCION,
		// 			TAREA: tarea_c.ID_TAREA
		// 		}).exec(function(err2,actividad){
		// 			var new_act = JSON.parse(JSON.stringify(actividad));
		// 			var task = [];
		// 			for(g=0; g<tasklists.length; g++){
		// 				task.push({
		// 					DESCRIPCION: tasklists[g].DESCRIPCION,
	 //  						ACTIVIDAD: actividad.ID_ACTIVIDAD,
		// 				  	LUGAR: tasklists[g].LUGAR
		// 				});
		// 			}
		// 			TASKLIST.create(task).exec(function(err3,taskt){
		// 				var LIST = [];
		// 				for(k=0;k<taskt.length;k++){
		// 					LIST.push(taskt[k]);
		// 				}
		// 				new_act.TASKLIST = LIST;
		// 				retorno.ACTIVIDADES.push(new_act);
		// 				counter_act++;
		// 				if(counter_act == tarea.ACTIVIDADES.length){
		// 					res.json(retorno);
		// 				}
		// 			})
		// 		})
		// 	}
		// });
	},
	find: function(req,res){
		TAREAS.find().populateAll().exec(function(err,tareas) {
			var count = 0;
			var retorno = [];
			if(tareas.length == 0) res.json([]);
			for(l=0;l<tareas.length;l++) {
				var count_act = 0;
				var tarea = JSON.parse(JSON.stringify(tareas[l]));
				var act_new = [];
				for(i=0;i<tarea.ACTIVIDADES.length;i++) {
					ACTIVIDADES.findOne({
						ID_ACTIVIDAD: tarea.ACTIVIDADES[i].ID_ACTIVIDAD
					}).populate('TASKLIST').exec(function(err,actividad) {
						act_new.push(actividad);
						count_act++;
						if(count_act == tarea.ACTIVIDADES.length) {
							tarea.ACTIVIDADES = act_new;
							retorno.push(tarea);
							count++;
						}
						if(count == tareas.length) res.json(retorno);
					});
				}
			}
		});
	}
};

