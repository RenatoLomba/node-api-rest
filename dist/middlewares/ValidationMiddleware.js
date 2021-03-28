"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class ValidationMiddleware {
  async checkToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ errors: 'Login Required' });
    }

    const [, token] = authorization.split(' ');

    try {
      const payload = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
      const { id, email } = payload;

      console.log(payload);

      const user = await _User2.default.findOne({ where: { id, email } });
      if (!user) {
        return res.status(401).json({ errors: 'Usuário Inválido' });
      }

      req.userId = user.id;
      req.userEmail = user.email;

      return next();
    } catch (ex) {
      return res.status(401).json({ errors: ex.message });
    }
  }
}
const validation = new ValidationMiddleware();
( { checkToken: exports.checkToken } = validation);
