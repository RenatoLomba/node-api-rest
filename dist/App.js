"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');

_dotenv2.default.config();

require('./database');
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _HomeRoutes = require('./routes/HomeRoutes'); var _HomeRoutes2 = _interopRequireDefault(_HomeRoutes);
var _UserRoutes = require('./routes/UserRoutes'); var _UserRoutes2 = _interopRequireDefault(_UserRoutes);
var _TokenRoutes = require('./routes/TokenRoutes'); var _TokenRoutes2 = _interopRequireDefault(_TokenRoutes);
var _StudentRoutes = require('./routes/StudentRoutes'); var _StudentRoutes2 = _interopRequireDefault(_StudentRoutes);
var _UploadRoutes = require('./routes/UploadRoutes'); var _UploadRoutes2 = _interopRequireDefault(_UploadRoutes);

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(_express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', _HomeRoutes2.default);
    this.app.use('/users/', _UserRoutes2.default);
    this.app.use('/tokens/', _TokenRoutes2.default);
    this.app.use('/students/', _StudentRoutes2.default);
    this.app.use('/uploads/', _UploadRoutes2.default);
  }
}

exports. default = new App().app;
