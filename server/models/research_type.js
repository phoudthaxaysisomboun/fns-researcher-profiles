const mongoose = require('mongoose')

const researchTypeSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
})

const ResearchType = mongoose.model('Gender', researchTypeSchema)

module.exports = { ResearchType }
