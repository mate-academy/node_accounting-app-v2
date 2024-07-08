const { EditUserService } = require('../../services/user');

class EditUserController {
  async handle(req, res) {
    const { id } = req.params;

    try {
      const service = new EditUserService();

      const user = service.execute(id, req.body);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }
}

module.exports = new EditUserController();
