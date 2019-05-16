const mongoose = require('mongoose')

const publicationTypeSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
})

const PublicationType = mongoose.model('PublicationType', publicationTypeSchema)

module.exports = { PublicationType }
