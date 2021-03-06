const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const _ = require("lodash");
const uuidv4 = require("uuid/v4");

const normalizeUrl = require("normalize-url");
const moment = require("moment");

const pdf = require("pdf-parse");
const textract = require("textract");

const readChunk = require("read-chunk");
const fileType = require("file-type");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
// mongoose.set('debug', true);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
const cors = require("cors");
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/tmp", express.static("tmp"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
const { Degree } = require("./models/degree");

const { ResearchType } = require("./models/research_type");
const { PublicationType } = require("./models/publication_type");
const { Research } = require("./models/research");

// Middlewares
const { auth } = require("./middleware/auth");
const { admin } = require("./middleware/admin");
const fs = require("fs");

//====================================
//             UTILS
//====================================

const cheerio = require("cheerio");
const getUrls = require("get-urls");
const fetch = require("node-fetch");

const scrapeMetatags = text => {
  const urls = Array.from(getUrls(text));
  const requests = urls.map(async url => {
    const res = await fetch(url);

    const html = await res.text();
    const $ = cheerio.load(html);

    const getMetatag = name =>
      $(`meta[name=${name}]`).attr("content") ||
      $(`meta[name="og:${name}"]`).attr("content") ||
      $(`meta[name="twitter:${name}"]`).attr("content");

    return {
      url,
      title: $("title")
        .first()
        .text(),
      favicon: $('link[rel="shortcut icon"]').attr("href"),
      // description: $('meta[name=description]').attr('content'),
      description: getMetatag("description"),
      image: getMetatag("image"),
      author: getMetatag("author")
    };
  });
  return Promise.all(requests);
};

app.get("/api/research/get_metatags", (req, res) => {
  scrapeMetatags(req.query.url).then((result, err) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(result);
  });
});

const generateRandomString = length => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

//====================================
//             UPLOAD FILES
//====================================

let publicationFileName = "";

const multer = require("multer");
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    let filename = `${Date.now()}_${file.originalname}`;
    cb(null, filename);
    publicationFileName = filename;
  }
});

const upload = multer({ storage: storage }).single("file");

app.post("/api/research/upload_publication", auth, (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({ success: true, filename: publicationFileName });
  });
});

app.post("/api/research/remove_publication_file", auth, (req, res) => {
  // const file = "." + `/uploads/${req.query.filename}`
  const path = "." + `/uploads/${req.query.filename}`;

  fs.unlink(path, err => {
    return res.json({ success: true });
  });
});

//====================================
//             UPLOAD IMAGES
//====================================

let objectId = "";
var profileImageTempDir = "";

var profileImageTempName = "";

let imageTempStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    objectId = new mongoose.Types.ObjectId(Date.now());
    profileImageTempDir = "tmp" + "/" + uuidv4();
    fs.mkdirSync(profileImageTempDir);
    cb(null, profileImageTempDir);
  },
  filename: (req, file, cb) => {
    let filename = `${file.originalname}`;
    cb(null, filename);
    profileImageTempName = filename;
  }
});

const uploadTempProfileImage = multer({ storage: imageTempStorage }).single(
  "file"
);

app.post("/api/users/upload_tmp_profile_image", auth, (req, res) => {
  uploadTempProfileImage(req, res, err => {
    if (err) {
      return res.json({ success: false, err });
    }
    console.log(profileImageTempDir + "/" + profileImageTempName);
    return res.json({
      success: true,
      filename: profileImageTempName,
      location: profileImageTempDir + "/" + profileImageTempName
    });
  });
});

var profileImageDir = "";
var profileImageName = "";

let imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    objectId = new mongoose.Types.ObjectId(Date.now());
    profileImageDir =
      "uploads" + "/" + "images" + "/" + "profile_images" + "/" + uuidv4();
    fs.mkdirSync(profileImageDir);
    cb(null, profileImageDir);
  },
  filename: (req, file, cb) => {
    let filename = `${file.originalname}`;
    cb(null, filename);
    profileImageName = filename;
    profileImageSize = file.size;
  }
});

const uploadProfileImage = multer({ storage: imageStorage }).single("file");

app.post("/api/users/upload_profile_image", auth, (req, res) => {
  if (req.query.action === "remove") {
    User.updateOne(
      {
        _id: req.query.userId
      },
      {
        $set: {
          profileImage: null
        }
      },
      (err, doc) => {
        if (req.query.location) {
          const path = "." + `/${req.query.location}`;

          fs.unlink(path, err => {});
        }
        if (err) return res.json({ success: false, err });
        return res.json({ success: true });
      }
    );
  } else {
    uploadProfileImage(req, res, err => {
      if (err) {
        return res.json({ success: false, err });
      }
      let profileImage = [];
      profileImage[0] = {
        name: profileImageName,
        location: profileImageDir + "/" + profileImageName,
        date: moment(),
        uploader: req.user._id,
        size: req.file.size
      };
      console.log(req.query.userId);
      User.updateOne(
        {
          _id: req.query.userId
        },
        {
          $set: {
            profileImage
          }
        },
        {
          new: true
        },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          if (req.query.location) {
            const path = "." + `/${req.query.location}`;

            fs.unlink(path, err => {});
          }
          return res.json({
            success: true,
            filename: profileImageName,
            location: profileImageDir + "/" + profileImageName
          });
        }
      );
    });
  }
});

var publicationFileTempDir = "";

let publicationFileTempStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const randomDir = generateRandomString(100);

    publicationFileTempDir = "tmp/" + randomDir;
    fs.mkdirSync(publicationFileTempDir);
    cb(null, publicationFileTempDir);
  },
  filename: (req, file, cb) => {
    let filename = `${file.originalname}`;
    cb(null, filename);
  }
});

const uploadTempPublicationFile = multer({
  storage: publicationFileTempStorage
}).single("file");

app.post("/api/research/upload_tmp_publication_file", auth, (req, res) => {
  let numPages = null;
  let title = null;
  let fileData = {};
  try {
    uploadTempPublicationFile(req, res, err => {
      if (err) {
        return res.json({ success: false, err });
      }

      const fileUrl =
        "./" + publicationFileTempDir + "/" + req.file.originalname;

      const buffer = readChunk.sync(fileUrl, 0, fileType.minimumBytes);

      const ft = fileType(buffer);

      if (!ft) {
        return res.json({ success: false });
      } else if (ft.ext === "msi" || ft.ext === "docx" || ft.ext === "pdf") {
        fileData = {
          success: true,
          name: req.file.originalname,
          location: publicationFileTempDir + "/" + req.file.originalname,
          date: moment(),
          mimetype: req.file.mimetype,
          uploader: req.user._id,
          size: req.file.size
        };

        switch (ft.ext) {
          case "pdf":
            let dataBuffer = fs.readFileSync(fileUrl);

            pdf(dataBuffer).then(function(data) {
              // number of pages
              numPages = data.numpages;
              // // number of rendered pages
              // console.log(data.numrender);
              // // PDF info
              // console.log(data.info);
              // // PDF metadata
              // console.log(data.metadata);
              // // PDF.js version
              // // check https://mozilla.github.io/pdf.js/getting_started/
              // console.log(data.version);
              // PDF text
              const text = data.text.trim();

              // title = text.split(".")[0];
              text
                .split("Abstract")
                .pop()
                .split(".\n")[0]
                ? (fileData.abstract = text
                    .split("Abstract")
                    .pop()
                    .split(".\n")[0])
                : null;
              text.split(".")[0] ? (fileData.title = text.split(".")[0]) : null;
              data.numpages ? (fileData.numPages = data.numpages) : null;
              return res.json(fileData);
            });
            break;
          case "docx":
            textract.fromFileWithPath(fileUrl, function(error, text) {
              if (error) return null;
              fileData.title = text.trim().split(".")[0];
              text
                .split("Abstract")
                .pop()
                .split(".")[0]
                ? (fileData.abstract = text
                    .split("Abstract")
                    .pop()
                    .split(".")[0])
                : null;
              return res.json(fileData);
            });
            break;
          case "msi":
            textract.fromFileWithPath(fileUrl, function(error, text) {
              if (error) return null;
              fileData.title = text.trim().split(".")[0];
              text
                .split("Abstract")
                .pop()
                .split(".")[0]
                ? (fileData.abstract = text
                    .split("Abstract")
                    .pop()
                    .split(".")[0])
                : null;
              return res.json(fileData);
            });
            break;
          default:
            // return res.json({ success: false });

            break;
        }

        console.log(title);

        // textract.fromFileWithPath("./uploads/Proposal-final.docx", function( error, text ) {
        //   console.log(text.split('.')[0]),
        //   console.log(error)
        // })
      } else {
        return res.json({ success: false });
      }
    });
  } catch (e) {
    console.log(e);
    return res.json({ success: false, e });
  }
});

