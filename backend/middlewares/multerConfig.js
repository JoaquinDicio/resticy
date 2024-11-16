import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Definir __dirname manualmente

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;