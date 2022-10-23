'use strict';

function usersRoute(route, initialUsers) {
  let nextUserId = 1;
  let availableUsers = initialUsers;

  route.get('/', (req, res) => {
    res
      .status(200)
      .send(availableUsers);
  });

  route.get('/:userId', (req, res) => {
    const { userId } = req.params;

    if (isNaN(+userId)) {
      res.sendStatus(400);

      return;
    }

    const askingUser = availableUsers.find(({ id }) => +userId === id);

    if (!askingUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode(200);
    res.send(askingUser);
  });

  route.post('/', (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    };

    const newUser = {
      id: nextUserId++,
      name,
    };

    availableUsers.push(newUser);

    res.statusCode(201);
    res.send(newUser);
  });

  route.delete('/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = availableUsers.filter(({ id }) => +userId !== id);
    const isUserDeleted = filteredUsers.length !== availableUsers.length;

    availableUsers = filteredUsers;

    res.sendStatus(isUserDeleted ? 204 : 404);
  });

  route.patch('/:userId', (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    if (isNaN(+userId) || !name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const askingUser = availableUsers.find(({ id }) => +userId === id);

    if (!askingUser) {
      res.sendStatus(404);

      return;
    }

    Object.assign(askingUser, { name });
    res.statusCode(200);
    res.send(askingUser);
  });
}

module.exports = {
  usersRoute,
};
