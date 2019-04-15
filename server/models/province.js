const mongoose = require('mongoose')

const provinceSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
})

const Province = mongoose.model('Province', provinceSchema)

module.exports = { Province }