//====================================
//             DEPARTMENTS
//====================================

app.get("/api/users/departments", (req, res) => {
  Department.find(
    { faculty: mongoose.Types.ObjectId("5caed82590264f5c10201b4a") },
    (err, departments) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(departments);
    }
  );
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
    .exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, country: doc });
    });
});

//====================================
//             RESEARCH AREA
//====================================

app.post("/api/research/research_area", auth, admin, (req, res) => {
  const researchArea = new ResearchArea({ name: req.query.name });

  researchArea.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      researchArea: doc
    });
  });
});

app.get("/api/research/research_areas", (req, res) => {
  ResearchArea.find({})
    .sort([["name", "asc"]])
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(doc);
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
//             DEGREE
//====================================

app.post("/api/users/degree", auth, admin, (req, res) => {
  const degree = new Degree(req.body);

  degree.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      degree: doc
    });
  });
});

app.get("/api/users/degrees", (req, res) => {
  Degree.find({}, (err, degree) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(degree);
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
    District.find({ province: req.query.province }).exec((err, district) => {
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
    // degree: req.user.degree,
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
    likes: req.user.likes,
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

app.get("/api/researcher_profiles/count", (req, res) => {
  User.find({
    emailIsVerified: true,
    accountIsVerified: true,
    active: true
  }).exec((err, docs) => {
    Research.find({}).exec((err, researchDoc) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        profileCount: docs.length,
        researchCount: researchDoc.length
      });
    });
  });
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// /api/researchers/profiles?id=asdasd,asdasdas,asdasd&type=single
app.post("/api/researchers/search", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;
  let ids = [];
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  findArgs.emailIsVerified = true;
  findArgs.accountIsVerified = true;
  findArgs.active = true;

  let reg = new RegExp(req.query.search, "i");
  // User.aggregate([
  //   {$project: {fullname: {$concat: ['$name', ' ', '$lastname']}, doc: '$$ROOT'}},
  // {$match: {fullname: reg}}
  // ], function(err, persons){
  //   findArgs["_id"] = persons;
  //   persons.map((value, index)=>{
  //     // console.log(persons[index]._id)
  //     ids.push(persons[index]._id)
  //   })
  // })

  // findArgs["affiliation.department"] = "5cd3a6481c9d44000074849b"

  if (findArgs || req.query.search) {
    const regex = new RegExp(
      escapeRegex(req.query.search ? req.query.search : ""),
      "gi"
    );

    User.find({
      emailIsVerified: true,
      accountIsVerified: true,
      active: true,
      $or: [
        { name: { $regex: reg, $options: "m" } },
        { lastname: { $regex: reg, $options: "m" } },
        { prefix: { $regex: reg, $options: "m" } },
        { "affiliation.position": { $regex: reg, $options: "m" } }
      ]
    })
      .select("_id")

      .exec((err, docs) => {
        if (docs) {
          docs.map((value, index) => {
            // Array.prototype.push.apply(ids, value["_id"])
            ids.push(value["_id"]);
          });
        }

        // console.log(ids)

        findArgs._id = ids;

        User.find(findArgs)
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
          .populate({
            path: "education",
            options: { sort: { city: 1 } }
          })
          .exec((err, result) => {
            // console.log(findArgs);
            return res.status(200).send(result);
          });
      });
  }
});

app.post("/api/researchers/researchers", auth, admin, (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  findArgs.emailIsVerified = true;
  findArgs.accountIsVerified = true;
  findArgs.active = true;

  User.find(findArgs)
    .populate("gender")
    .populate("degree")
    .populate("gender")
    .select("_id name lastname dateOfBirth prefix research degree affiliation")
    .populate({
      path: "affiliation.department"
    })
    .exec((err, result) => {
      return res.status(200).send(result);
    });
});

app.post("/api/research/reports/list", auth, admin, (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;

  let from = req.query.from ? req.query.from : null;
  let to = req.query.to ? req.query.to : null;
  let department = req.query.department ? req.query.department : null;
  let researchType = req.query.researchType ? req.query.researchType : null;
  let publicationType = req.query.publicationType
    ? req.query.publicationType
    : null;

  let findArgs = {};
  let findArgsResearch = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  if (researchType != null) {
    findArgsResearch["researchType"] = mongoose.Types.ObjectId(researchType);
  }

  if (publicationType != null) {
    findArgsResearch["publicationType"] = mongoose.Types.ObjectId(
      publicationType
    );
  }

  if (from != null && to != null) {
    findArgsResearch["date"] = {
      $gte: moment(from)
        .add(1, "days")
        .toDate(),
      $lte: moment(to)
        .add(1, "days")
        .toDate()
    };
  }

  if (department != null) {
    findArgs["affiliation.department"] = mongoose.Types.ObjectId(department);
  }

  findArgs.emailIsVerified = true;
  findArgs.accountIsVerified = true;
  findArgs.active = true;

  User.find(findArgs)
    .select("_id")
    .exec((err, userIds) => {
      let ids = [];
      if (!err) {
        ids = userIds.map(value => {
          return mongoose.Types.ObjectId(value._id);
        });
      }

      findArgsResearch["uploader"] = { $in: ids };

      Research.find(findArgsResearch)
        .sort([[sortBy, order]])
        .select(
          "_id title date likes comments shares citations reads downloads"
        )
        .populate({
          path: "uploader",
          model: "User",
          select: ["name", "lastname", "prefix"]
        })
        .populate({
          path: "author",
          model: "User",
          select: ["name", "lastname", "prefix"]
        })
        .populate("researchType")
        .populate("publicationType")

        .exec((err, result) => {
          if (err) return console.log(err);
          return res.status(200).json({
            allResearchesListReports: result,
            size: result.length
          });
        });

      // switch (by) {
      //   case "researchType":
      //     Research.aggregate([
      //       {
      //         $match: { uploader: { $in: ids }, date: {
      //           $gte: moment(from)
      //             .add(1, "days")
      //             .toDate(),
      //           $lte: moment(to)
      //             .add(1, "days")
      //             .toDate()
      //         }}
      //       },
      //       {
      //         $group: {
      //           _id: "$researchType",
      //           nationalCount: {
      //             $sum: {
      //               $cond: [
      //                 {
      //                   $and: [
      //                     {
      //                       $eq: [
      //                         "$publicationType",
      //                         mongoose.Types.ObjectId(
      //                           "5cdb90c8ae41ef71480b6e0d"
      //                         )
      //                       ]
      //                     }
      //                   ]
      //                 },
      //                 1,
      //                 0
      //               ]
      //             }
      //           },
      //           internationalCount: {
      //             $sum: {
      //               $cond: [
      //                 {
      //                   $and: [
      //                     {
      //                       $eq: [
      //                         "$publicationType",
      //                         mongoose.Types.ObjectId(
      //                           "5cdb90dbae41ef71480b6e0e"
      //                         )
      //                       ]
      //                     }
      //                   ]
      //                 },
      //                 1,
      //                 0
      //               ]
      //             }
      //           },
      //           count: { $sum: 1 }
      //         }
      //       }
      //     ]).exec((err, doc) => {
      //       ResearchType.populate(doc, { path: "_id" }, function(
      //         err,
      //         populatedDepartment
      //       ) {
      //         let allSum = 0,
      //           nationalSum = 0,
      //           internationalSum = 0;

      //         var result = doc.map(function(el, index) {
      //           var o = Object.assign({}, el);
      //           o["name"] = o["_id"].name;
      //           nationalSum += parseInt(o["nationalCount"]);
      //           internationalSum += parseInt(o["internationalCount"]);
      //           allSum += parseInt(o["count"]);
      //           return o;
      //         });
      //         var sumObject = {
      //           name: "ລວມ",
      //           nationalCount: nationalSum,
      //           internationalCount: internationalSum,
      //           count: allSum
      //         };

      //         result.push(sumObject);

      //         return res.status(200).json({
      //           allResearchesListsReports: result
      //         });
      //       });
      //     });
      //     break;
      //   case "publicationType":
      //     Research.aggregate([
      //       {
      //         $match: { uploader: { $in: ids }, date: {
      //           $gte: moment(from)
      //             .add(1, "days")
      //             .toDate(),
      //           $lte: moment(to)
      //             .add(1, "days")
      //             .toDate()
      //         } }
      //       },
      //       {
      //         $group: {
      //           _id: "$publicationType",

      //           count: { $sum: 1 }
      //         }
      //       },
      //       { $sort: { count: -1 } }
      //     ]).exec((err, doc) => {
      //       PublicationType.populate(doc, { path: "_id" }, function(
      //         err,
      //         populatedDepartment
      //       ) {
      //         let allSum = 0;

      //         var result = doc.map(function(el, index) {
      //           var o = Object.assign({}, el);
      //           o["name"] = o["_id"].name;
      //           allSum += parseInt(o["count"]);
      //           return o;
      //         });
      //         var sumObject = {
      //           name: "ລວມ",
      //           count: allSum
      //         };

      //         result.push(sumObject);
      //         return res.status(200).json({
      //           allResearchesListsReports: result
      //         });
      //       });
      //     });
      //     break;
      //   default:
      //     break;
      // }

      // return res.status(200).json({
      //   allResearchersListsReports: result,
      //   size: result.length
      // });
    });
});

app.post("/api/research/reports/number", auth, admin, (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;

  let from = req.query.from ? req.query.from : null;
  let to = req.query.to ? req.query.to : null;
  let department = req.query.department ? req.query.department : null;
  let researchType = req.query.researchType ? req.query.researchType : null;
  let publicationType = req.query.publicationType
    ? req.query.publicationType
    : null;
  let by = req.query.by ? req.query.by : "publicationType";

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  if (researchType != null) {
    findArgs["researchType"] = mongoose.Types.ObjectId(researchType);
  }

  if (publicationType != null) {
    findArgs["publicationType"] = mongoose.Types.ObjectId(publicationType);
  }

  // if (from != null && to != null) {
  //   findArgs["createdAt"] = {
  //     $gte: moment(from)
  //       .add(1, "days")
  //       .toDate(),
  //     $lte: moment(to)
  //       .add(1, "days")
  //       .toDate()
  //   };
  // }

  if (department != null) {
    findArgs["affiliation.department"] = mongoose.Types.ObjectId(department);
  }

  findArgs.emailIsVerified = true;
  findArgs.accountIsVerified = true;
  findArgs.active = true;

  User.find(findArgs)
    .select("_id")
    .exec((err, userIds) => {
      let ids = [];
      if (!err) {
        ids = userIds.map(value => {
          return mongoose.Types.ObjectId(value._id);
        });
      }

      switch (by) {
        case "researchType":
          Research.aggregate([
            {
              $match: {
                uploader: { $in: ids },
                date: {
                  $gte: moment(from)
                    .add(1, "days")
                    .toDate(),
                  $lte: moment(to)
                    .add(1, "days")
                    .toDate()
                }
              }
            },
            {
              $group: {
                _id: "$researchType",
                nationalCount: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          {
                            $eq: [
                              "$publicationType",
                              mongoose.Types.ObjectId(
                                "5cdb90c8ae41ef71480b6e0d"
                              )
                            ]
                          }
                        ]
                      },
                      1,
                      0
                    ]
                  }
                },
                internationalCount: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          {
                            $eq: [
                              "$publicationType",
                              mongoose.Types.ObjectId(
                                "5cdb90dbae41ef71480b6e0e"
                              )
                            ]
                          }
                        ]
                      },
                      1,
                      0
                    ]
                  }
                },
                count: { $sum: 1 }
              }
            }
          ]).exec((err, doc) => {
            ResearchType.populate(doc, { path: "_id" }, function(
              err,
              populatedDepartment
            ) {
              let allSum = 0,
                nationalSum = 0,
                internationalSum = 0;

              var result = doc.map(function(el, index) {
                var o = Object.assign({}, el);
                o["name"] = o["_id"].name;
                nationalSum += parseInt(o["nationalCount"]);
                internationalSum += parseInt(o["internationalCount"]);
                allSum += parseInt(o["count"]);
                return o;
              });
              var sumObject = {
                name: "ລວມ",
                nationalCount: nationalSum,
                internationalCount: internationalSum,
                count: allSum
              };

              result.push(sumObject);

              return res.status(200).json({
                allResearchesListsReports: result
              });
            });
          });
          break;
        case "publicationType":
          Research.aggregate([
            {
              $match: {
                uploader: { $in: ids },
                date: {
                  $gte: moment(from)
                    .add(1, "days")
                    .toDate(),
                  $lte: moment(to)
                    .add(1, "days")
                    .toDate()
                }
              }
            },
            {
              $group: {
                _id: "$publicationType",

                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } }
          ]).exec((err, doc) => {
            PublicationType.populate(doc, { path: "_id" }, function(
              err,
              populatedDepartment
            ) {
              let allSum = 0;

              var result = doc.map(function(el, index) {
                var o = Object.assign({}, el);
                o["name"] = o["_id"].name;
                allSum += parseInt(o["count"]);
                return o;
              });
              var sumObject = {
                name: "ລວມ",
                count: allSum
              };

              result.push(sumObject);
              return res.status(200).json({
                allResearchesListsReports: result
              });
            });
          });
          break;
        default:
          break;
      }

      // return res.status(200).json({
      //   allResearchersListsReports: result,
      //   size: result.length
      // });
    });
});

