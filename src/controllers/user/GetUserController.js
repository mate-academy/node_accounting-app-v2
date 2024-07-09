const { GetUserService } = require('../../services/user');

class GetUserController {
  async handle(req, res) {
    const { id } = req.params;

    try {
      const service = new GetUserService();

      const user = service.execute(id);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }
}

module.exports = new GetUserController();
