const multer = require('multer');
const path=require('path')

const storage= multer.diskStorage({
    // lưu vào ổ đĩa
    destination: function(req,file, cb) {
        return cb(null, "public/images")
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
   })
   // thiết lập phần mềm trung gian
const upload=multer({
   storage: storage,
}).single("image"); 

module.exports = {upload};