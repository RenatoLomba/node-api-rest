"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _StudentController = require('../controllers/StudentController'); var _StudentController2 = _interopRequireDefault(_StudentController);
var _ValidationMiddleware = require('../middlewares/ValidationMiddleware');

class StudentRoutes {
  constructor() {
    this.router = new (0, _express.Router)();

    this.router.get('/', _ValidationMiddleware.checkToken, _StudentController2.default.index);
    this.router.post('/', _ValidationMiddleware.checkToken, _StudentController2.default.store);
    this.router.get('/:id', _ValidationMiddleware.checkToken, _StudentController2.default.show);
    this.router.delete('/:id', _ValidationMiddleware.checkToken, _StudentController2.default.delete);
    this.router.put('/', _ValidationMiddleware.checkToken, _StudentController2.default.update);
  }
}

exports. default = new StudentRoutes().router;
