var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Sensor = new mongoose.Schema({
    id: {
        type: String,
        default: "undefined"
    },
    name: {
        type: String,
        default: "undefined"
    },
    description: {
        type: String,
        default: "undefined"
    },
    type: {
        type: String,
        default: "undefined"
    },
    building: {
        id: {
            type: Number,
            default: 0
        }
    },
    data: {
        id: {
            type: String,
            default: "undefined"
        },
        name: {
            type: String,
            default: "undefined"
        }
    },
    sensorUnit: {
        id: {
            type: String,
            default: "undefined"
        }
    }
});

module.exports = mongoose.model('Sensors', Sensor);