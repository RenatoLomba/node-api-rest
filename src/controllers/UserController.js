import User from '../models/User';
import UserDTO from '../dtos/UserDTO';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const userDTO = new UserDTO(newUser);
      res.status(200).json(userDTO);
    } catch (ex) {
      res.status(400).json({ errors: ex.errors.map((error) => error.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();
      const userDTOs = users.map((user) => new UserDTO(user));
      res.status(200).json(userDTOs);
    } catch (ex) {
      res.status(400).json({ errors: ex.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) return res.status(404).json({ errors: 'User not found' });

      const userDTO = new UserDTO(user);

      return res.status(200).json(userDTO);
    } catch (ex) {
      return res.status(400).json({ errors: ex.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.userId;
      if (!id) return res.status(400).json({ errors: 'Missing User Id' });

      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ errors: 'User not found' });

      const newUser = await user.update(req.body);

      const newUserDTO = new UserDTO(newUser);

      return res.status(200).json(newUserDTO);
    } catch (ex) {
      return res.status(400).json({ errors: ex.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: 'Missing User Id' });

      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ errors: 'User not found' });

      await user.destroy();

      return res.status(200).json(true);
    } catch (ex) {
      return res.status(400).json({ errors: ex.message });
    }
  }
}
export default new UserController();
