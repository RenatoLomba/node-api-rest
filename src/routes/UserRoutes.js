import { Router } from 'express';
import user from '../controllers/UserController';
import { checkToken } from '../middlewares/ValidationMiddleware';

class UserRoutes {
  constructor() {
    this.router = new Router();

    this.router.get('/', user.index);
    this.router.get('/:id', user.show);

    this.router.post('/', user.store);
    this.router.put('/', checkToken, user.update);
    this.router.delete('/', checkToken, user.delete);
  }
}

export default new UserRoutes().router;
