const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/tcuSystem', { useUnifiedTopology: true, useNewUrlParser: true })
const tcuSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    code: {
        type: String,
        default: 9595
    },
    usertype: {
        type: String,
        default: 0,
        enum: [0, 1]
    }
})

module.exports = mongoose.model('tculogin', tcuSchema)