'use strict';

const {
  getById,
  removeUser,
} = require('./services/users.js');

const {
  getALLAppUsers,
  postOneUser,
  patchOneUser,
} = require('./controllers/users');

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

  app.post('/', postOneUser(users));

  app.patch('/:id', patchOneUser(users));
}

module.exports = {
  InitUserRoutes,
};
