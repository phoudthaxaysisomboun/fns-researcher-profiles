let admin = (req,res, next) => {
    if(req.user.role === 0){
        return res.send('ທ່ານບໍ່ມີສິດໃນການເຂົ້າເຖິງຂໍ້ມູນນີ້')
    }
    next()
}

module.exports = {admin}