app.post(
  "/api/researchers/reports/all_researchers",
  auth,
  admin,
  (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "name";
    let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;
    let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;

    let from = req.query.from ? req.query.from : null;
    let to = req.query.to ? req.query.to : null;
    let department = req.query.department ? req.query.department : null;
    let findArgs = {};

    for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
        findArgs[key] = req.body.filters[key];
      }
    }

    if (from != null && to != null) {
      findArgs["createdAt"] = {
        $gte: moment(from)
          .add(1, "days")
          .toDate(),
        $lte: moment(to)
          .add(1, "days")
          .toDate()
      };
    }

    if (department != null) {
      findArgs["affiliation.department"] = mongoose.Types.ObjectId(department);
    }

    findArgs.emailIsVerified = true;
    findArgs.accountIsVerified = true;
    findArgs.active = true;

    if (department != null) {
      findArgs["affiliation.department"] = mongoose.Types.ObjectId(department);

      User.aggregate([
        // { $unwind: '$affiliation'},
        {
          $match: {
            emailIsVerified: true,
            accountIsVerified: true,
            active: true,
            createdAt: {
              $gte: moment(from)
                .add(1, "days")
                .toDate(),
              $lte: moment(to)
                .add(1, "days")
                .toDate()
            },
            "affiliation.department": mongoose.Types.ObjectId(department)
          }
        },
        // {
        {
          $group: {
            _id: "$affiliation.department",
            countByDepartment: { $sum: 1 },
            // isActive : { $addToSet: '$active' },
            maleCount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: [
                          "$gender",
                          mongoose.Types.ObjectId("5cb2c97c1331746efcc3b1fb")
                        ]
                      }
                    ]
                  },
                  1,
                  0
                ]
              }
            },
            femaleCount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: [
                          "$gender",
                          mongoose.Types.ObjectId("5cb2c98e1331746efcc3b1fd")
                        ]
                      }
                    ]
                  },
                  1,
                  0
                ]
              }
            },
            bachelorCount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: [
                          "$degree",
                          mongoose.Types.ObjectId("5d0bab397ba3dd53b44d06df")
                        ]
                      }
                    ]
                  },
                  1,
                  0
                ]
              }
            },
            masterCount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: [
                          "$degree",
                          mongoose.Types.ObjectId("5d0bab527ba3dd53b44d06e0")
                        ]
                      }
                    ]
                  },
                  1,
                  0
                ]
              }
            },
            doctorialCount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: [
                          "$degree",
                          mongoose.Types.ObjectId("5d0bab637ba3dd53b44d06e1")
                        ]
                      }
                    ]
                  },
                  1,
                  0
                ]
              }
            },
            age18to30Count: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $lte: [
                          "$dateOfBirth",
                          moment()
                            .subtract(18, "years")
                            .toDate()
                        ]
                      },
                      {
                        $gte: [
                          "$dateOfBirth",
                          moment()
                            .subtract(30, "years")
                            .toDate()
                        ]
                      }
                    ]
                  },
                  1,
                  0
                ]
              }
            },
            age31to45Count: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $lte: [
                          "$dateOfBirth",
                          moment()
                            .subtract(31, "years")
                            .toDate()
                        ]
                      },
                      {
                        $gte: [
                          "$dateOfBirth",
                          moment()
                            .subtract(45, "years")
                            .toDate()
                        ]
                      }
                    ]
                  },
                  1,
                  0
                ]
              }
            },
            age46to65Count: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $lte: [
                          "$dateOfBirth",
                          moment()
                            .subtract(46, "years")
                            .toDate()
                        ]
                      },
                      {
                        $gte: [
                          "$dateOfBirth",
                          moment()
                            .subtract(65, "years")
                            .toDate()
                        ]
                      }
                    ]
                  },
                  1,
                  0
                ]
              }
            }
          }
        },
        { $sort: { countByDepartment: -1 } }

        //  { $lookup: {from: 'users', localField: 'affiliation.department', foreignField: 'departments.name', as: 'department'} }
      ]).exec((err, doc) => {
        // console.log(doc);
        Department.populate(doc, { path: "_id" }, function(
          err,
          populatedDepartment
        ) {
          var result = doc.map(function(el, index) {
            var o = Object.assign({}, el);
            o["deapartmentName"] = o["_id"].name;

            return o;
          });

          if (err) return res.status(400).send(err);
          return res.status(200).json({
            allResearchersReports: result,
            size: result.length
          });
        });
      });
    } else {
      // console.log(findArgs);
      User.aggregate([
        // { $unwind: '$affiliation'},

        { $match: findArgs },
        {
          $group: {
            _id: "$affiliation.department",
            countByDepartment: { $sum: 1 },
            degree: { $addToSet: "$degree" },
            maleCount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: [
                          "$gender",
                          mongoose.Types.ObjectId("5cb2c97c1331746efcc3b1fb")
                        ]
                      }
                    ]
                  },
                  1,
                  0
                ]
              }
            },
            femaleCount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: [
                          "$gender",
                          mongoose.Types.ObjectId("5cb2c98e1331746efcc3b1fd")
                        ]
                      }
                    ]
                  },
                  1,
                  0
                ]
              }
            },
            bachelorCount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: [
                          "$degree",
                          mongoose.Types.ObjectId("5d0bab397ba3dd53b44d06df")
                        ]
                      }
                    ]
                  },
                  1,
                  0
                ]
              }
            },
            masterCount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: [
                          "$degree",
                          mongoose.Types.ObjectId("5d0bab527ba3dd53b44d06e0")
                        ]
                      }
                    ]
                  },
                  1,
                  0
                ]
              }
            },
            doctorialCount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: [
                          "$degree",
                          mongoose.Types.ObjectId("5d0bab637ba3dd53b44d06e1")
                        ]
                      }
                    ]
                  },
                  1,
                  0
                ]
              }
            },
            age18to30Count: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $lte: [
                          "$dateOfBirth",
                          moment()
                            .subtract(18, "years")
                            .toDate()
                        ]
                      },
                      {
                        $gte: [
                          "$dateOfBirth",
                          moment()
                            .subtract(30, "years")
                            .toDate()
                        ]
                      }
                    ]
                  },
                  1,
                  0
                ]
              }
            },
            age31to45Count: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $lte: [
                          "$dateOfBirth",
                          moment()
                            .subtract(31, "years")
                            .toDate()
                        ]
                      },
                      {
                        $gte: [
                          "$dateOfBirth",
                          moment()
                            .subtract(45, "years")
                            .toDate()
                        ]
                      }
                    ]
                  },
                  1,
                  0
                ]
              }
            },
            age46to65Count: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $lte: [
                          "$dateOfBirth",
                          moment()
                            .subtract(46, "years")
                            .toDate()
                        ]
                      },
                      {
                        $gte: [
                          "$dateOfBirth",
                          moment()
                            .subtract(65, "years")
                            .toDate()
                        ]
                      }
                    ]
                  },
                  1,
                  0
                ]
              }
            }
          }
        },
        { $sort: { countByDepartment: -1 } }
      ]).exec((err, doc) => {
        // console.log(doc);
        Department.populate(doc, { path: "_id" }, function(
          err,
          populatedDepartment
        ) {
          let maleSum = 0,
            femaleSum = 0,
            bachelorSum = 0,
            masterSum = 0,
            doctorialSum = 0,
            age18to30Sum = 0,
            age31to45Sum = 0,
            age46to65Sum = 0,
            allSum = 0;

          var result = doc.map(function(el, index) {
            var o = Object.assign({}, el);
            o["deapartmentName"] = o["_id"].name;
            maleSum += parseInt(o["maleCount"]);
            femaleSum += parseInt(o["femaleCount"]);
            bachelorSum += parseInt(o["bachelorCount"]);
            masterSum += parseInt(o["masterCount"]);
            doctorialSum += parseInt(o["doctorialCount"]);
            age18to30Sum += parseInt(o["age18to30Count"]);
            age31to45Sum += parseInt(o["age31to45Count"]);
            age46to65Sum += parseInt(o["age46to65Count"]);
            allSum += parseInt(o["countByDepartment"]);
            return o;
          });
          var sumObject = {
            deapartmentName: "ລວມ",
            maleCount: maleSum,
            femaleCount: femaleSum,
            bachelorCount: bachelorSum,
            masterCount: masterSum,
            doctorialCount: doctorialSum,
            age18to30Count: age18to30Sum,
            age31to45Count: age31to45Sum,
            age46to65Count: age46to65Sum,
            countByDepartment: allSum
          };

          result.push(sumObject);
          if (err) return res.status(400).send(err);
          return res.status(200).json({
            allResearchersReports: result,
            size: result.length
          });
        });
      });
    }

    // User.find(findArgs)
    //   .populate("gender")
    //   .populate("degree")
    //   .sort([[sortBy, order]])
    //   .select("_id dateOfBirth")
    //   .populate({
    //     path: "affiliation.department"
    //   })
    //   .exec((err, result) => {
    //     if (err) return res.status(400).send(err);
    //     return res.status(200).json({
    //       allResearchersReports: result,
    //       size: result.length
    //     });
    //   });
  }
);

