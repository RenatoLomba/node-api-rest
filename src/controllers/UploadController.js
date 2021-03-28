import multer from 'multer';
import multerConfig from '../configs/multer';
import Photo from '../models/Photo';
import Student from '../models/Student';
import PhotoDTO from '../dtos/PhotoDTO';

const uploader = multer(multerConfig).single('anyFile');

class UploadController {
  store(req, res) {
    return uploader(req, res, async (error) => {
      if (error) {
        return res.status(400).json({ errors: error.code });
      }

      const { originalname, filename } = req.file;
      const { student_id } = req.body;

      const student = await Student.findByPk(student_id);
      if (!student) return res.status(404).json({ errors: 'Student not found' });

      const photo = await Photo.create({ originalname, filename, student_id });
      const photoDto = new PhotoDTO(photo);

      return res.status(200).json(photoDto);
    });
  }
}
export default new UploadController();
