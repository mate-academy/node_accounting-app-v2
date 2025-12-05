'use strict';

function createUsersController({ users, userIdSeq }) {
  return {
    // POST /users - cria usuário
    createUser: (req, res) => {
      const { name } = req.body || {};

      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }

      const user = { id: userIdSeq.value++, name };

      users.push(user);

      return res.status(201).json(user);
    },

    // GET /users - lista todos usuários
    getUsers: (_req, res) => {
      return res.status(200).json(users);
    },

    // GET /users/:id - obtém usuário por id
    getUser: (req, res) => {
      const id = Number(req.params.id);
      const user = users.find((u) => u.id === id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    },

    // PATCH /users/:id - atualiza usuário
    updateUser: (req, res) => {
      const id = Number(req.params.id);
      const user = users.find((u) => u.id === id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { name } = req.body || {};

      if (typeof name !== 'undefined') {
        user.name = name;
      }

      return res.status(200).json(user);
    },

    // DELETE /users/:id - remove usuário
    deleteUser: (req, res) => {
      const id = Number(req.params.id);
      const index = users.findIndex((u) => u.id === id);

      if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
      }

      users.splice(index, 1);

      return res.status(204).end();
    },
  };
}

module.exports = { createUsersController };
