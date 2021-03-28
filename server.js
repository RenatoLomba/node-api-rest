import app from './App';

class Server {
  constructor() {
    this.app = app;
    this.port = 3001;
  }
}

const server = new Server();
server.app.listen(server.port, () => {
  console.log(`listening on port ${server.port}`);
  console.log(`http://localhost:${server.port}`);
});
