import Sequelize, { Model } from 'sequelize';
import configs from '../configs/appConfig';

export default class Photo extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Original name empty',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Original name empty',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() { return `${configs.url}/${this.getDataValue('filename')}`; },
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
}
