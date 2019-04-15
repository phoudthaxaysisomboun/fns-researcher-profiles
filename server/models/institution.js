const mongoose = require('mongoose')

const institutionSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        maxlength: 100
    },
    city: {
        type: String,
        maxlength: 100
    },
    state: {
        type: String,
        maxlength: 100
    },
    country: {
        type: String,
        maxlength: 100
    }
})

const Institution = mongoose.model('Institution', institutionSchema)

module.exports = { Institution }
