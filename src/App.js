import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './database';
import express from 'express';

import cors from 'cors';
import helmet from 'helmet';

import home from './routes/HomeRoutes';
import user from './routes/UserRoutes';
import token from './routes/TokenRoutes';
import student from './routes/StudentRoutes';
import upload from './routes/UploadRoutes';

const whiteList = [
  'http://localhost:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads', 'images')));
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
