"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _appConfig = require('../configs/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);

 class Photo extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Original name empty',
          },
        },
      },
      filename: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Original name empty',
          },
        },
      },
      url: {
        type: _sequelize2.default.VIRTUAL,
        get() { return `${_appConfig2.default.url}/${this.getDataValue('filename')}`; },
      },
    },
    {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
  }
} exports.default = Photo;
