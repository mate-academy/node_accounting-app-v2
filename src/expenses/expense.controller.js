const service = require('./expense.service');
const userService = require('../users/user.service');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  let expenses = service.getAll();

  if (userId) {
    expenses = expenses.filter((expense) => +expense.userId === +userId);
  }

  let expenseCategories;

  if (categories) {
    expenseCategories = categories.split(',');

    expenses = expenses.filter(
      (expense) => expenseCategories.includes(expense.category),
      // eslint-disable-next-line function-paren-newline
    );
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    expenses = expenses.filter((expense) => {
      const spentDate = new Date(expense.spentAt);

      const isInDateRange = spentDate >= fromDate && spentDate <= toDate;

      return isInDateRange;
    });
  }

  res.send(expenses);
};

const getById = (req, res) => {
  const { id } = req.params;
  const expense = service.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expense);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !category) {
    return res.sendStatus(400);
  }

  if (!userService.getById(userId)) {
    return res.sendStatus(400);
  }

  const newExpense = service.add({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const update = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const updatedExpense = service.update(id, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.status(200).send(updatedExpense);
};

const deleteById = (req, res) => {
  const { id } = req.params;

  const deleted = service.deleteById(id);

  if (!deleted) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteById,
};
