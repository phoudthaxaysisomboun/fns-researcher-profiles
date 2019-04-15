const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const districtSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    province: {
        type: Schema.Types.ObjectId,
        ref: 'Province',
    }
})

const District = mongoose.model('District', districtSchema)

module.exports = { District }
