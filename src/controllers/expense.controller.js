const expenseService = require('../services/expense.service.js');
const userService = require('../services/user.service.js');

const getAll = (req, res) => {
  const { 
    userId: recivedUserId,
    categories,
    from,
    to,
  } = req.query;
  const userId = Number(recivedUserId);

  let expenses = expenseService.getAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === userId);
  }

  if (categories) {
    const categoriesArray = categories.split(',');
    expenses = expenses.filter(expense => (
      categoriesArray.includes(expense.category)
    ));
  }

  if (from) {
    const fromDate = new Date(from);
    expenses = expenses.filter(expense => new Date(expense.spentAt) >= fromDate);
  }

  if (to) {
    const toDate = new Date(to);
    expenses = expenses.filter(expense => new Date(expense.spentAt) <= toDate);
  }

  res.send(expenses);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id || Number.isNaN(id) || !isFinite(id) || id <= 0) {
    res.sendStatus(400);
    return;
  }

  const expense = expenseService.getById(Number(id));

  if (!expense) {
    res.sendStatus(404);
    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const { 
    title,
    userId,
    spentAt,
    amount,
    category,
    note,
  } = req.body;

  const user = userService.getById(userId);

  if (
    !title
    || !user
    || typeof title !== 'string'
    || !userId
    || !isFinite(userId)
    || userId <= 0
    || Number.isNaN(userId)
  ) {
    res.sendStatus(400);
    return;
  }

  const newExpense = expenseService.create({
    title,
    userId,
    spentAt,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const expenseToRemove = expenseService.getById(Number(id));

  if (!expenseToRemove) {
    res.sendStatus(404);
    return;
  }

  expenseService.remove(expenseToRemove.id);

  res.sendStatus(204);
};

const patch = (req, res) => {
  const { id: recivedId } = req.params;
  const id = Number(recivedId);
  const { 
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (
    !id
    || Number.isNaN(id)
    || !isFinite(id)
    || id <= 0
    || !title
    || typeof title !== 'string'
  ) {
    res.sendStatus(400);
    return;
  }

  const expenseToUpdate = expenseService.getById(Number(id));

  if (!expenseToUpdate) {
    res.sendStatus(404);
    return;
  }

  const updatedExpense = expenseService.patch({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(200).send(updatedExpense);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  patch,
}