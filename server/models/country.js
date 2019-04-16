const mongoose = require('mongoose')

const countrySchema = mongoose.Schema({
    laoName: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    englishName: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    continent: {
        type: String,
        maxlength: 100
    },

})

const Country = mongoose.model('Country', countrySchema)

module.exports = { Country }