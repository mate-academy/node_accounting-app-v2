const { CreateUserService } = require('../../services/user');

class CreateUserController {
  async handle(req, res) {
    try {
      const service = new CreateUserService();

      const user = service.execute(req.body);

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }
}

module.exports = new CreateUserController();
