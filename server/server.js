const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const normalizeUrl = require('normalize-url');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'))

// Models
const { User } = require("./models/user");
const { Gender } = require("./models/gender");
const { ResearchArea } = require("./models/research_area");
const { Province } = require("./models/province");
const { District } = require("./models/district");
const { Institution } = require("./models/institution");
const { Desipline } = require("./models/desipline");
const { Subdesipline } = require("./models/subdesipline");
const { Country } = require("./models/country");
const { Department } = require("./models/department");
const { Faculty } = require("./models/faculty");

const { ResearchType } = require("./models/research_type");
const { PublicationType } = require("./models/publication_type");
const { Research } = require("./models/research");

// Middlewares
const { auth } = require("./middleware/auth");
const { admin } = require("./middleware/admin");

//====================================
//             DEPARTMENTS
//====================================

app.get("/api/users/departments", (req, res) => {
  Department.find({'faculty': mongoose.Types.ObjectId('5caed82590264f5c10201b4a')}, (err, departments) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(departments);
  });
});

//====================================
//             COUNTRY
//====================================

app.post("/api/users/country", auth, admin, (req, res) => {
  const country = new Country(req.body);

  country.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      country: doc
    });
  });
});

app.get("/api/users/countries", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "englishName";
  let limit = parseInt(req.query.limit);

  Country.find()
    .sort([[sortBy, order]])
    .select("_id laoName")
    .limit(limit)
    .exec((err, countries) => {
      if (err) return res.status(400).send(err);
      res.send(countries);
    });
});

//====================================
//             RESEARCH AREA
//====================================

app.post("/api/research/research_area", auth, admin, (req, res) => {
  const researchArea = new ResearchArea(req.body);

  researchArea.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      researchArea: doc
    });
  });
});

app.get("/api/research/research_areas", (req, res) => {
  ResearchArea.find({}, (err, researchAreas) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(researchAreas);
  });
});

//====================================
//             DESIPLINE
//====================================

app.post("/api/research/desipline", auth, admin, (req, res) => {
  const desipline = new Desipline(req.body);

  desipline.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      desipline: doc
    });
  });
});

app.get("/api/research/desiplines", (req, res) => {
  Desipline.find({}, (err, desipline) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(desipline);
  });
});

//====================================
//            SUBDESIPLINE
//====================================

app.post("/api/research/subdesipline", auth, admin, (req, res) => {
  const subdesipline = new Subdesipline(req.body);

  subdesipline.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      subdesipline: doc
    });
  });
});

app.get("/api/research/subdesiplines", (req, res) => {
  Subdesipline.find({})
    .populate("desipline")
    .exec((err, subdesipline) => {
      return res.status(200).send(subdesipline);
    });
});

//====================================
//             GENDER
//====================================

app.post("/api/users/gender", auth, admin, (req, res) => {
  const gender = new Gender(req.body);

  gender.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      gender: doc
    });
  });
});

app.get("/api/users/genders", (req, res) => {
  Gender.find({}, (err, gender) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(gender);
  });
});

//====================================
//            INSTITUTION
//====================================

app.post("/api/users/institution", auth, admin, (req, res) => {
  const institution = new Institution(req.body);

  institution.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      institution: doc
    });
  });
});

app.get("/api/users/institutions", (req, res) => {
  Institution.find({}, (err, institution) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(institution);
  });
});

//====================================
//             PROVINCE
//====================================

app.post("/api/users/province", auth, admin, (req, res) => {
  const province = new Province(req.body);

  province.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      province: doc
    });
  });
});

app.get("/api/users/provinces", (req, res) => {
  Province.find({}, (err, province) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(province);
  });
});

//====================================
//             DISTRICT
//====================================

app.post("/api/users/district", auth, admin, (req, res) => {
  const district = new District(req.body);

  district.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      district: doc
    });
  });
});

app.get("/api/users/districts", (req, res) => {
  District.find({})
    .populate("province")
    .exec((err, district) => {
      return res.status(200).send(district);
    });
});

