"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _ValidationMiddleware = require('../middlewares/ValidationMiddleware');

class UserRoutes {
  constructor() {
    this.router = new (0, _express.Router)();

    this.router.get('/', _UserController2.default.index);
    this.router.get('/:id', _UserController2.default.show);

    this.router.post('/', _UserController2.default.store);
    this.router.put('/', _ValidationMiddleware.checkToken, _UserController2.default.update);
    this.router.delete('/', _ValidationMiddleware.checkToken, _UserController2.default.delete);
  }
}

exports. default = new UserRoutes().router;
