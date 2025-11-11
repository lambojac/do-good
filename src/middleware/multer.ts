import multer, { StorageEngine, FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';
const storage: StorageEngine = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/');
  },
  filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const checkFileType = (file: Express.Multer.File, cb: FileFilterCallback) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images Only!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    checkFileType(file, cb);
  }
});

export default upload;
