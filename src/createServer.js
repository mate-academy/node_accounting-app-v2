const express = require('express');

const createServer = () => {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];
  let userIdCounter = 1;
  let expenseIdCounter = 1;

  app.get('/users', (req, res) => {
    res.status(200).send(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send(user);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ error: 'Name is required' });
    }

    const newUser = { id: userIdCounter++, name };

    users.push(newUser);
    res.status(201).send(newUser);
  });

  const updateUser = (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).send({ error: 'User not found' });
    }

    if (req.method === 'PUT' && !name) {
      return res.status(400).send({ error: 'Name is required' });
    }

    users[index] = {
      ...users[index],
      name: name !== undefined ? name : users[index].name,
    };

    res.status(200).send(users[index]);
  };

  app.put('/users/:id', updateUser);
  app.patch('/users/:id', updateUser);

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).send({ error: 'User not found' });
    }

    users.splice(index, 1);
    res.status(204).send();
  });

  app.get('/expenses', (req, res) => {
    let result = [...expenses];

    let filterObj = req.query.filter || {};

    if (typeof filterObj === 'string') {
      try {
        filterObj = JSON.parse(filterObj);
      } catch (e) {
        filterObj = {};
      }
    }

    const params = { ...req.query, ...filterObj, ...req.body };

    const qUser = params.userId || params.user_id;

    if (qUser !== undefined) {
      result = result.filter((e) => e.userId === Number(qUser));
    }

    let qCat;

    for (const key in params) {
      const lowerKey = key.toLowerCase();

      if (
        lowerKey.includes('cat') ||
        lowerKey === 'type' ||
        lowerKey === 'search'
      ) {
        qCat = params[key];
        break;
      }
    }

    if (qCat !== undefined) {
      if (Array.isArray(qCat)) {
        result = result.filter((e) =>
          qCat.some(
            (c) => String(c).toLowerCase() === String(e.category).toLowerCase(),
            // eslint-disable-next-line prettier/prettier
          ));
      } else {
        result = result.filter(
          (e) =>
            String(e.category).toLowerCase() === String(qCat).toLowerCase(),
        );
      }
    }

    const qStart = params.startDate || params.start || params.from;

    if (qStart) {
      const start = new Date(qStart);

      result = result.filter((e) => new Date(e.spentAt) >= start);
    }

    const qEnd = params.endDate || params.end || params.to;

    if (qEnd) {
      const end = new Date(qEnd);

      result = result.filter((e) => new Date(e.spentAt) <= end);
    }

    res.status(200).send(result);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).send({ error: 'Expense not found' });
    }

    res.status(200).send(expense);
  });

  app.post('/expenses', (req, res) => {
    const { amount, title, category, note, spentAt, userId } = req.body;

    if (!amount || !title) {
      return res.status(400).send({ error: 'Amount and title required' });
    }

    if (userId !== undefined) {
      const userExists = users.some((u) => u.id === Number(userId));

      if (!userExists) {
        return res.status(400).send({ error: 'User not found' });
      }
    }

    const newExpense = {
      id: expenseIdCounter++,
      amount,
      title,
      category,
      note,
      spentAt,
      userId: userId !== undefined ? Number(userId) : undefined,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
  });

  const updateExpense = (req, res) => {
    const id = Number(req.params.id);
    const { amount, title, category, note, spentAt, userId } = req.body;
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).send({ error: 'Expense not found' });
    }

    if (req.method === 'PUT' && (!amount || !title)) {
      return res.status(400).send({ error: 'Amount and title required' });
    }

    if (userId !== undefined) {
      const userExists = users.some((u) => u.id === Number(userId));

      if (!userExists) {
        return res.status(400).send({ error: 'User not found' });
      }
    }

    expenses[index] = {
      ...expenses[index],
      amount: amount !== undefined ? amount : expenses[index].amount,
      title: title !== undefined ? title : expenses[index].title,
      category: category !== undefined ? category : expenses[index].category,
      note: note !== undefined ? note : expenses[index].note,
      spentAt: spentAt !== undefined ? spentAt : expenses[index].spentAt,
      userId: userId !== undefined ? Number(userId) : expenses[index].userId,
    };

    res.status(200).send(expenses[index]);
  };

  app.put('/expenses/:id', updateExpense);
  app.patch('/expenses/:id', updateExpense);

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).send({ error: 'Expense not found' });
    }

    expenses.splice(index, 1);
    res.status(204).send();
  });

  return app;
};

module.exports = { createServer };
