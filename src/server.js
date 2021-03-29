import app from './App';

class Server {
  constructor() {
    this.app = app;
    this.port = process.env.SERVER_PORT;
  }
}

const server = new Server();
server.app.listen(Number(server.port), () => {
  console.log(`listening on port ${server.port}`);
  console.log(`http://localhost:${server.port}`);
});
