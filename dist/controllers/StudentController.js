"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _StudentDTO = require('../dtos/StudentDTO'); var _StudentDTO2 = _interopRequireDefault(_StudentDTO);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class StudentController {
  async store(req, res) {
    try {
      const studentDTO = new (0, _StudentDTO2.default)(req.body);
      studentDTO.createValidator();

      if (studentDTO.errors.length > 0) {
        return res.status(400).json(studentDTO.errors);
      }

      const newStudent = await _Student2.default.create(studentDTO);
      const newStudentDTO = new (0, _StudentDTO2.default)(newStudent);
      return res.status(200).json(newStudentDTO);
    } catch (ex) {
      return res.status(400).json({ errors: ex.errors.map((error) => error.message) });
    }
  }

  async index(req, res) {
    try {
      const students = await _Student2.default.findAll({
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
        },
      });
      const studentDTOs = students.map((student) => new (0, _StudentDTO2.default)(student));
      res.status(200).json(studentDTOs);
    } catch (ex) {
      res.status(400).json({ errors: ex.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: 'Id deve ser informado' });

      const student = await _Student2.default.findByPk(id, {
        order: [[_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
        },
      });
      if (!student) return res.status(404).json({ errors: 'Student not found' });

      const studentDTO = new (0, _StudentDTO2.default)(student);
      return res.status(200).json(studentDTO);
    } catch (ex) {
      return res.status(400).json({ errors: ex.message });
    }
  }

  async update(req, res) {
    try {
      const studentDTO = new (0, _StudentDTO2.default)(req.body);
      if (!studentDTO.id) return res.status(400).json({ errors: 'Missing Student Id' });

      const student = await _Student2.default.findByPk(studentDTO.id);
      if (!student) return res.status(404).json({ errors: 'Student not found' });

      const newStudent = await student.update(req.body);

      const newStudentDTO = new (0, _StudentDTO2.default)(newStudent);

      return res.status(200).json(newStudentDTO);
    } catch (ex) {
      return res.status(400).json({ errors: ex.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: 'Id deve ser informado' });

      const student = await _Student2.default.findByPk(id);
      if (!student) return res.status(404).json({ errors: 'Student not found' });

      await student.destroy();

      return res.status(200).json(true);
    } catch (ex) {
      return res.status(400).json({ errors: ex.message });
    }
  }
}
exports. default = new StudentController();
