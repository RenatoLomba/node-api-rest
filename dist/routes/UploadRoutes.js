"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _UploadController = require('../controllers/UploadController'); var _UploadController2 = _interopRequireDefault(_UploadController);
var _ValidationMiddleware = require('../middlewares/ValidationMiddleware');

class UploadRoutes {
  constructor() {
    this.router = new (0, _express.Router)();

    this.router.post('/', _ValidationMiddleware.checkToken, _UploadController2.default.store);
  }
}

exports. default = new UploadRoutes().router;
