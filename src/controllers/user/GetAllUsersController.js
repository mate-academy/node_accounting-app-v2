const { GetAllUserService } = require('../../services/user');

class GetAllUsersController {
  async handle(req, res) {
    try {
      const service = new GetAllUserService();

      const users = service.execute();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }
}

module.exports = new GetAllUsersController();