app.get("/api/users/districts_by_province", (req, res) => {
  if (req.query.province) {
    District.find({province: req.query.province})

    .exec((err, district) => {
      return res.status(200).send(district);
    });
  }
});

//====================================
//                USERS
//====================================

app.get("/api/users/auth", auth, (req, res) => {
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
  });
});

app.post("/api/users/pre-register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true
    });
  });
});

app.post("/api/users/login", (req, res) => {
  // find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "ອີເມລ ຫລື ລະຫັດບໍ່ຖືກຕ້ອງ, ກະລຸນາກວດສອບຂໍ້ມູນຄືນ"
      });

    if (!user.emailIsVerified)
      return res.json({
        loginSuccess: false,
        message:
          "ອີເມລນີ້ຍັງບໍ່ໄດ້ຮັບການຢືນຢັນ, ກະລຸນາກວດສອບອີເມລຂອງທ່ານແລ້ວທໍາການຢືນຢັນ"
      });

    if (!user.accountIsVerified)
      return res.json({
        loginSuccess: false,
        message:
          "ບັນຊີນີ້ຍັງບໍ່ໄດ້ຮັບການຢືນຢັນເທື່ອ ກະລຸນາລໍຖ້າເພື່ອໄດ້ຮັບການອະນຸມັດການໃຊ້ບັນຊີນີ້"
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "ລະຫັດບໍ່ຖືກຕ້ອງ, ກະລຸນາກວດສອບຄືນໃຫມ່"
        });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie("w_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true
          });
      });
    });
  });

  // check the password

  //generate a token
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});

//====================================
//            RESEARCHERS
//====================================

// /api/researchers/profiles?id=asdasd,asdasdas,asdasd&type=single
app.get("/api/researchers/profiles_by_id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  User.find({ _id: { $in: items }, emailIsVerified: true, accountIsVerified: true })
    .populate("gender")
    .populate({
      path: "address.district"
    })
    .populate({
      path: "address.province"
    })
    .populate({
      path: "desipline.maindesipline"
    })
    .populate({
      path: "desipline.subdesipline.item"
    })
    .populate({
      path: "affiliation.institution"
    })
    .populate({
      path: "affiliation.department"
    })
    .populate({
      path: "affiliation.faculty"
    })
    .populate({
      path: "placeOfBirth.country"
    })
    .populate({
      path: "education.country"
    })
    .populate({
      path: "teachingExperience.country"
    })
    .populate({
      path: "researchExperience.country"
    })
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

app.get("/api/researchers/followings", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 3;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0

  let type = req.query.type;
  let items = req.query.id;

  if (req.query.id) {
    if (type === "array") {
      let ids = req.query.id.split(",");
      items = [];
      items = ids.map(item => {
        return mongoose.Types.ObjectId(item);
      });
    }
    User.find({ _id: { $in: items }, emailIsVerified: true, accountIsVerified: true })
      .sort([[sortBy, order]])
      .limit(limit)
      .skip(skip)
      .select("_id name lastname profileImage affiliation researchArea")
      .populate({
        path: "affiliation.institution"
      })
      .populate({
        path: "affiliation.department"
      })
      .populate({
        path: "affiliation.faculty"
      })
      .exec((err, following) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(following);
      });
  }
});

app.get("/api/researchers/followers", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 3;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0

  let type = req.query.type;
  let items = req.query.id;

  if (req.query.id) {
    if (type === "array") {
      let ids = req.query.id.split(",");
      items = [];
      items = ids.map(item => {
        return mongoose.Types.ObjectId(item);
      });
    }
    User.find({ _id: { $in: items }, emailIsVerified: true, accountIsVerified: true })
      .sort([[sortBy, order]])
      .limit(limit)
      .skip(skip)
      .select("_id name lastname profileImage affiliation researchArea")
      .populate({ 
        path: "affiliation.institution"
      })
      .populate({
        path: "affiliation.department"
      })
      .populate({
        path: "affiliation.faculty"
      })
      .exec((err, follower) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(follower);
      });
  }
});

