const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    gender: {
        type: Schema.Types.ObjectId,
        ref: 'Gender',
        required: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    lastname: {
        type: String,
        required: true,
        v: 100
    },
    prefix: {
        type: String,
        required: true,
        maxlength: 100
    },
    englishName: {
        type: String,
        maxlength: 100
    },
    englishLastname: {
        type: String,
        maxlength: 100
    },
    englishPrefix: {
        type: String,
        maxlength: 100
    },
    profileImage: {
        type: Schema.Types.Mixed,
        default: {}
    },
    address: {
        village: {type: String, maxlength: 100},
        district: {type: Schema.ObjectId, ref: 'District'},
        province: {type: Schema.ObjectId, ref: 'Province'}
    },
    affiliation: {
        type: Schema.Types.Mixed,
        default: {}
    },
    dateOfBirth: {
        type: Date
    },
    placeOfBirth: {
        type: Schema.Types.Mixed,
        default: {}
    },
    nationality: {
        type: String
    },
    minor_ethnicity: {
        type: String
    },
    desipline: {
        type: Schema.Types.Mixed,
        default: {}
    },
    degree: {
        type: String,
        maxlength: 100
    },
    research_area: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    education: {
        type: Array,
        default: []
    },
    researchArea: {
        type: Array,
        default: []
    },
    teachingArea: {
        type: Array,
        default: []
    },
    award: {
        type: Array,
        default: []
    },
    following: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    follower: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    research: [{
        type: Schema.ObjectId,
        ref: 'Research'
    }],
    language: {
        type: Array,
        default: []
    },
    phone: {
        type: Number,
        maxlength: 100
    },
    mobile: {
        type: Number,
        maxlength: 100
    },
    fax: {
        type: Number,
        maxlength: 100
    },
    role: {
        type: Number,
        maxlength: 0
    },
    emailIsVerified: {
        type: Boolean,
        default: false
    },
    accountIsVerified: {
        type: Boolean,
        default: false
    },
    token:{
      type:String
    },
    resetToken:{
      type:String
    },
    resetTokenExp:{
      type:Number
    }

})

const User = mongoose.model('User', userSchema)

module.exports = { User }