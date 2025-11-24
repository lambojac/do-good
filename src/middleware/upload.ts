import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/", 
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + "-" + file.originalname);
  }
});

const upload = multer({ storage });

export default upload;
