const multer = require("multer");
const fs = require("fs");
const path = require("path");

const fileUpload = (dest) => {
  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, dest),
    filename: (req, file, cb) => {
      // const newDate = Date.now().toString()
      const extn = path.extname(file.originalname)
      // const name = file.originalname.replace(extn, '');
      const filename = `${Date.now()}` + extn;
      return cb(null, filename.toLowerCase())
    }
  })
}

// const imageFilter = (req, file, cb) => {
//   const filetypes = /jpg|jpeg|gif|webp|tif|png|tif|tiff|bmp|esp|avif|svg/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);
//   if (extname && mimetype) {
//     return cb(null, true);
//   }
//   return cb(`Error: Upload Image file only (jpg, jpeg, gif, webp, tif, png, tif,tiff, bmp, avif, esp, svg)`); 
// }

const removeFile = (path) => {
  try {
    fs.unlinkSync('public/' + path);
    return true;
  } catch (error) { return true }
};


const csvFilter = (req, file, cb) => {
  const filetypes = /csv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  }
  return cb(`Error: Upload only csv images`); 
}

module.exports = { fileUpload, csvFilter, removeFile }