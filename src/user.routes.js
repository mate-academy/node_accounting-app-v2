'use strict';

function InitUserRoutes(app, { users }) {
  app.get('/', (req, res) => {
    res.send(users);

    res.statusCode = 200;
  });

  app.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
    res.sendStatus(200);
  });

  app.delete('/:id', (req, res) => {
    const { id } = req.params;

    const filteredUsers = users.filter((user) => user.id !== +id);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    // eslint-disable-next-line no-param-reassign
    users = filteredUsers;
    res.sendStatus(204);
  });

  app.post('/', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: Math.random(),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.patch('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    Object.assign(foundUser, { name });

    res.send(foundUser);
    res.sendStatus(200);
  });
}

module.exports = {
  InitUserRoutes,
};
