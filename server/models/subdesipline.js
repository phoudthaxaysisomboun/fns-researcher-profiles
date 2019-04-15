const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const subdesiplineSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    desipline: {
        type: Schema.Types.ObjectId,
        ref: 'Desipline',
    }
})

const Subdesipline = mongoose.model('Subdesipline', subdesiplineSchema)

module.exports = { Subdesipline }