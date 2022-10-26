'use strict';

function userRoute(router, initialUsers) {
  let nextUserId = 1;
  let users = initialUsers;

  router.get('/', (req, res) => {
    res.send(users);
  });

  router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    if (isNaN(+userId)) {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(({ id }) => +userId === id);

    foundUser ? res.send(foundUser) : res.sendStatus(404);
  });

  router.post('/', (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: nextUserId++,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  router.delete('/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(({ id }) => +userId !== id);
    const isUserFound = users.length !== filteredUsers.length;

    users = filteredUsers;

    res.sendStatus(isUserFound ? 204 : 404);
  });

  router.patch('/:userId', (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    if (isNaN(+userId) || !name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(({ id }) => +userId === id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });
}

module.exports = { userRoute };
