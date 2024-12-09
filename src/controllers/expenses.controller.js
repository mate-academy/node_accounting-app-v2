const expensesServices = require('../services/expenses.service.js');
const usersServices = require('../services/users.service.js');

const get = (req, res) => {
  const { userId, from, to, categories } = req.query;

  const filteredExpenses = expensesServices.getAllExpenses(
    userId,
    categories,
    from,
    to,
  );

  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const expense = expensesServices.getExpensesById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const userExists = usersServices.getUserById(userId);

  if (!userExists) {
    res.sendStatus(400);

    return;
  }

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesServices.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesServices.getExpensesById(id)) {
    res.sendStatus(404);

    return;
  }

  expensesServices.deleteExpense(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const expense = expensesServices.getExpensesById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesServices.updateExpense(id, title);

  res.status(200).send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
