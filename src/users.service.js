/* eslint-disable no-param-reassign */
'use strict';

function initUsersRoutes(app, { users }) {
  let nextUserId = 1;

  app.post('/', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);
    }

    const newUser = {
      id: nextUserId++,
      name,
    };

    users.push(newUser);
    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/', (req, res) => {
    if (!users.length) {
      res.statusCode = 200;
      res.send([]);
    }
    res.send(users);
  });

  const findById = (itemsArray, id) => {
    return itemsArray.find(item => item.id === +id);
  };

  const filterById = (itemsArray, value) => {
    return itemsArray.filter(item => item.id !== +value);
  };

  app.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const findUser = findById(users, userId);

    if (!findUser) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus = 200;
    res.send(findUser);
  });

  app.delete('/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = filterById(users, userId);

    if (users.length === filteredUsers.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.sendStatus(204);
  });

  app.patch('/:userId', (req, res) => {
    const { userId } = req.params;
    const findUser = findById(users, userId);

    if (!findUser) {
      res.sendStatus(404);

      return;
    };

    const { name } = req.body;

    Object.assign(findUser, { name });
    res.send(findUser);
  });
}

module.exports = { initUsersRoutes };