app.post(
  "/api/researchers/reports/all_researchers_lists",
  auth,
  admin,
  (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "name";
    let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;
    let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;

    let from = req.query.from ? req.query.from : null;
    let to = req.query.from ? req.query.to : null;
    let department = req.query.department ? req.query.department : null;
    let findArgs = {};

    // console.log(sortBy);

    for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
        findArgs[key] = req.body.filters[key];
      }
    }

    if (from != null && to != null) {
      findArgs["createdAt"] = {
        $gte: moment(from)
          .add(1, "days")
          .toDate(),
        $lte: moment(to)
          .add(1, "days")
          .toDate()
      };
    }

    if (department != null) {
      findArgs["affiliation.department"] = mongoose.Types.ObjectId(department);
    }

    findArgs.emailIsVerified = true;
    findArgs.accountIsVerified = true;
    findArgs.active = true;

    User.find(findArgs)
      .populate("gender")
      .populate("degree")
      .sort([[sortBy, order]])
      .populate("gender")
      .select(
        "_id name lastname dateOfBirth prefix research degree affiliation"
      )
      .populate({
        path: "affiliation.department"
      })
      .exec((err, result) => {
        return res.status(200).json({
          allResearchersListsReports: result,
          size: result.length
        });
      });
  }
);

app.post("/api/researchers/reports/outstanding", auth, admin, (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;

  let from = req.query.from ? req.query.from : null;
  let to = req.query.from ? req.query.to : null;
  let department = req.query.department ? req.query.department : null;
  let findArgs = {};

  // console.log(sortBy);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  if (from != null && to != null) {
    findArgs["outstanding.date"] = {
      $gte: from,
      $lte: to
    };
  }

  if (department != null) {
    findArgs["affiliation.department"] = department;
  }

  findArgs["outstanding.isOutstanding"] = true;

  findArgs.emailIsVerified = true;
  findArgs.accountIsVerified = true;
  findArgs.active = true;

  User.find(findArgs)
    .populate("gender")
    .populate("degree")
    .sort([[sortBy, order]])
    .populate("gender")
    .select(
      "_id name lastname dateOfBirth prefix research degree affiliation outstanding"
    )
    .populate({
      path: "affiliation.department"
    })
    .exec((err, result) => {
      return res.status(200).json({
        outstandingReports: result,
        size: result.length
      });
    });
});

