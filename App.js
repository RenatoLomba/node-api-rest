import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './src/database';
import express from 'express';
import home from './src/routes/HomeRoutes';
import user from './src/routes/UserRoutes';
import token from './src/routes/TokenRoutes';
import student from './src/routes/StudentRoutes';
import upload from './src/routes/UploadRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', home);
    this.app.use('/users/', user);
    this.app.use('/tokens/', token);
    this.app.use('/students/', student);
    this.app.use('/uploads/', upload);
  }
}

export default new App().app;
