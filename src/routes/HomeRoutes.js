import { Router } from 'express';
import home from '../controllers/HomeController';

class HomeRoutes {
  constructor() {
    this.router = new Router();

    this.router.get('/', home.index);
  }
}

export default new HomeRoutes().router;