app.post("/api/researchers/reports/new_researcher", auth, admin, (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;

  let from = req.query.from ? req.query.from : null;
  let to = req.query.from ? req.query.to : null;
  let department = req.query.department ? req.query.department : null;
  let findArgs = {};

  // console.log(sortBy);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  if (from != null && to != null) {
    findArgs["newResearcher.date"] = {
      $gte: from,
      $lte: to
    };
  }

  if (department != null) {
    findArgs["affiliation.department"] = department;
  }

  findArgs["newResearcher.isNewResearcher"] = true;

  findArgs.emailIsVerified = true;
  findArgs.accountIsVerified = true;
  findArgs.active = true;

  User.find(findArgs)
    .populate("gender")
    .populate("degree")
    .sort([[sortBy, order]])
    .populate("gender")
    .select(
      "_id name lastname dateOfBirth prefix research degree affiliation newResearcher"
    )
    .populate({
      path: "affiliation.department"
    })
    .exec((err, result) => {
      return res.status(200).json({
        newResearcherReports: result,
        size: result.length
      });
    });
});

app.get("/api/research/all_researches", auth, admin, (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  // findArgs.emailIsVerified = true;
  // findArgs.accountIsVerified = true;
  // findArgs.active = true;

  Research.find(findArgs)
    .select("_id title date likes comments shares citations reads downloads")
    .populate({
      path: "uploader",
      model: "User",
      select: ["name", "lastname", "prefix"]
    })
    .populate({
      path: "author",
      model: "User",
      select: ["name", "lastname", "prefix"]
    })
    .populate("researchType")
    .populate("publicationType")

    .exec((err, result) => {
      return res.status(200).json({
        allResearches: result,
        size: result.length
      });
    });
});

app.get("/api/researchers/not_new_researchers", auth, admin, (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  findArgs.emailIsVerified = true;
  findArgs.accountIsVerified = true;
  findArgs.active = true;

  findArgs["newResearcher.isNewResearcher"] = true;

  User.find({
    emailIsVerified: true,
    accountIsVerified: true,
    active: true,
    "newResearcher.isNewResearcher": true
  })
    .select("_id")
    .exec((err, result) => {
      let _ids = result.map((value, index, array) => {
        return value["_id"];
      });

      User.find({
        _id: { $nin: _ids },
        emailIsVerified: true,
        accountIsVerified: true,
        active: true
      })

        .populate("gender")
        .populate("degree")
        .populate("gender")
        .select(
          "_id name lastname dateOfBirth prefix research degree affiliation newResearcher"
        )
        .populate({
          path: "affiliation.department"
        })
        .exec((err, result) => {
          return res.status(200).json({
            notNewResearcher: result,
            size: result.length
          });
        });
    });
});

app.get(
  "/api/researchers/not_outstanding_researchers",
  auth,
  admin,
  (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "name";
    let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;
    let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;
    let findArgs = {};

    for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
        findArgs[key] = req.body.filters[key];
      }
    }

    findArgs.emailIsVerified = true;
    findArgs.accountIsVerified = true;
    findArgs.active = true;

    findArgs["outstanding.isOutstanding"] = true;

    User.find({
      emailIsVerified: true,
      accountIsVerified: true,
      active: true,
      "outstanding.isOutstanding": true
    })
      .select("_id")
      .exec((err, result) => {
        let _ids = result.map((value, index, array) => {
          return value["_id"];
        });

        User.find({
          _id: { $nin: _ids },
          emailIsVerified: true,
          accountIsVerified: true,
          active: true
        })

          .populate("gender")
          .populate("degree")
          .populate("gender")
          .select(
            "_id name lastname dateOfBirth prefix research degree affiliation outstanding"
          )
          .populate({
            path: "affiliation.department"
          })
          .exec((err, result) => {
            return res.status(200).json({
              notOutstandingResearcher: result,
              size: result.length
            });
          });
      });
  }
);

app.post("/api/users/register_requests", auth, admin, (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  findArgs.accountIsVerified = false;
  findArgs.canceledRegisteration = false;

  User.find(findArgs)
    .populate("gender")
    .populate("degree")
    .populate("gender")
    .select(
      "_id name lastname dateOfBirth prefix research degree affiliation email createdAt emailIsVerified"
    )
    .populate({
      path: "affiliation.department"
    })
    .exec((err, result) => {
      return res.status(200).json({
        requests: result,
        size: result.length
      });
    });
});

app.get("/api/researchers/outstanding_researchers", auth, admin, (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  findArgs.emailIsVerified = true;
  findArgs.accountIsVerified = true;
  findArgs.active = true;

  findArgs["outstanding.isOutstanding"] = true;

  User.find(findArgs)
    .populate("gender")
    .populate("degree")
    .populate("gender")
    .select(
      "_id name lastname dateOfBirth prefix research degree affiliation outstanding"
    )
    .populate({
      path: "affiliation.department"
    })
    .exec((err, result) => {
      return res.status(200).json({
        outstandingResearcher: result,
        size: result.length
      });
    });
});

app.get("/api/researchers/new_researchers", auth, admin, (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  findArgs.emailIsVerified = true;
  findArgs.accountIsVerified = true;
  findArgs.active = true;

  findArgs["newResearcher.isNewResearcher"] = true;

  User.find(findArgs)
    .populate("gender")
    .populate("degree")
    .populate("gender")
    .select(
      "_id name lastname dateOfBirth prefix research degree affiliation newResearcher"
    )
    .populate({
      path: "affiliation.department"
    })
    .exec((err, result) => {
      return res.status(200).json({
        newResearcher: result,
        size: result.length
      });
    });
});

app.get("/api/users/register_requests_count", auth, admin, (req, res) => {
  let findArgs = {};

  // for (let key in req.body.filters) {
  //   if (req.body.filters[key].length > 0) {
  //     findArgs[key] = req.body.filters[key];
  //   }
  // }

  findArgs.accountIsVerified = false;
  findArgs.canceledRegisteration = false;

  User.find(findArgs).exec((err, result) => {
    return res.status(200).json({
      size: result.length
    });
  });
});

app.post("/api/users/accept_registers", auth, admin, (req, res) => {
  let items = req.query.id;

  let ids = req.query.id.split(",");
  items = [];
  items = ids.map(item => {
    return mongoose.Types.ObjectId(item);
  });

  User.updateMany(
    {
      _id: { $in: items }
    },
    { $set: { accountIsVerified: true, active: true, emailIsVerified: true } },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true, doc });
    }
  );
});

app.post(
  "/api/researchers/add_outstanding_researchers",
  auth,
  admin,
  (req, res) => {
    let items = req.query.id;

    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });

    User.updateMany(
      {
        _id: { $in: items }
      },
      {
        $set: {
          "outstanding.isOutstanding": true,
          "outstanding.date": req.query.date,
          "outstanding.description": req.query.description
        }
      },
      {
        new: true
      },
      (err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, doc });
      }
    );
  }
);

app.post("/api/researchers/add_new_researchers", auth, admin, (req, res) => {
  let items = req.query.id;

  let ids = req.query.id.split(",");
  items = [];
  items = ids.map(item => {
    return mongoose.Types.ObjectId(item);
  });

  User.updateMany(
    {
      _id: { $in: items }
    },
    {
      $set: {
        "newResearcher.isNewResearcher": true,
        "newResearcher.date": req.query.date,
        "newResearcher.description": req.query.description
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true, doc });
    }
  );
});

app.post(
  "/api/researchers/remove_outstanding_researchers",
  auth,
  admin,
  (req, res) => {
    let items = req.query.id;

    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });

    User.updateMany(
      {
        _id: { $in: items }
      },
      {
        $set: {
          "outstanding.isOutstanding": false,
          "outstanding.date": null,
          "outstanding.description": null
        }
      },
      {
        new: true
      },
      (err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, doc });
      }
    );
  }
);

app.post("/api/researchers/remove_new_researchers", auth, admin, (req, res) => {
  let items = req.query.id;

  let ids = req.query.id.split(",");
  items = [];
  items = ids.map(item => {
    return mongoose.Types.ObjectId(item);
  });

  User.updateMany(
    {
      _id: { $in: items }
    },
    {
      $set: {
        "newResearcher.isNewResearcher": false,
        "newResearcher.date": null,
        "newResearcher.description": null
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true, doc });
    }
  );
});

app.post("/api/users/cancel_registeration", auth, admin, (req, res) => {
  let items = req.query.id;

  let ids = req.query.id.split(",");
  items = [];
  items = ids.map(item => {
    return mongoose.Types.ObjectId(item);
  });

  User.updateMany(
    {
      _id: { $in: items }
    },
    {
      $set: {
        canceledRegisteration: false,
        active: false,
        emailIsVerified: true,
        accountIsVerified: false
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true, doc });
    }
  );
});

