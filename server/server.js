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
const { ResearchArea } = require('./models/research_area')

// Middlewares
const { auth } = require('./middleware/auth')
const { admin } = require('./middleware/admin')

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
//                USERS
//====================================

app.get('/api/users/auth', auth, (req,res)=>{
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
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
        if(!user) return res.json({loginSuccess: false, message: 'ບໍ່ມີອີເມລນີ້ໃນລະບົບ, ກະລຸນາລົງທະບຽນກ່ອນ'})

        if (!user.emailIsVerified) return res.json({loginSuccess: false, message: 'ອີເມລນີ້ຍັງບໍ່ໄດ້ຮັບການຢືນຢັນ, ກະລຸນາກວດສອບອີເມລຂອງທ່ານແລ້ວທໍາການຢືນຢັນ'})

        if (!user.accountIsVerified) return res.json({loginSuccess: false, message: 'ບັນຊີນີ້ຍັງບໍ່ໄດ້ຮັບການຢືນຢັນເທື່ອ ກະລຸນາລໍຖ້າເພື່ອໄດ້ຮັບການອະນຸມັດການໃຊ້ບັນຊີນີ້'})

        user.comparePassword(req.body.password, (err, isMatch)=>{
            if (!isMatch) return res.json({loginSuccess: false, message: 'ລະຫັດບໍ່ຖືກຕ້ອງ, ກະລຸນາກວດສອບຄືນໃຫມ່'})

            user.generateToken((err, user)=>{
                if (err) return res.statusq(400).send(err)
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

const port = process.env.PORT || 3002

app.listen(port,()=>{
    console.log(`Server Running at ${port}`)
})