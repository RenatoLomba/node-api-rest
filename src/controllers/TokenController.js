import jwt from 'jsonwebtoken';
import User from '../models/User';
import UserDTO from '../dtos/UserDTO';

class TokenController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ errors: 'Email e Password devem ser informados' });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ errors: 'Usuário não cadastrado' });
      }

      const authenticated = await user.passwordIsValid(password);
      if (!authenticated) {
        return res.status(400).json({ errors: 'Senha inválida' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRES,
      });

      return res.status(200).json({ token });
    } catch (ex) {
      return res.status(500).json({ errors: ex.message });
    }
  }

  async show(req, res) {
    try {
      const id = req.userId;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ errors: 'User not found' });
      }

      const userDTO = new UserDTO(user);

      return res.status(200).json(userDTO);
    } catch (ex) {
      return res.status(500).json({ errors: ex.message });
    }
  }
}
export default new TokenController();
