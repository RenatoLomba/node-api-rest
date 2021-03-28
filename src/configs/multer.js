import multer from 'multer';
import { extname, resolve } from 'path';

const random = () => Math.floor((Math.random() * 10000) + 10000);

class MulterConfig {
  constructor() {
    this.fileFilter = (req, file, cb) => {
      if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        return cb(new multer.MulterError('Invalid File, must be png or jpeg'));
      }

      return cb(null, true);
    };
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
      },
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
      },
    });
  }
}
export default new MulterConfig();
