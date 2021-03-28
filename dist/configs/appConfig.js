"use strict";Object.defineProperty(exports, "__esModule", {value: true});class Configs {
  constructor() {
    this.url = `${process.env.SERVER_URL}:${process.env.SERVER_PORT}`;
  }
}
exports. default = new Configs();
