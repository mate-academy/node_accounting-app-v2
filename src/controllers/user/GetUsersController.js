const { GetUserService } = require('../../services/user');

class GetUsersController {
  async handle(req, res) {
    try {
      const service = new GetUserService();

      const users = service.execute();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }
}

module.exports = new GetUsersController();
