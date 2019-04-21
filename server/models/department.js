const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const departmentSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
    }
})

const Department = mongoose.model('Department', departmentSchema)

module.exports = { Department }
