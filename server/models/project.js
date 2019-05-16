const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    title: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 500,
        minlength: 3
    },
    goal: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 500
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    collaborators: {
        Type: Array,
        default: []
    },
    fundings: [{
        grantor: {type: String, maxlength: 300},
        amount: {type: Number},
    }],
    researches: [{
        type: Schema.Types.ObjectId, ref: 'Research'
    }],
    updates: [{
        title: {type: String, maxlength: 300},
        update: {type: String},
        date: {type: Date}
    }],
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    isWorking: {
        type: Boolean
    }
    
},{timestamps:true})

const Project = mongoose.model('Project', projectSchema)

module.exports = { Project }