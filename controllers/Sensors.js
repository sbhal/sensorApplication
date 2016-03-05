'use strict';

var url = require('url');


var Sensors = require('./SensorsService');


module.exports.findAllSensors = function findAllSensors(req, res, next) {
	Sensors.findAllSensors(req.swagger.params, res, next);
};

module.exports.createSensor = function createSensor(req, res, next) {
	Sensors.createSensor(req.swagger.params, res, next);
};

module.exports.findSensor = function findSensor(req, res, next) {
	Sensors.findSensor(req.swagger.params, res, next);
};

module.exports.updateSensor = function updateSensor(req, res, next) {
	Sensors.updateSensor(req.swagger.params, res, next);
};

module.exports.deleteSensor = function deleteSensor(req, res, next) {
	Sensors.deleteSensor(req.swagger.params, res, next);
};

module.exports.deleteAllSensors = function deleteAllSensors(req, res, next) {
	Sensors.deleteAllSensors(req.swagger.params, res, next);
};

module.exports.deleteAllBuildingSensors = function deleteAllBuildingSensors(req, res, next) {
	Sensors.deleteAllBuildingSensors(req.swagger.params, res, next);
};

module.exports.findAllBuildingSensors = function findAllBuildingSensors(req, res, next) {
	Sensors.findAllBuildingSensors(req.swagger.params, res, next);
};