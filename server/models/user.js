const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SALT_I = 10
const Schema = mongoose.Schema;

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
        type: Array,
        default: {}
    },
    address: {
        village: {type: String, maxlength: 100},
        district: {type: Schema.Types.ObjectId, ref: 'District'},
        province: {type: Schema.Types.ObjectId, ref: 'Province'}
    },
    profileDescription: {
        type: String,
        default: '',
        maxlength: 240
    },
    affiliation: {
        institution: {type: Schema.Types.ObjectId, default: '5c8fcd398b7ae6cfecf5796e', ref: 'Institution', required: true},
        faculty: {type: Schema.Types.ObjectId, default: '5caed82590264f5c10201b4a',ref: 'Faculty', required: true},
        department: {type: Schema.Types.ObjectId, ref: 'Department', required: true},
        position: {type: String, maxlength: 100, required: true},
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    placeOfBirth: {
        vilage: {type: String, maxlength: 100},
        district: {type: String, maxlength: 100},
        province: {type: String, maxlength: 100},
        country: {type: Schema.Types.ObjectId, ref: 'Country'},
    },
    nationality: {
        type: String
    },
    minor_ethnicity: {
        type: String
    },
    desipline: [{
        maindesipline: {type: Schema.Types.ObjectId, ref: 'Desipline'},
        subdesipline: [{ item: {type: Schema.Types.ObjectId, ref: 'Subdesipline'} }]
    }],
    degree: {
        type: String,
        maxlength: 100
    },
    research_area: [{
        type: Schema.Types.ObjectId,
        ref: 'ResearchArea'
    }],
    education: [{
        institution: {type: String},
        fieldOfStudy: {type: String},
        degree: {type: String},
        start: {type: Date},
        end: {type: Date},
        city: {type: String},
        country: {type: Schema.Types.ObjectId, ref: 'Country'},
    }],
    researchArea: {
        type: Array,
        default: []
    },
    teachingExperience: [{
        institution: {type: String},
        position: {type: String},
        department: {type: String},
        start: {type: Date},
        end: {type: Date},
        city: {type: String},
        country: {type: Schema.Types.ObjectId, ref: 'Country'},
        description: {type: String}
    }],
    researchExperience: [{
        institution: {type: String},
        position: {type: String},
        department: {type: String},
        start: {type: Date},
        end: {type: Date},
        city: {type: String},
        country: {type: Schema.Types.ObjectId, ref: 'Country'},
        description: {type: String}
    }],
    award: [{
        title: {type: String},
        principleSubject: {type: String},
        date: {type: Date},
        description: {type: String}
    }],
    following: [{
        _id: { type: Schema.Types.ObjectId, ref: 'User' },
        createdAt: {type: Date}
    }],
    follower: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    research: [{
        type: Schema.Types.ObjectId,
        ref: 'Research'
    }],
    language: [{
        language: {type: String},
        reading: {type: Number, min: 0, max: 10},
        writing: {type: Number, min: 0, max: 10},
        speaking: {type: Number, min: 0, max: 10},
    }],
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
    facebook: {
        name: {type: String, maxlength: 100},
        url: {type: String}
    },
    website: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    emailIsVerified: {
        type: Boolean,
        default: false,
    },
    accountIsVerified: {
        type: Boolean,
        default: false,
    },
    advisor: {
        current: [{ item: {type: Schema.Types.Mixed, ref: 'User'} }],
        past: [{ item: {type: Schema.Types.Mixed, ref: 'User'} }]
    },
    outstanding: {
        isOutstanding: {type: Boolean},
        date: {type: Date}
    },
    newResearcher: {
        isNewResearcher: {type: Boolean},
        date: {type: Date}
    },
    canceledRegisteration: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
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
},{timestamps:true})

userSchema.pre('save', function(next){
    var user = this

    if (user.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err, salt){
            if (err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this
    var token = jwt.sign(user._id.toHexString(), process.env.SECRET)

    user.token = token
    user.save(function(err,user){
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this

    jwt.verify(token, process.env.SECRET, function(err, decode){
        user.findOne({"_id": decode, "token": token}, function(err, user){
            if(err) return cb(err)
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }