const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/tcuSystem', { useUnifiedTopology: true, useNewUrlParser: true })
const connectSchma = new Schema({
    number: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('connectrecord', connectSchma)