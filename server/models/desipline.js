const mongoose = require('mongoose')

const desiplineSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
})

const Desipline = mongoose.model('Desipline', desiplineSchema)

module.exports = { Desipline }
