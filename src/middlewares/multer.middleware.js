import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });











// const storage = multer.storage({
//   destination:  (req, file, cb) => {
//     cb(null, '/public/temp')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalName)
//   }
// })
