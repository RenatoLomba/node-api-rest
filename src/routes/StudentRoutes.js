import { Router } from 'express';
import student from '../controllers/StudentController';
import { checkToken } from '../middlewares/ValidationMiddleware';

class StudentRoutes {
  constructor() {
    this.router = new Router();

    this.router.get('/', checkToken, student.index);
    this.router.post('/', checkToken, student.store);
    this.router.get('/:id', checkToken, student.show);
    this.router.delete('/:id', checkToken, student.delete);
    this.router.put('/', checkToken, student.update);
  }
}

export default new StudentRoutes().router;
