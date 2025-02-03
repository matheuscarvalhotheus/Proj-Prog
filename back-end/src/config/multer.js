import path from 'node:path';
import { randomBytes } from 'node:crypto';
import multer from 'multer';
 
const uploadpath = path.resolve('public', 'imgs');
 
const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `../../${uploadpath}`);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+`-${randomBytes(16).toString('hex')}-${file.originalname}`);
    },
  }),
};
 
const multerconfig = {
  dest: uploadpath,
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png'];
 
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
};
 
 
export default multerconfig;
 