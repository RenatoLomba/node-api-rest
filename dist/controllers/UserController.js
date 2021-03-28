"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _UserDTO = require('../dtos/UserDTO'); var _UserDTO2 = _interopRequireDefault(_UserDTO);

class UserController {
  async store(req, res) {
    try {
      const newUser = await _User2.default.create(req.body);
      const userDTO = new (0, _UserDTO2.default)(newUser);
      res.status(200).json(userDTO);
    } catch (ex) {
      res.status(400).json({ errors: ex.errors.map((error) => error.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await _User2.default.findAll();
      const userDTOs = users.map((user) => new (0, _UserDTO2.default)(user));
      res.status(200).json(userDTOs);
    } catch (ex) {
      res.status(400).json({ errors: ex.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await _User2.default.findByPk(id);

      if (!user) return res.status(404).json({ errors: 'User not found' });

      const userDTO = new (0, _UserDTO2.default)(user);

      return res.status(200).json(userDTO);
    } catch (ex) {
      return res.status(400).json({ errors: ex.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.userId;
      if (!id) return res.status(400).json({ errors: 'Missing User Id' });

      const user = await _User2.default.findByPk(id);
      if (!user) return res.status(404).json({ errors: 'User not found' });

      const newUser = await user.update(req.body);

      const newUserDTO = new (0, _UserDTO2.default)(newUser);

      return res.status(200).json(newUserDTO);
    } catch (ex) {
      return res.status(400).json({ errors: ex.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: 'Missing User Id' });

      const user = await _User2.default.findByPk(id);
      if (!user) return res.status(404).json({ errors: 'User not found' });

      await user.destroy();

      return res.status(200).json(true);
    } catch (ex) {
      return res.status(400).json({ errors: ex.message });
    }
  }
}
exports. default = new UserController();