app.post("/api/users/remove_users", auth, admin, (req, res) => {
  let items = req.query.id;

  let ids = req.query.id.split(",");
  items = [];
  items = ids.map(item => {
    return mongoose.Types.ObjectId(item);
  });

  User.deleteMany(
    {
      _id: { $in: items }
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true, doc });
    }
  );
});

app.post("/api/researchers/remove_researchers", auth, admin, (req, res) => {
  let items = req.query.id;

  let ids = req.query.id.split(",");
  items = [];
  items = ids.map(item => {
    return mongoose.Types.ObjectId(item);
  });

  User.updateMany(
    {
      _id: { $in: items }
    },
    { active: false },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true, doc });
    }
  );
});

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

  User.find({
    _id: { $in: items },
    emailIsVerified: true,
    accountIsVerified: true,
    active: true
  })
    .populate("gender")
    .populate("degree")
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
    .populate({
      path: "education",
      options: { sort: { city: 1 } }
    })
    .exec((err, docs) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).send(docs);
    });
});

app.get("/api/researchers/followings", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 3;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;

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
    User.find({
      _id: { $in: items },
      emailIsVerified: true,
      accountIsVerified: true
    })
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
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;

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
    User.find({
      _id: { $in: items },
      emailIsVerified: true,
      accountIsVerified: true,
      active: true
    })
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

app.get("/api/researchers/get_feed", auth, (req, res) => {
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 3;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;

  let type = req.query.type;
  let items = req.query.id;

  let followings = [];

  // console.log(req.user)

  User.findOne({ _id: req.user._id }, (err, doc) => {
    doc.following.forEach(item => {
      followings.push(item._id);
    });

    followings.push(req.user._id);

    Research.find({ uploader: followings })
      .sort([[sortBy, order]])
      .populate({
        path: "author",
        model: "User",
        select: ["name", "lastname", "profileImage", "prefix"]
      })
      .populate({
        path: "supervisor",
        model: "User",
        select: ["name", "lastname", "profileImage", "prefix"]
      })
      .populate({
        path: "uploader",
        select: ["name", "lastname", "profileImage", "prefix"]
      })
      .populate({
        path: "researchType"
      })
      .populate({
        path: "publicationType"
      })
      .populate({
        path: "files.uploader",
        select: ["name", "lastname", "profileImage", "prefix"]
      })
      .populate({
        path: "education",
        options: { sort: { start: 1 } }
      })
      .exec((err, docs) => {
        // console.log(req.User-Agent)
        return res.status(200).send(docs);
      });
  });
});

app.get("/api/researchers/get_suggested_user", auth, (req, res) => {
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 4;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;

  let type = req.query.type;
  let items = req.query.id;

  let followings = [];

  // console.log(req.user)

  User.findOne({ _id: req.user._id }, (err, doc) => {
    doc.following.forEach(item => {
      followings.push(item._id);
    });

    followings.push(req.user._id);

    User.find({
      _id: { $nin: followings },
      "affiliation.department": doc.affiliation.department,
      emailIsVerified: true,
      accountIsVerified: true,
      active: true
    })
      .limit(limit)
      .populate("gender")
      .populate("degree")
      .populate("gender")
      .select("_id name lastname prefix affiliation profileImage")
      .populate({
        path: "affiliation.department"
      })
      .populate({
        path: "affiliation.faculty"
      })
      .populate({
        path: "affiliation.institution"
      })
      .exec((err, result) => {
        return res.status(200).json(result);
      });
  });
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

app.post("/api/researchers/update_name", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.body._id) },
    {
      $set: req.body
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        prefix: doc.prefix,
        name: doc.name,
        lastname: doc.lastname
      });
    }
  );
});

app.post("/api/researchers/update_degree", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.body._id) },
    {
      $set: req.body
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

app.post("/api/researchers/update_affiliation", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.body._id) },
    {
      $set: req.body
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      console.log(doc.affiliation);

      Department.populate(doc, { path: "affiliation.department" }, function(
        err,
        populatedDepartment
      ) {
        Faculty.populate(
          populatedDepartment,
          { path: "affiliation.faculty" },
          function(err, populatedFaculty) {
            Institution.populate(
              doc,
              { path: "affiliation.institution" },
              function(err, populatedInstitution) {
                return res.status(200).json({
                  success: true,
                  affiliation: populatedInstitution.affiliation
                });
              }
            );
          }
        );
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
        lastname: req.query.prefix
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
        lastname: doc.lastname
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
  if (req.query.name.trim() !== "" && req.query.url.trim() !== "") {
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
  } else {
    User.findOneAndUpdate(
      { _id: req.query.userId },
      {
        $set: {
          facebook: {}
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
  }
});

app.post("/api/researchers/update_address", auth, (req, res) => {
  if (
    (req.query.village.trim() !== "") &
    (req.query.province.trim() !== "") &
    (req.query.district.trim() !== "")
  ) {
    User.findOneAndUpdate(
      { _id: req.query.userId },
      {
        $set: {
          address: {
            village: req.query.village,
            district: mongoose.Types.ObjectId(req.query.district),
            province: mongoose.Types.ObjectId(req.query.province)
          }
        }
      },
      {
        new: true
      }
    )
      .populate({ path: "address.district", model: "District" })
      .populate({ path: "address.province", model: "Province" })
      .exec((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
          success: true,
          address: doc.address
        });
      });
  } else {
    User.findOneAndUpdate(
      { _id: req.query.userId },
      {
        $set: {
          address: {}
        }
      },
      {
        new: true
      }
    ).exec((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        address: doc.address
      });
    });
  }
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
          position: req.query.position
        }
      }
    },
    {
      new: true
    }
  )
    .populate({ path: "affiliation.institution", model: "Institution" })
    .populate({ path: "affiliation.faculty", model: "Faculty" })
    .populate({ path: "affiliation.department", model: "Department" })
    .exec((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        affiliation: {
          institution: doc.institution,
          faculty: doc.faculty,
          department: doc.department,
          position: doc.position
        }
      });
    });
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
          country: mongoose.Types.ObjectId(req.query.country)
        }
      }
    },
    {
      new: true
    }
  )
    .populate({ path: "placeOfBirth.country", model: "Country" })
    .exec((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        placeOfBirth: doc.placeOfBirth
      });
    });
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
    .populate({ path: "gender", model: "Gender" })
    .exec((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        gender: doc.gender
      });
    });
});

app.post("/api/researchers/update_introduction", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $set: {
        profileDescription: req.query.profileDescription
      }
    },
    {
      new: true
    }
  ).exec((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      profileDescription: doc.profileDescription
    });
  });
});

app.post("/api/researchers/addEducation", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.query.userId) },
    {
      $push: {
        education: {
          institution: req.query.institution,
          fieldOfStudy: req.query.fieldOfStudy,
          degree: req.query.degree,
          start: req.query.start,
          end: req.query.end,
          city: req.query.city,
          country: mongoose.Types.ObjectId(req.query.country)
        }
      }
    },
    {
      new: true
    }
  )
    .populate({ path: "education.country", model: "Country" })
    .exec((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        education: doc.education
      });
    });
});

app.post("/api/researchers/addEducation", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.query.userId) },
    {
      $push: {
        education: {
          institution: req.query.institution,
          fieldOfStudy: req.query.fieldOfStudy,
          degree: req.query.degree,
          start: req.query.start,
          end: req.query.end,
          city: req.query.city,
          country: mongoose.Types.ObjectId(req.query.country),
          $sort: { start: 1 }
        }
      }
    },
    {
      new: true
    }
  )
    .populate({ path: "education.country", model: "Country" })
    .exec((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        education: doc.education
      });
    });
});

app.post("/api/researchers/updateEducation", auth, (req, res) => {
  User.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(req.query.userId),
      "education._id": mongoose.Types.ObjectId(req.query.id)
    },
    {
      $set: {
        "education.$._id": mongoose.Types.ObjectId(req.query.id),
        "education.$.institution": req.query.institution,
        "education.$.fieldOfStudy": req.query.fieldOfStudy,
        "education.$.degree": req.query.degree,
        "education.$.start": req.query.start,
        "education.$.end": req.query.end,
        "education.$.city": req.query.city,
        "education.$.country": mongoose.Types.ObjectId(req.query.country)
      }
    },
    {
      new: true
    }
  )
    .populate({ path: "education.country", model: "Country" })
    .exec((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        education: doc.education
      });
    });
});

