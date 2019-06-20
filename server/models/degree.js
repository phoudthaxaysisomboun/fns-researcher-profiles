const mongoose = require('mongoose')

const degreeSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
})

const Degree = mongoose.model('Degree', degreeSchema)

module.exports = { Degree }
