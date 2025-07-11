import multer from "multer";
import path from "path";

// Allowed file types
const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// Max file size (2MB)
const MAX_SIZE = 2 * 1024 * 1024;


const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error("Invalid file type. Only JPG, JPEG, PNG, WEBP allowed.");
    error.code = "INVALID_FILE_TYPE";
    cb(error);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "public", "temp"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});


export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE },
});
