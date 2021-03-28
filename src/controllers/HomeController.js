class HomeController {
  async index(req, res) {
    res.status(200).json({ message: 'Hello World' });
  }
}
export default new HomeController();
