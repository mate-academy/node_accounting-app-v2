'use strict';

const { getId } = require('../utils.js');

const createUsers = () => {
  const usersMethods = {
    users: [],
    getAll(req, res) {
      res.send(usersMethods.users);
    },

    getOne(req, res) {
      const id = getId(req, '/users/:id');
      const user = usersMethods.users.find(el => el.id === Number(id));

      if (!user) {
        res.sendStatus(404);

        return;
      }

      res.send(user);
    },

    post(req, res) {
      const { name } = req.body;

      if (!name) {
        res.sendStatus(400);

        return;
      }

      const newUser = {
        name, id: usersMethods.users.length + 1,
      };

      usersMethods.users.push(newUser);

      res.statusCode = 201;
      res.statusMessage = 'Created';
      res.send(newUser);
    },

    delete(req, res) {
      const id = getId(req, '/users/:id');
      const newUsers = usersMethods.users.filter(el => el.id !== Number(id));

      if (newUsers.length === usersMethods.users.length) {
        res.sendStatus(404);

        return;
      }

      usersMethods.users = newUsers;
      res.sendStatus(204);
    },

    patch(req, res) {
      const id = getId(req, '/users/:id');
      const user = usersMethods.users.find(el => el.id === Number(id));

      if (!user) {
        res.sendStatus(404);

        return;
      }

      if (!req.body) {
        res.sendStatus(404);

        return;
      }

      const { name } = req.body;

      if (!name) {
        res.sendStatus(400);

        return;
      }

      user.name = name;
      res.send(user);
    },
  };

  return usersMethods;
};

module.exports = {
  createUsers,
};
