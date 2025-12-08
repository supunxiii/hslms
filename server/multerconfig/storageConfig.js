const multer = require("multer");

// storage config
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads"); // Directory where files will be stored
  },
  filename: (req, file, callback) => {
    const filename = `image-${Date.now()}-${file.originalname}`; // Unique filename using timestamp
    callback(null, filename);
  },
});

// file filter to allow only images
const filefilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true); // Accept only PNG, JPG, JPEG
  } else {
    callback(null, false); // Reject other files
    return callback(new Error("Only .PNG, .JPG, & .JPEG formats are allowed."));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filefilter,
});

module.exports = upload;
