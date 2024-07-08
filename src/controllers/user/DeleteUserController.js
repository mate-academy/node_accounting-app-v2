const { DeleteUserService } = require('../../services/user');

class DeleteUserController {
  async handle(req, res) {
    const { id } = req.params;

    try {
      const service = new DeleteUserService();

      const removedUser = service.execute(id);

      if (removedUser) {
        return res.status(204).json();
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }
}

module.exports = new DeleteUserController();
