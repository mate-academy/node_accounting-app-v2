const userService = require('../services/userService');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = userService.getAllUsers();

      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const user = userService.createUser(req.body);

      res.status(201).json(user);
    } catch (error) {
      if (error.message === 'Name is required') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const user = userService.getUserById(id);

      res.json(user);
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const id = parseInt(req.params.id);
      const user = userService.updateUser(id, req.body);

      res.json(user);
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }

      if (error.message === 'Name is required') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const id = parseInt(req.params.id);

      userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
