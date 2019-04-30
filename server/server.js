const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE)

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())

// Models
const { User } = require('./models/user')
const { Gender } = require('./models/gender')
const { ResearchArea } = require('./models/research_area')
const { Province } = require('./models/province')
const { District } = require('./models/district')
const { Institution } = require('./models/institution')
const { Desipline } = require('./models/desipline')
const { Subdesipline } = require('./models/subdesipline')
const { Country } = require('./models/country')
const { Department } = require('./models/department')
const { Faculty } = require('./models/faculty')

// Middlewares
const { auth } = require('./middleware/auth')
const { admin } = require('./middleware/admin')

//====================================
//             DEPARTMENTS
//====================================

app.get('/api/users/departments',(req,res)=>{
    Department.find({}, (err, departments) => {
        if (err) return res.status(400).send(err)
        res.status(200).send(departments)
    })
})


//====================================
//             COUNTRY
//====================================

app.post('/api/users/country', auth, admin, (req,res)=>{
    const country = new Country(req.body)

    country.save((err, doc)=>{
        if (err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
            country: doc
        })
    }) 
})

app.get('/api/users/countries', (req,res)=>{
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = parseInt(req.query.limit)

    Country.find().
    sort([[sortBy, order]]).
    limit(limit).
    exec((err, countries)=>{
        if (err) return res.status(400).send(err)
        res.send(countries)
    })
})

//====================================
//             RESEARCH AREA
//====================================

app.post('/api/research/research_area', auth, admin, (req,res)=>{
    const researchArea = new ResearchArea(req.body)

    researchArea.save((err, doc)=>{
        if (err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
            researchArea: doc
        })
    }) 
})

app.get('/api/research/research_areas', (req,res)=>{
    ResearchArea.find({}, (err, researchAreas) => {
        if (err) return res.status(400).send(err)
        res.status(200).send(researchAreas)
    })
})

//====================================
//             DESIPLINE
//====================================

app.post('/api/research/desipline', auth, admin, (req,res)=>{
    const desipline = new Desipline(req.body)

    desipline.save((err, doc)=>{
        if (err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
            desipline: doc
        })
    }) 
})

app.get('/api/research/desiplines', (req,res)=>{
    Desipline.find({}, (err, desipline) => {
        if (err) return res.status(400).send(err)
        res.status(200).send(desipline)
    })
})

//====================================
//            SUBDESIPLINE
//====================================

app.post('/api/research/subdesipline', auth, admin, (req,res)=>{
    const subdesipline = new Subdesipline(req.body)

    subdesipline.save((err, doc)=>{
        if (err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
            subdesipline: doc
        })
    }) 
})

app.get('/api/research/subdesiplines', (req,res)=>{
    Subdesipline.find({}).
    populate('desipline').
    exec((err, subdesipline) => {
        return res.status(200).send(subdesipline)
    })
})

//====================================
//             GENDER
//====================================

app.post('/api/users/gender', auth, admin, (req,res)=>{
    const gender = new Gender(req.body)

    gender.save((err, doc)=>{
        if (err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
            gender: doc
        })
    }) 
})

app.get('/api/users/genders', (req,res)=>{
    Gender.find({}, (err, gender) => {
        if (err) return res.status(400).send(err)
        res.status(200).send(gender)
    })
})

//====================================
//            INSTITUTION
//====================================

app.post('/api/users/institution', auth, admin, (req,res)=>{
    const institution = new Institution(req.body)

    institution.save((err, doc)=>{
        if (err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
            institution: doc
        })
    }) 
})

app.get('/api/users/institutions', (req,res)=>{
    Institution.find({}, (err, institution) => {
        if (err) return res.status(400).send(err)
        res.status(200).send(institution)
    })
})

//====================================
//             PROVINCE
//====================================

app.post('/api/users/province', auth, admin, (req,res)=>{
    const province = new Province(req.body)

    province.save((err, doc)=>{
        if (err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
            province: doc
        })
    })
})

app.get('/api/users/provinces', (req,res)=>{
    Province.find({}, (err, province) => {
        if (err) return res.status(400).send(err)
        res.status(200).send(province)
    })
})

//====================================
//             DISTRICT
//====================================

app.post('/api/users/district', auth, admin, (req,res)=>{
    const district = new District(req.body)

    district.save((err, doc)=>{
        if (err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
            district: doc
        })
    })
})

app.get('/api/users/districts', (req,res)=>{
    District.find({}).
    populate('province').
    exec((err, district) => {
        return res.status(200).send(district)
    })
})


//====================================
//                USERS
//====================================

