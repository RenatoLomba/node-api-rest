"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _PhotoDTO = require('./PhotoDTO'); var _PhotoDTO2 = _interopRequireDefault(_PhotoDTO);

class StudentDTO {
  constructor({
    id = '', first_name, last_name, email, age, weight, height, Photos = null,
  }) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.Photos = Photos ? Photos.map((photo) => new (0, _PhotoDTO2.default)(photo)) : [];
    this.errors = [];
  }

  createValidator() {
    if (this.id) this.errors.push('Id não pode ser informado no cadastro');
    if (!this.first_name) this.errors.push('First Name vazio');
    if (!this.last_name) this.errors.push('Last Name vazio');
    if (!this.email) this.errors.push('Email vazio');
    if (!this.age) this.errors.push('Age vazio');
    if (!this.weight) this.errors.push('Weight vazio');
    if (!this.height) this.errors.push('Height vazio');
  }
}
exports. default = StudentDTO;
