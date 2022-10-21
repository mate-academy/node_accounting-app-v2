'use strict';

const {
  getById, createUser, removeUser, updateUser,
} = require('./services/users.js');

const { getALLAppUsers } = require('./controllers/users');

function InitUserRoutes(app, { users }) {
  app.get('/', getALLAppUsers(users));

  app.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = getById(users, +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
    res.sendStatus(200);
  });

  app.delete('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = getById(users, +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    // eslint-disable-next-line no-param-reassign
    users = removeUser(users, +id);
    res.sendStatus(204);
  });

  app.post('/', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = createUser(users, name);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.patch('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = getById(users, +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    updateUser(name, +id, users);

    res.send(foundUser);
    res.sendStatus(200);
  });
}

module.exports = {
  InitUserRoutes,
};