app.get('/api/users/auth', auth, (req,res)=>{
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        _id: req.user._id,
        email: req.user.email,
        gender: req.user.gender,
        name: req.user.name,
        lastname: req.user.lastname,
        prefix: req.user.prefix,
        englishName: req.user.englishName,
        englishLastname: req.user.englishLastname,
        englishPrefix: req.user.englishPrefix,
        profileImage: req.user.profileImage,
        address: req.user.address,
        profileDescription: req.user.profileDescription,
        affiliation: req.user.affiliation,
        dateOfBirth: req.user.dateOfBirth,
        placeOfBirth: req.user.placeOfBirth,
        nationality: req.user.nationality,
        minor_ethnicity: req.user.minor_ethnicity,
        desipline: req.user.desipline,
        degree: req.user.degree,
        research_area: req.user.research_area,
        education: req.user.education,
        researchArea: req.user.researchArea,
        teachingExperience: req.user.teachingExperience,
        award: req.user.award,
        following: req.user.following,
        follower: req.user.follower,
        research: req.user.research,
        language: req.user.language,
        phone: req.user.phone,
        mobile: req.user.mobile,
        fax: req.user.fax,
        facebook: req.user.facebook,
        website: req.user.website,
        role: req.user.role,
        emailIsVerified: req.user.emailIsVerified,
        accountIsVerified: req.user.accountIsVerified,
        advisor: req.user.advisor,
        createdAt: req.user.createdAt
    })
})

app.post('/api/users/pre-register',(req,res)=>{
    const user = new User(req.body)

    user.save((err, doc)=>{
        if (err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
        })
    })
})

app.post('/api/users/login', (req, res)=>{
    // find the email
    User.findOne({'email': req.body.email}, (err, user)=>{
        if(!user) return res.json({loginSuccess: false, message: 'ອີເມລ ຫລື ລະຫັດບໍ່ຖືກຕ້ອງ, ກະລຸນາກວດສອບຂໍ້ມູນຄືນ'})

        if (!user.emailIsVerified) return res.json({loginSuccess: false, message: 'ອີເມລນີ້ຍັງບໍ່ໄດ້ຮັບການຢືນຢັນ, ກະລຸນາກວດສອບອີເມລຂອງທ່ານແລ້ວທໍາການຢືນຢັນ'})

        if (!user.accountIsVerified) return res.json({loginSuccess: false, message: 'ບັນຊີນີ້ຍັງບໍ່ໄດ້ຮັບການຢືນຢັນເທື່ອ ກະລຸນາລໍຖ້າເພື່ອໄດ້ຮັບການອະນຸມັດການໃຊ້ບັນຊີນີ້'})

        user.comparePassword(req.body.password, (err, isMatch)=>{
            if (!isMatch) return res.json({loginSuccess: false, message: 'ລະຫັດບໍ່ຖືກຕ້ອງ, ກະລຸນາກວດສອບຄືນໃຫມ່'})

            user.generateToken((err, user)=>{
                if (err) return res.status(400).send(err)
                res.cookie('w_auth', user.token).status(200).json({
                    loginSuccess: true
                })
            })
        })
    })

    // check the password

    //generate a token
})

app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: '' },
        (err,doc)=>{
            if(err) return res.json({success: false, err})
            return res.status(200).send({
                success: true
            })
        }
    )
})

//====================================
//            RESEARCHERS
//====================================


// /api/researchers/profiles?id=asdasd,asdasdas,asdasd&type=single
app.get('/api/researchers/profiles_by_id', (req,res)=>{
    let type = req.query.type
    let items = req.query.id

    if (type === "array") {
        let ids = req.query.id.split(',')
        items = []
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    User.
    find({ '_id' : {$in: items}}).
    populate('gender').
    populate({
        path: 'address.district',
    }).
    populate({
        path: 'address.province',
    }).
    populate({
        path: 'desipline.maindesipline',
    }).
    populate({
        path: 'desipline.subdesipline.item',
    }).
    populate({
        path: 'affiliation.institution',
    }).
    populate({
        path: 'affiliation.department',
    }).
    populate({
        path: 'affiliation.faculty',
    }).
    populate({
        path: 'placeOfBirth.country'
    }).
    populate({
        path: 'education.country'
    }).
    populate({
        path: 'teachingExperience.country'
    }).
    populate({
        path: 'researchExperience.country'
    }).
    exec((err, docs)=>{
        return res.status(200).send(docs)
    })
})

const port = process.env.PORT || 3002

app.listen(port,()=>{
    console.log(`Server Running at ${port}`)
})