app.post("/api/researchers/removeEducation", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.query.userId) },
    {
      $pull: {
        education: {
          _id: mongoose.Types.ObjectId(req.query.id)
        }
      }
    },
    {
      new: true
    }
  )
    .populate({ path: "education.country", model: "Country" })
    .exec((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        education: doc.education
      });
    });
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

app.post("/api/research/search", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;
  let ids = [];
  let findArgs = {};
  let rFindArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  let reg = new RegExp(req.query.search, "g");
  // User.aggregate([
  //   {$project: {fullname: {$concat: ['$name', ' ', '$lastname']}, doc: '$$ROOT'}},
  // {$match: {fullname: reg}}
  // ], function(err, persons){
  //   findArgs["_id"] = persons;
  //   persons.map((value, index)=>{
  //     // console.log(persons[index]._id)
  //     ids.push(persons[index]._id)
  //   })
  // })

  // findArgs["affiliation.department"] = "5cd3a6481c9d44000074849b"

  if (findArgs || req.query.search) {
    const regex = new RegExp(
      escapeRegex(req.query.search ? req.query.search : ""),
      "gi"
    );

    User.find({
      emailIsVerified: true,
      accountIsVerified: true,
      active: true,
      $or: [
        { name: { $regex: reg, $options: "m" } },
        { lastname: { $regex: reg, $options: "m" } }
      ]
    })
      .select("_id")

      .exec((err, docs) => {
        if (docs) {
          docs.map((value, index) => {
            // Array.prototype.push.apply(ids, value["_id"])
            ids.push(value["_id"]);
          });
        }

        findArgs._id = ids;

        User.find(findArgs)
          .select("_id")
          .exec((err, result) => {
            // (rFindArgs.author = findArgs), console.log(ids);

            Research.find({
              $or: [
                { title: { $regex: reg, $options: "i" } },
                { abstract: { $regex: reg, $options: "i" } },
                { description: { $regex: reg, $options: "i" } },
                { "author._id": { $in: ids } }
              ]
            })
              .populate({
                path: "author",
                model: "User",
                select: ["name", "lastname", "profileImage"]
              })
              .populate({
                path: "supervisor",
                model: "User",
                select: ["name", "lastname", "profileImage", "prefix"]
              })
              .populate({
                path: "uploader",
                select: ["name", "lastname", "profileImage"]
              })
              .populate({
                path: "researchType"
              })
              .populate({
                path: "publicationType"
              })
              .populate({
                path: "files.uploader",
                select: ["name", "lastname", "profileImage"]
              })
              .populate({
                path: "education",
                options: { sort: { start: 1 } }
              })
              .exec((err, research) => {
                return res.status(200).send(research);
              });
          });
      });
  }
});

app.get("/api/research/research_count", (req, res) => {
  Research.find({}).exec((err, docs) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({
      researchCount: docs.length
    });
  });
});

app.post("/api/research/researches", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "createdAt";
  let limit = req.body.limit ? parseInt(req.body.limit) : 6;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  res.status(200);
});

app.get("/api/research/researches_by_id", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 100;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;

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
        model: "User",
        select: ["name", "lastname", "profileImage"]
      })
      .populate({
        path: "supervisor",
        model: "User",
        select: ["name", "lastname", "profileImage", "prefix"]
      })
      .populate({
        path: "uploader",
        select: ["name", "lastname", "profileImage"]
      })
      .populate({
        path: "researchType"
      })
      .populate({
        path: "publicationType"
      })
      .populate({
        path: "files.uploader",
        select: ["name", "lastname", "profileImage"]
      })
      .populate({
        path: "education",
        options: { sort: { start: 1 } }
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
});

app.post("/api/research/add_comment", auth, (req, res) => {
  Research.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.query.id) },
    {
      $push: {
        comments: {
          user: mongoose.Types.ObjectId(req.query.userId),
          time: moment().toDate(),
          comment: req.query.comment
        }
      }
    }
  ).exec((err, doc) => {
    if (err) return res.json({ success: false, err });
    Research.find({ _id: mongoose.Types.ObjectId(req.query.id) })
      // .sort([[sortBy, order]])
      // .limit(limit)
      // .skip(skip)
      .select("comments")
      .populate({
        path: "comments.user",
        model: "User",
        select: ["name", "lastname", "profileImage"]
      })
      .populate({
        path: "comments.replies.user",
        model: "User",
        select: ["name", "lastname", "profileImage"]
      })
      // .populate({
      //   path: "affiliation.department"
      // })
      // .populate({
      //   path: "affiliation.faculty"
      // })
      .exec((err, comments) => {
        if (err) return res.status(400).send(err);
        res.status(200).json(comments[0].comments);
      });
  });
});

app.post("/api/research/add_reply", auth, (req, res) => {
  Research.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(req.query.id),
      "comments._id": req.query.commentId
    },
    {
      $push: {
        "comments.$.replies": {
          user: mongoose.Types.ObjectId(req.query.userId),
          time: moment().toDate(),
          reply: req.query.reply
        }
      }
    }
  ).exec((err, doc) => {
    if (err) return res.json({ success: false, err });
    Research.find({ _id: mongoose.Types.ObjectId(req.query.id) })
      // .sort([[sortBy, order]])
      // .limit(limit)
      // .skip(skip)
      .select("comments")
      .populate({
        path: "comments.user",
        model: "User",
        select: ["name", "lastname", "profileImage"]
      })
      .populate({
        path: "comments.replies.user",
        model: "User",
        select: ["name", "lastname", "profileImage"]
      })
      // .populate({
      //   path: "affiliation.department"
      // })
      // .populate({
      //   path: "affiliation.faculty"
      // })
      .exec((err, comments) => {
        if (err) return res.status(400).send(err);
        res.status(200).json(comments[0].comments);
      });
  });
});

app.post("/api/research/remove_reply", auth, (req, res) => {
  Research.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(req.query.id),
      "comments._id": req.query.commentId
    },
    {
      $pull: {
        "comments.$.replies": {
          _id: mongoose.Types.ObjectId(req.query.replyId)
        }
      }
    }
  ).exec((err, doc) => {
    if (err) return res.json({ success: false, err });
    Research.find({ _id: mongoose.Types.ObjectId(req.query.id) })
      // .sort([[sortBy, order]])
      // .limit(limit)
      // .skip(skip)
      .select("comments")
      .populate({
        path: "comments.user",
        model: "User",
        select: ["name", "lastname", "profileImage"]
      })
      .populate({
        path: "comments.replies.user",
        model: "User",
        select: ["name", "lastname", "profileImage"]
      })
      // .populate({
      //   path: "affiliation.department"
      // })
      // .populate({
      //   path: "affiliation.faculty"
      // })
      .exec((err, comments) => {
        if (err) return res.status(400).send(err);
        res.status(200).json(comments[0].comments);
      });
  });
});

const path = require("path");

// DOWNLOAD FILES
app.get("/api/research/download/:id&:userId&:researchId", (req, res) => {
  const file = path.resolve(".") + `/uploads/${req.params.id}`;
  res.download(file);

  Research.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.researchId) },
    {
      $push: {
        downloads: {
          user: mongoose.Types.ObjectId(req.params.userId),
          time: moment().toDate()
        }
      }
    }
  ).exec((err, doc) => {});
});

app.get(
  "/api/research/download/citation/:citation&:userId&:researchId&:researchTitle",
  (req, res) => {
    var text_ready = req.params.citation;

    res.writeHead(200, {
      "Content-Type": "application/force-download",
      "Content-disposition":
        "attachment; filename=" +
        "citation_for_" +
        req.params.researchTitle.trim() +
        ".txt"
    });

    res.end(text_ready);

    Research.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.researchId) },
      {
        $push: {
          citations: {
            user: mongoose.Types.ObjectId(req.params.userId),
            time: moment().toDate()
          }
        }
      }
    ).exec((err, doc) => {});
  }
);

// Count reads

app.post("/api/research/count_reads", (req, res) => {
  Research.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.query.researchId) },
    {
      $push: {
        reads: {
          user: mongoose.Types.ObjectId(req.query.userId),
          time: moment().toDate()
        }
      }
    }
  ).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json(doc.reads);
  });
});

app.post("/api/research/count_shares", (req, res) => {
  Research.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.query.researchId) },
    {
      $push: {
        shares: {
          user: mongoose.Types.ObjectId(req.query.userId),
          time: moment().toDate()
        }
      }
    }
  ).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json(doc.reads);
  });
});

