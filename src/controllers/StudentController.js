import Student from '../models/Student';
import StudentDTO from '../dtos/StudentDTO';
import Photo from '../models/Photo';

class StudentController {
  async store(req, res) {
    try {
      const studentDTO = new StudentDTO(req.body);
      studentDTO.createValidator();

      if (studentDTO.errors.length > 0) {
        return res.status(400).json(studentDTO.errors);
      }

      const newStudent = await Student.create(studentDTO);
      const newStudentDTO = new StudentDTO(newStudent);
      return res.status(200).json(newStudentDTO);
    } catch (ex) {
      return res.status(400).json({ errors: ex.errors.map((error) => error.message) });
    }
  }

  async index(req, res) {
    try {
      const students = await Student.findAll({
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
        },
      });
      const studentDTOs = students.map((student) => new StudentDTO(student));
      res.status(200).json(studentDTOs);
    } catch (ex) {
      res.status(400).json({ errors: ex.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: 'Id deve ser informado' });

      const student = await Student.findByPk(id, {
        order: [[Photo, 'id', 'DESC']],
        include: {
          model: Photo,
        },
      });
      if (!student) return res.status(404).json({ errors: 'Student not found' });

      const studentDTO = new StudentDTO(student);
      return res.status(200).json(studentDTO);
    } catch (ex) {
      return res.status(400).json({ errors: ex.message });
    }
  }

  async update(req, res) {
    try {
      const studentDTO = new StudentDTO(req.body);
      if (!studentDTO.id) return res.status(400).json({ errors: 'Missing Student Id' });

      const student = await Student.findByPk(studentDTO.id);
      if (!student) return res.status(404).json({ errors: 'Student not found' });

      const newStudent = await student.update(req.body);

      const newStudentDTO = new StudentDTO(newStudent);

      return res.status(200).json(newStudentDTO);
    } catch (ex) {
      return res.status(400).json({ errors: ex.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: 'Id deve ser informado' });

      const student = await Student.findByPk(id);
      if (!student) return res.status(404).json({ errors: 'Student not found' });

      await student.destroy();

      return res.status(200).json(true);
    } catch (ex) {
      return res.status(400).json({ errors: ex.message });
    }
  }
}
export default new StudentController();
