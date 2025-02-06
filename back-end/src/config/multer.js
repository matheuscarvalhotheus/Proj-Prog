import path from 'node:path';
import { randomBytes } from 'node:crypto';
import multer from 'multer';
 
const filepath = path.resolve('public', 'imgs');
var counter=0
for(let i=filepath.length-1; i>=0;i--){
  if(filepath[i]=='\\'){
    counter+=1
  }

  if(counter==4){
    var uploadpath = filepath.slice(i)
    break
  }
}

 
const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `../../${uploadpath}`);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+`-${randomBytes(16).toString('hex')}-${(file.mimetype).replace("/",".")}`);
    },
  }),
};
 
const multerconfig = {
  dest: uploadpath,
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 5 * 4096 * 4096,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
 
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
};
 
 
export default multerconfig;
 