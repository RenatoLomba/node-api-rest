import { Router } from 'express';

import upload from '../controllers/UploadController';
import { checkToken } from '../middlewares/ValidationMiddleware';

class UploadRoutes {
  constructor() {
    this.router = new Router();

    this.router.post('/', checkToken, upload.store);
  }
}

export default new UploadRoutes().router;
