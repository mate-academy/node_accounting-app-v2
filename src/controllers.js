'use strict';

const usersService = require('./services/users.service');
const expensesService = require('./services/expenses.service');

const getAllUsers = async (req, res) => {
  const users = await usersService.getAllUsers();

  res.json(users);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send();

    return;
  }

  const user = await usersService.createUser(name);

  res.status(201).json(user);
};

const getUserById = async (req, res) => {
  const user = await usersService.getUserById(Number(req.params.id));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.json(user);
};

const deleteOne = async (req, res) => {
  const user = await usersService.deleteOne(Number(req.params.id));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { name } = req.body;

  const user = await usersService.update(Number(req.params.id), name);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await usersService.getUserById(Number(req.params.id));

  res.json(updatedUser);
};

const getAllExpenses = async (req, res) => {
  const { userId, from, to, categories } = req.query;
  let expenses = await expensesService.getAllExpenses();

  if (userId) {
    expenses = expenses.filter((exp) => exp.userId === Number(userId));
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    expenses = expenses.filter((exp) => {
      const expDate = new Date(exp.spentAt);

      return expDate >= fromDate && expDate <= toDate;
    });
  }

  if (categories) {
    const categoryList = categories.split(',');

    expenses = expenses.filter((exp) => categoryList.includes(exp.category));
  }

  res.json(expenses);
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    res.status(400).json({ error: 'Missing required fields' });

    return;
  }

  const user = await usersService.getUserById(Number(userId));

  if (!user) {
    res.status(400).send();

    return;
  }

  const expense = await expensesService.createExpense(
    Number(userId),
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(expense);
};

const getExpenseById = async (req, res) => {
  const expense = await expensesService.getExpenseById(Number(req.params.id));

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.json(expense);
};

const removeExpenseById = async (req, res) => {
  const expense = await expensesService.removeExpenseById(
    Number(req.params.id),
  );

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.sendStatus(204);
};

const updateExpenseById = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const expense = await expensesService.updateExpenseById(Number(id), updates);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.json(expense);
};

module.exports = {
  usersController: {
    getAll: getAllUsers,
    create: createUser,
    getById: getUserById,
    delete: deleteOne,
    update,
  },
  expensesController: {
    getAll: getAllExpenses,
    create: createExpense,
    getById: getExpenseById,
    delete: removeExpenseById,
    update: updateExpenseById,
  },
};
