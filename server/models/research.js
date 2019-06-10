const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const researchSchema = mongoose.Schema({
    title: {
        required: true,
        type: String,
        maxlength: 500,
        minlength: 3
    },
    author: {
        required: true,
        type: Array,
        default: []
    },
    abstract :{
        type: String,
    },
    /* article */
    journalName :{
        type: String,
        maxlength: 300
    },
    volume :{
        type: String,
        maxlength: 300
    },
    issue :{
        type: String,
        maxlength: 300
    },
    page :{
        type: String,
        maxlength: 300
    },
    /* book */
    publisher :{
        type: String,
        maxlength: 100
    },
    editor :{
        type: String,
        maxlength: 100
    },
    edition :{
        type: String,
        maxlength: 100
    },
    /* research proposal */
    description :{
        type: String,
        
    },
    institution :{
        type: String,
        maxlength: 500
    },
    /* conference paper */
    conferenceTitle :{
        type: String,
        maxlength: 500
    },
    location :{
        type: String,
        maxlength: 500
    },
    /* thesis */
    degree :{
        type: String,
        maxlength: 500
    },
    supervisor :{
        type: Array,
        default: []
    },


    uploader: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        required: true,
        type: Date,
        default: Date.now()
    },
    files : [{
        name: {type: String},
        location: {type: String},
        date: {type: Date},
        uploader: {type: Schema.Types.ObjectId, ref: 'User',}
    }],
    figures : [{
        name: {type: String},
        location: {type: String},
        date: {type: Date},
        uploader: {type: Schema.Types.ObjectId, ref: 'User',}
    }],
    likes: [{
        time: {type: Date},
        user: {type: Schema.Types.ObjectId, ref: 'User',},
        
    }],
    comments: [{
        time: {type: Date},
        comment: {type: String, maxlength: 1000},
        user: {type: Schema.Types.ObjectId, ref: 'User',},
        replies: [{
            time: {type: Date},
            reply: {type: String, maxlength: 1000},
            user: {type: Schema.Types.ObjectId, ref: 'User',},
        }]
    }],
    shares:  [{
        time: {type: Date},
        user: {type: String},
        to: {type: String, maxlength: 100}
    }],
    citations:  [{
        time: {type: Date},
        user: {type: String},
    }],
    reads: [{
        time: {type: Date},
        user: {type: String},
    }],
    downloads: [{
        time: {type: Date},
        user: {type: String},
    }],
    fundings: [{
        grantor: {type: String, maxlength: 256},
        amount: {type: Number},
    }],
    project: {
        type: Schema.Types.ObjectId, ref: 'Project'
    },
    researchType: {
        type: Schema.Types.ObjectId, ref: 'ResearchType',
        required: true
    },
    publicationType: {
        type: Schema.Types.ObjectId, ref: 'PublicationType',
        required: true
    }
},{timestamps:true})

const Research = mongoose.model('Research', researchSchema)

module.exports = { Research }
