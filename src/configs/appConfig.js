class Configs {
  constructor() {
    this.url = `${process.env.SERVER_URL}:${process.env.SERVER_PORT}`;
  }
}
export default new Configs();
