import jwt from 'jsonwebtoken';
import User from '../models/User';

class ValidationMiddleware {
  async checkToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ errors: 'Login Required' });
    }

    const [, token] = authorization.split(' ');

    try {
      const payload = jwt.verify(token, process.env.TOKEN_SECRET);
      const { id, email } = payload;

      console.log(payload);

      const user = await User.findOne({ where: { id, email } });
      if (!user) {
        return res.status(401).json({ errors: 'Usuário Inválido' });
      }

      req.userId = user.id;
      req.userEmail = user.email;

      return next();
    } catch (ex) {
      return res.status(401).json({ errors: ex.message });
    }
  }
}
const validation = new ValidationMiddleware();
export const { checkToken } = validation;