// User.findOneAndUpdate(
//   {
//     _id: mongoose.Types.ObjectId(req.query.userId),
//     "education._id": mongoose.Types.ObjectId(req.query.id)
//   },
//   {
//     $set: {
//       "education.$._id": mongoose.Types.ObjectId(req.query.id),
//       "education.$.institution": req.query.institution,
//       "education.$.fieldOfStudy": req.query.fieldOfStudy,
//       "education.$.degree": req.query.degree,
//       "education.$.start": req.query.start,
//       "education.$.end": req.query.end,
//       "education.$.city": req.query.city,
//       "education.$.country": mongoose.Types.ObjectId(req.query.country)
//     }
//   },

app.post("/api/research/remove_comment", auth, (req, res) => {
  Research.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.query.id) },
    {
      $pull: {
        comments: {
          _id: mongoose.Types.ObjectId(req.query.commentId)
        }
      }
    }
  ).exec((err, doc) => {
    if (err) return res.json({ success: false, err });
    Research.find({ _id: mongoose.Types.ObjectId(req.query.id) })
      // .sort([[sortBy, order]])
      // .limit(limit)
      // .skip(skip)
      .select("comments")
      .populate({
        path: "comments.user",
        model: "User",
        select: ["name", "lastname", "profileImage"]
      })
      .populate({
        path: "comments.replies.user",
        model: "User",
        select: ["name", "lastname", "profileImage"]
      })
      // .populate({
      //   path: "affiliation.department"
      // })
      // .populate({
      //   path: "affiliation.faculty"
      // })
      .exec((err, comments) => {
        if (err) return res.status(400).send(err);
        res.status(200).json(comments[0].comments);
      });
  });
});

app.get("/api/research/researches_by_id/comments", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 3;
  let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;

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
      .select("comments")
      .populate({
        path: "comments.user",
        model: "User",
        select: ["name", "lastname", "profileImage"]
      })
      .populate({
        path: "comments.replies.user",
        model: "User",
        select: ["name", "lastname", "profileImage"]
      })
      // .populate({
      //   path: "affiliation.department"
      // })
      // .populate({
      //   path: "affiliation.faculty"
      // })
      .exec((err, comments) => {
        if (err) return res.status(400).send(err);
        res.status(200).json(comments[0].comments);
      });
  }
});

app.post("/api/research/add_research", auth, (req, res) => {
  const research = new Research(req.body);

  research.save((err, doc) => {
    console.log(err);
    console.log(doc);
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      doc
    });

    let ids = doc.author;

    // REMINDER: add researches id to other authors

    User.updateMany(
      { _id: ids },
      {
        $push: {
          research: mongoose.Types.ObjectId(doc._id)
        }
      },
      {
        new: true
      },
      (err, user) => {}
    );
  });
});

app.post("/api/research/update_research", auth, (req, res) => {
  Research.find({
    _id: req.body._id
  }).exec((err, doc) => {
    if (err) return res.json({ success: false, err });
    let ids = doc.author;

    Research.findOneAndUpdate(
      {
        _id: req.body._id
      },
      {
        $set: req.body
      },
      {
        new: true
      }
    ).exec((err, research) => {
      if (err) return res.json({ success: false, err });
      User.updateMany(
        { _id: ids },
        {
          $pull: {
            research: mongoose.Types.ObjectId(doc._id)
          }
        },
        (err, user) => {
          if (doc.files && doc.files.length > 0) {
            const path = "." + `/uploads/${doc.files[0].name}`;

            fs.unlink(path, err => {});
          }
          if (err) return res.json({ success: false, err });

          let newIds = [];
          req.body.author.map(value => {
            newIds.push(value._id);
          });

          console.log(newIds);

          User.updateMany(
            { _id: newIds },
            {
              $push: {
                research: req.body._id
              }
            },
            (err, user) => {
              if (err) return res.json({ success: false, err });
              return res.json({
                success: true,
                research
              });
            }
          );
        }
      );
    });
  });

  // Research.findOneAndUpdate(
  //       {
  //         _id: req.body._id
  //       },
  //       {
  //         $set: req.body
  //       },
  //       {
  //         new: true
  //       }
  //     ).exec((err, research) => {
  //       console.log(req.body)
  //       console.log(research)
  //       if (err) return res.json({ success: false, err });
  //                   return res.json({
  //                     success: true,
  //                     research
  //                   });
  //     })
});

app.post("/api/research/remove_research", auth, (req, res) => {
  Research.findOne({ _id: req.query.researchId }).exec((err, doc) => {
    let ids = doc.author;

    Research.findOneAndRemove({ _id: req.query.researchId }).exec(
      (err, removed) => {
        User.updateMany(
          { _id: ids },
          {
            $pull: {
              research: mongoose.Types.ObjectId(doc._id)
            }
          },
          {
            new: true
          },
          (err, user) => {
            if (doc.files && doc.files.length > 0) {
              const path = "." + `/uploads/${doc.files[0].name}`;

              fs.unlink(path, err => {});
            }
            if (err) return res.json({ success: false, err });
            res.status(200).json({
              success: true,
              removed
            });
          }
        );
      }
    );
  });
});

app.post("/api/research/remove_author", auth, (req, res) => {
  Research.findOneAndUpdate(
    { _id: req.query.researchId },
    {
      $pull: {
        author: req.query.userId
      }
    },
    {
      new: true
    }
  ).exec((err, doc) => {
    User.updateMany(
      { _id: req.query.userId },
      {
        $pull: {
          research: mongoose.Types.ObjectId(req.query.researchId)
        }
      },
      {
        new: true
      },
      (err, user) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
          success: true,
          doc
        });
      }
    );
  });
});

/*  likes   */

app.post("/api/researchers/like", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false;

    doc.likes.forEach(item => {
      if (item._id == req.query.researchId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      res.status(200).json({ message: "Already Like" });
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            likes: {
              _id: mongoose.Types.ObjectId(req.query.researchId)
            }
          }
        },
        {
          new: true
        },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.likes);
        }
      );
    }
  });
});

app.post("/api/research/add_like", auth, (req, res) => {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  Research.findOne({ _id: req.query.researchId }, (err, doc) => {
    let duplicate = false;

    if (doc.likes[0]) {
      doc.likes.forEach(item => {
        if (item === req.user._id) {
          duplicate = true;
        }
      });
    }

    if (duplicate) {
      res.status(200).json({ message: "Already add like" });
    } else {
      Research.findOneAndUpdate(
        { _id: req.query.researchId },
        {
          $push: {
            likes: {
              user: mongoose.Types.ObjectId(req.user._id),
              time: dateTime
            }
          }
        },
        {
          new: true
        },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json({ success: true });
        }
      );
    }
  });
});

app.post("/api/researchers/unlike", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: {
        likes: mongoose.Types.ObjectId(req.query.researchId)
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json(doc.likes);
    }
  );
});

app.post("/api/research/remove_like", auth, (req, res) => {
  Research.findOneAndUpdate(
    { _id: req.query.researchId },
    {
      $pull: {
        likes: { user: mongoose.Types.ObjectId(req.user._id) }
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true });
    }
  );
});

app.post("/api/researchers/addResearchArea", auth, (req, res) => {
  let items = req.query.researchArea;

  let researchArea = req.query.researchArea.split(",");
  items = [];
  items = researchArea.map(item => {
    return item;
  });

  User.findOneAndUpdate(
    { _id: req.query.userId },
    {
      $set: {
        researchArea: items
      }
    },
    {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json(doc.researchArea);
    }
  );
});

app.get("/api/researchers/list_for_suggestions", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  // let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;
  // let skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;

  // let from = req.query.from ? req.query.from : null;
  // let to = req.query.from ? req.query.to : null;
  // let department = req.query.department ? req.query.department : null;
  let findArgs = {};

  findArgs.emailIsVerified = true;
  findArgs.accountIsVerified = true;
  findArgs.active = true;

  User.find(findArgs)
    .select("_id name lastname affiliation profileImage email")
    .populate({
      path: "affiliation.institution"
    })
    .populate({
      path: "affiliation.department"
    })
    .populate({
      path: "affiliation.faculty"
    })
    .sort([["name", "asc"]])
    .exec((err, result) => {
      return res.status(200).send(result);
    });
});

const renmoveOldTempFiles = () => {
  var result = findRemoveSync("./tmp", { dir: "*", age: { seconds: 86400 } });
  console.log(result);
};

setInterval(renmoveOldTempFiles, 86400000);

const port = process.env.PORT || 3002;

const findRemoveSync = require("find-remove");
app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