app.post("/api/researchers/follow", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false;

    doc.following.forEach(item => {
      if (item._id == req.query.userId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      res.status(200).json({ message: "Already followed" });
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            following: {
              _id: mongoose.Types.ObjectId(req.query.userId),
              createdAt: Date.now()
            }
          }
        },
        {
          new: true
        },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.following);
        }
      );
    }
  });
});

app.post("/api/researchers/addFollower", auth, (req, res) => {
  User.findOne({ _id: req.query.userId }, (err, doc) => {
    let duplicate = false;

    doc.follower.forEach(item => {
      if (item._id == req.user._id) {
        duplicate = true;
      }
    });

    if (duplicate) {
      res.status(200).json({ message: "Already add follower" });
    } else {
      User.findOneAndUpdate(
        { _id: req.query.userId },
        {
          $push: {
            follower: mongoose.Types.ObjectId(req.user._id)
          }
        },
        {
          new: true
        },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.follower);
        }
      );
    }
  });
});

app.post("/api/researchers/unfollow", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: {
        following: {
          _id: mongoose.Types.ObjectId(req.query.userId)
        }
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json(doc.following);
    }
  );
});

app.post("/api/researchers/removeFollower", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $pull: {
        follower: mongoose.Types.ObjectId(req.user._id)
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json(doc.follower);
    }
  );
});


app.post("/api/researchers/update_mobile", auth, (req, res) => {
  
  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $set: {
        mobile: req.query.mobile
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        mobile: doc.mobile
      });
    }
  );
});

app.post("/api/researchers/update_phone", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $set: {
        phone: req.query.phone
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        phone: doc.phone
      });
    }
  );
});

app.post("/api/researchers/update_fax", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $set: {
        fax: req.query.fax
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        fax: doc.fax
      });
    }
  );
});

app.post("/api/researchers/update_nationality", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $set: {
        nationality: req.query.nationality
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        nationality: doc.nationality
      });
    }
  );
});

app.post("/api/researchers/update_minor_ethnicity", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $set: {
        minor_ethnicity: req.query.minor_ethnicity
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        minor_ethnicity: doc.minor_ethnicity
      });
    }
  );
});

app.post("/api/researchers/update_date_of_birth", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $set: {
        dateOfBirth: req.query.dateOfBirth
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        dateOfBirth: doc.dateOfBirth
      });
    }
  );
});

app.post("/api/researchers/update_degree", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $set: {
        degree: req.query.degree
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        degree: doc.degree
      });
    }
  );
});

app.post("/api/researchers/update_profile_description", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $set: {
        profileDescription: req.query.profileDescription
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        profileDescription: doc.profileDescription
      });
    }
  );
});

app.post("/api/researchers/update_name", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $set: {
        prefix: req.query.prefix,
        name: req.query.prefix,
        lastname: req.query.prefix,
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        prefix: doc.dateOfBirth,
        name: doc.name,
        lastname: doc.lastname,
      });
    }
  );
});

app.post("/api/researchers/update_website", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $set: {
        website: normalizeUrl(req.query.website)
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        website: doc.website
      });
    }
  );
});

app.post("/api/researchers/update_facebook", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $set: {
        facebook: {
          name: req.query.name,
          url: normalizeUrl(req.query.url)
        }
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        facebook: doc.facebook
      });
    }
  );
});

app.post("/api/researchers/update_address", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $set: {
        address: {
          village: req.query.village,
          district: mongoose.Types.ObjectId(req.query.district),
          province: mongoose.Types.ObjectId(req.query.province),
        }
      }
    },
    {
      new: true
    }
  )
  .populate({path:'address.district', model: 'District' })
  .populate({path:'address.province', model: 'Province' })
  .exec((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      address: doc.address
    })
  })
});

app.post("/api/researchers/update_affiliation", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $set: {
        affiliation: {
          institution: mongoose.Types.ObjectId(req.query.institution),
          faculty: mongoose.Types.ObjectId(req.query.faculty),
          department: mongoose.Types.ObjectId(req.query.department),
          position: req.query.position,
        }
      }
    },
    {
      new: true
    }
  )
  .populate({path:'affiliation.institution', model: 'Institution' })
  .populate({path:'affiliation.faculty', model: 'Faculty' })
  .populate({path:'affiliation.department', model: 'Department' })
  .exec((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      affiliation: {
        institution: doc.institution,
        faculty: doc.faculty,
        department: doc.department,
        position: doc.position,
      },
    })
  })
});

