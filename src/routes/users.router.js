const express = require('express');

function createUserRouter(users, expenses) {
  const router = express.Router();
  let nextUserId = 1;

  router.get('/', (req, res) => {
    res.status(200).json(users);
  });

  router.post('/', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = { id: nextUserId++, name };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  router.get('/:id', (req, res) => {
    const paramId = req.params.id;
    const user = users.find((u) => String(u.id) === String(paramId));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  });

  router.patch('/:id', (req, res) => {
    const paramId = req.params.id;
    const user = users.find((u) => String(u.id) === String(paramId));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.body.name !== undefined) {
      user.name = req.body.name;
    }

    res.status(200).json(user);
  });

  router.delete('/:id', (req, res) => {
    const paramId = req.params.id;
    const userIndex = users.findIndex(
      (user) => String(user.id) === String(paramId),
    );

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    const [deletedUser] = users.splice(userIndex, 1);

    const remainingExpenses = expenses.filter(
      (expense) => String(expense.userId) !== String(deletedUser.id),
    );

    expenses.length = 0;
    expenses.push(...remainingExpenses);

    res.status(204).send();
  });

  return router;
}

module.exports = createUserRouter;
