const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './client/public/profilePictures',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}); //input name in register component

//check file type
function checkFileType(file, cb) {
  //allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;

  //check the ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  //check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only');
  }
}

module.exports = {
  upload,
};