app.post("/api/researchers/update_place_of_birth", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $set: {
        placeOfBirth: {
          village: req.query.village,
          district: req.query.district,
          province: req.query.province,
          country: mongoose.Types.ObjectId(req.query.country),
        }
      }
    },
    {
      new: true
    }
  )
  .populate({path:'placeOfBirth.country', model: 'Country' })
  .exec((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      placeOfBirth: doc.placeOfBirth
    })
  })
});

app.post("/api/researchers/update_gender", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $set: {
        gender: mongoose.Types.ObjectId(req.query.gender)
      }
    },
    {
      new: true
    }
  )
  .populate({path:'gender', model: 'Gender' })
  .exec((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      gender: doc.gender
    })
  })
});

//====================================
//             RESEARCH AREA
//====================================

/*  RESEARCH TYPES  */
app.get("/api/research/research_types", (req, res) => {
  ResearchType.find({}, (err, researchTypes) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(researchTypes);
  });
});

app.post("/api/research/research_type", auth, admin, (req, res) => {
  const researchTypes = new ResearchType(req.body);

  researchTypes.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      researchType: doc
    });
  });
});

/*  PUBLICATION TYPES  */

app.get("/api/research/publication_types", (req, res) => {
  PublicationType.find({}, (err, publicationTypes) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(publicationTypes);
  });
});

app.post("/api/research/publication_type", auth, admin, (req, res) => {
  const publicationTypes = new PublicationType(req.body);

  publicationTypes.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      publicationType: doc
    });
  });
});

/*  Researches  */

app.post('/api/research/researches', (req, res)=> {
  let order = req.body.order ? req.body.order : 'desc'
  let sortBy = req.body.sortBy ? req.body.sortBy : 'createdAt'
  let limit = req.body.limit ? parseInt(req.body.limit) : 6
  let skip = req.body.skip ? parseInt(req.body.skip) : 0
  let findArgs = {}

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key]
    }
  }

  console.log(findArgs)

  res.status(200)
})

app.get('/api/research/researches_by_id', (req, res)=> {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 3;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0

  let type = req.query.type;
  let items = req.query.id;

  if (req.query.id) {
    if (type === "array") {
      let ids = req.query.id.split(",");
      items = [];
      items = ids.map(item => {
        return mongoose.Types.ObjectId(item);
      });
    }

    // const myObjectId = (rnd = r16 => Math.floor(r16).toString(16)) =>
    // rnd(Date.now()/1000) + ' '.repeat(16).replace(/./g, () => rnd(Math.random()*16));

    // console.log(myObjectId().toString())

    Research.find({ _id: { $in: items } })
      .sort([[sortBy, order]])
      .limit(limit)
      .skip(skip)
      // .select("_id name lastname profileImage affiliation researchArea")
      .populate({
        path: "author",
        model: 'User',
        select: ['name', 'lastname', 'profileImage']
      })
      .populate({
        path: "supervisor",
        model: 'User',
        select: ['name', 'lastname', 'profileImage']
      })
      .populate({ 
        path: "uploader",
        select: ['name', 'lastname', 'profileImage']
      })
      .populate({ 
        path: "researchType"
      })
      .populate({ 
        path: "publicationType"
      })
      .populate({ 
        path: "files.uploader",
        select: ['name', 'lastname', 'profileImage']
      })
      // .populate({
      //   path: "affiliation.department"
      // })
      // .populate({
      //   path: "affiliation.faculty"
      // })
      .exec((err, researches) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(researches);
      });
  }
})

app.post('/api/research/research', auth, (req,res)=>{
  const research = new Research(req.body);

  research.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      doc
    });

    // REMINDER: add researches id to other authors
    
    User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          research: mongoose.Types.ObjectId(doc._id)
        }
      },
      {
        new: true
      },
      (err, research) => {
        if (err) return res.json({ success: false, err });
      }
    );

  });
})

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
