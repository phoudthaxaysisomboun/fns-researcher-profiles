const mongoose = require('mongoose')

const researchAreaSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
})

const ResearchArea = mongoose.model('ResearchArea', researchAreaSchema)

module.exports = { ResearchArea }