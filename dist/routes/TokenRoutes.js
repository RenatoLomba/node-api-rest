"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _TokenController = require('../controllers/TokenController'); var _TokenController2 = _interopRequireDefault(_TokenController);
var _ValidationMiddleware = require('../middlewares/ValidationMiddleware');

class TokenRoutes {
  constructor() {
    this.router = new (0, _express.Router)();

    this.router.post('/', _TokenController2.default.store);
    this.router.get('/', _ValidationMiddleware.checkToken, _TokenController2.default.show);
  }
}

exports. default = new TokenRoutes().router;
