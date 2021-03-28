const bcryptjs = require('bcryptjs');
const UserSeed = require('../UserSeed');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      new UserSeed('John Doe', 'john_doe@gmail.com', (await bcryptjs.hash('johndoe123', 8))),
      new UserSeed('Marisha Ray', 'marisha_ray@critrole.com', (await bcryptjs.hash('marisharay123', 8))),
      new UserSeed('Johnny Silverhand', 'johnny_silver@cyberpunk.com', (await bcryptjs.hash('johnnysilverhand123', 8))),
    ], {});
  },

  down: async () => {},
};
