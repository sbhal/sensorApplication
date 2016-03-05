'use strict';
var uuid = require('node-uuid');

var SensorModel = require('../models/Sensor.js');

exports.findAllSensors = function(args, res, next) {


	SensorModel.find(function(err, allSensors) {
		if (err || !allSensors || (allSensors.length == 0)) {
			res.end(
				JSON.stringify({
					"code": 400,
					"message": "No Sensors found"
				})
			);
			return;
		}

		var examples = {};
		examples['application/json'] = [];

		allSensors.forEach(function(sensor) {
			examples['application/json'].push({
				"id": sensor.id,
				"name": sensor.name,
				"description": sensor.description,
				"type": sensor.type,
				"data": {
					"name": sensor.data.name,
					"id": sensor.data.id
				},
				"building": {
					"id": sensor.building.id
				},
				"sensorUnit": {
					"id": sensor.sensorUnit.id
				}
			});
		});

		if (Object.keys(examples).length > 0) {
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
		} else {
			res.end();
		}
	});
}

exports.findAllBuildingSensors = function(args, res, next) {

	SensorModel.find({
			'building.id': args.building_id.value
		},
		function(err, sensors) {
			if (!sensors || (sensors.length == 0)) {
				res.end(
					JSON.stringify({
						"code": 404,
						"message": "No Sensors found"
					})
				);
				return;
			}
			var examples = {};
			examples['application/json'] = [];
			sensors.forEach(function(sensor) {
				examples['application/json'].push({
					"id": sensor.id,
					"name": sensor.name,
					"description": sensors.description,
					"type": sensor.type,
					"building": {
						"id": sensor.building.id
					},
					"data": {
						"name": sensor.data.name,
						"id": sensor.data.id
					},
					"sensorUnit": {
						"id": sensor.sensorUnit.id
					}
				});
			});
			if (Object.keys(examples).length > 0) {
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
			} else {
				res.end();
			}
		});
}

exports.createSensor = function(args, res, next) {

	//var randId = generateRandom('1xx-xxxx');
	//var randId = Math.random() * 10000 | 0;
	var randId = uuid.v4();
	console.log("random id generated is " + randId);

	new SensorModel({
		id: randId,
		name: args.body.value.name,
		description: args.body.value.description,
		type: args.body.value.type,
		building: {
			id: args.body.value.building.id
		},
		data: {
			name: args.body.value.data.name,
			id: randId
		},
		sensorUnit: {
			id: randId
		}
	}).save(function(err) {
		if (err) {
			res.end(
				JSON.stringify({
					"code": 404,
					"message": "Couldn't Save Sensor"
				})
			);
			return;
		}
	});


	var examples = {};
	examples['application/json'] = {
		"id": randId,
		"name": args.body.value.name,
		"description": args.body.value.description,
		"type": args.body.value.type,
		"building": {
			"id": args.body.value.building.id
		},
		"data": {
			"name": args.body.value.name,
			"id": randId
		},
		"sensorUnit": {
			"id": randId
		}
	};

	if (Object.keys(examples).length > 0) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
	} else {
		res.end();
	}
}

exports.findSensor = function(args, res, next) {

	SensorModel.findOne({
		id: args.sensor_id.value
	}, function(err, sensors) {
		if (err || !sensors || (sensors.length == 0)) {
			res.end(
				JSON.stringify({
					"code": 404,
					"message": "Couldn't Find Sensor"
				})
			);
			return;
		}

		var examples = {};

		examples['application/json'] = {
			"id": sensors.id,
			"name": sensors.name,
			"description": sensors.description,
			"type": sensors.type,
			"building": {
				"id": sensors.id
			},
			"data": {
				"name": sensors.data.name,
				"id": sensors.data.id
			},
			"sensorUnit": {
				"id": sensors.sensorUnit.id
			}
		};
		if (Object.keys(examples).length > 0) {
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
		} else {
			res.end();
		}
	});
}

exports.updateSensor = function(args, res, next) {

	var sensorId = args.sensor_id.value || args.body.value.id;

	SensorModel.findOne({
		id: sensorId
	}, function(err, sensors) {
		if (err || !sensors || (sensors.length == 0)) {
			res.end(
				JSON.stringify({
					"code": 404,
					"message": "Couldn't Find Sensor"
				})
			);
			return;
		}
		var examples = {};
		examples['application/json'] = [];

		if (args.body.value.name)
			sensors.name = args.body.value.name;
		if (args.body.value.description)
			sensors.description = args.body.value.description;
		if (args.body.value.type)
			sensors.type = args.body.value.type;
		if (args.body.value.building.id)
			sensors.building.id = args.body.value.building.id;


		examples['application/json'] = {
			"id": sensors.id,
			"name": sensors.name,
			"description": sensors.description,
			"type": sensors.type,
			"building": {
				"id": sensors.building.id
			},
			"data": {
				"name": sensors.data.name,
				"id": sensors.data.id
			},
			"sensorUnit": {
				"id": sensors.sensorUnit.id
			}
		};
		if (Object.keys(examples).length > 0) {
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
		} else {
			res.end();
		}
	});

}

exports.deleteSensor = function(args, res, next) {

	SensorModel.findOne({
			id: args.sensor_id.value
		},
		function(err, sensors) {
			if (err || !sensors || (sensors.length == 0)) {
				res.end(
					JSON.stringify({
						"code": 404,
						"message": "Couldn't Find Sensor"
					})
				);
				return;
			}
			var examples = {};
			examples['application/json'] = {
				"id": sensors.id,
				"name": sensors.name,
				"type": sensors.type,
				"description": sensors.description,
				"building": {
					"id": sensors.building.id
				},
				"data": {
					"name": sensors.data.name,
					"id": sensors.data.id
				},
				"sensorUnit": {
					"id": sensors.sensorUnit.id
				}
			};
			if (Object.keys(examples).length > 0) {
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
			} else {
				res.end();
			}
		}).remove().exec();
}

exports.deleteAllSensors = function(args, res, next) {
	SensorModel.remove({}, function() {
		SensorModel.count({}, function(err, cnt) {
			if (cnt == 0) {
				res.end(JSON.stringify({
					"code": 200,
					"message": "Sensor Table Empty"
				}))

			} else {
				res.end(JSON.stringify({
					"code": 400,
					"message": "Unable to delete All Sensors"
				}))
			}
		});
	});
}


exports.deleteAllBuildingSensors = function(args, res, next) {
	SensorModel.find({
			'building.id': args.building_id.value
		},
		function(err, sensors) {
			console.log(sensors);
			console.log("Inside find");
			console.log(args.building_id.value);
			if (!sensors || (sensors.length == 0)) {
				res.end(
					JSON.stringify({
						"code": 404,
						"message": "Couldn't Find Sensor"
					})
				);
				return;
			}
			var examples = {};
			examples['application/json'] = [];

			sensors.forEach(function(sensor) {
				examples['application/json'].push({
					"id": sensor.id,
					"name": sensor.name,
					"type": sensor.type,
					"description": sensor.description,
					"building": {
						"id": sensor.building.id
					},
					"data": {
						"name": sensor.data.name,
						"id": sensor.data.id
					},
					"sensorUnit": {
						"id": sensor.sensorUnit.id
					}
				});
				sensor.remove();
			});
			if (Object.keys(examples).length > 0) {
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
			} else {
				res.end();
			}
		});
}