import multer from "multer";

// se maneja donde va a guardarse los archivos y el formato de el archivo (nombre-fecha)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../backend/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

export default upload;
