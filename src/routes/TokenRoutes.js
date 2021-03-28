import { Router } from 'express';
import token from '../controllers/TokenController';
import { checkToken } from '../middlewares/ValidationMiddleware';

class TokenRoutes {
  constructor() {
    this.router = new Router();

    this.router.post('/', token.store);
    this.router.get('/', checkToken, token.show);
  }
}

export default new TokenRoutes().router;
