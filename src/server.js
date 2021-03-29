import app from './App';

class Server {
  constructor() {
    this.app = app;
    this.port = process.env.PORT || 80;
  }
}

const server = new Server();
server.app.listen(Number(server.port), () => {
  console.log(`listening on port ${server.port}`);
  console.log(`http://localhost:${server.port}`);
});
