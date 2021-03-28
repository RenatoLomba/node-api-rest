"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _UserDTO = require('../dtos/UserDTO'); var _UserDTO2 = _interopRequireDefault(_UserDTO);

class TokenController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ errors: 'Email e Password devem ser informados' });
      }

      const user = await _User2.default.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ errors: 'Usuário não cadastrado' });
      }

      const authenticated = await user.passwordIsValid(password);
      if (!authenticated) {
        return res.status(400).json({ errors: 'Senha inválida' });
      }

      const token = _jsonwebtoken2.default.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRES,
      });

      return res.status(200).json({ token });
    } catch (ex) {
      return res.status(500).json({ errors: ex.message });
    }
  }

  async show(req, res) {
    try {
      const id = req.userId;
      const user = await _User2.default.findByPk(id);
      if (!user) {
        return res.status(404).json({ errors: 'User not found' });
      }

      const userDTO = new (0, _UserDTO2.default)(user);

      return res.status(200).json(userDTO);
    } catch (ex) {
      return res.status(500).json({ errors: ex.message });
    }
  }
}
exports. default = new TokenController();
