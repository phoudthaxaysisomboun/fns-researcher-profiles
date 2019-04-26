const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const facultySchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    institution: {
        type: Schema.Types.ObjectId,
        ref: 'Institution',
    }
})

const Faculty = mongoose.model('Faculty', facultySchema)

module.exports = { Faculty }
