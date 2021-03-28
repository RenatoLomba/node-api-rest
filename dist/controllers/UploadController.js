"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('../configs/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);
var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _PhotoDTO = require('../dtos/PhotoDTO'); var _PhotoDTO2 = _interopRequireDefault(_PhotoDTO);

const uploader = _multer2.default.call(void 0, _multer4.default).single('anyFile');

class UploadController {
  store(req, res) {
    return uploader(req, res, async (error) => {
      if (error) {
        return res.status(400).json({ errors: error.code });
      }

      const { originalname, filename } = req.file;
      const { student_id } = req.body;

      const student = await _Student2.default.findByPk(student_id);
      if (!student) return res.status(404).json({ errors: 'Student not found' });

      const photo = await _Photo2.default.create({ originalname, filename, student_id });
      const photoDto = new (0, _PhotoDTO2.default)(photo);

      return res.status(200).json(photoDto);
    });
  }
}
exports. default = new UploadController();
