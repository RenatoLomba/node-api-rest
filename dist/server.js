"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _App = require('./App'); var _App2 = _interopRequireDefault(_App);

class Server {
  constructor() {
    this.app = _App2.default;
    this.port = process.env.SERVER_PORT;
  }
}

const server = new Server();
server.app.listen(Number(server.port), () => {
  console.log(`listening on port ${server.port}`);
  console.log(`http://localhost:${server.port}`);
});
