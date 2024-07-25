const { expensesService } = require('../../services/expenses/expenses.service');
const { filterExpensesWithQuery } = require('../../services/helperService');
const getAll = (req, res) => {
  res.send(filterExpensesWithQuery(req.query));
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const expense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(expense);
};

const getById = (req, res) => {
  const expense = expensesService.getById(+req.params.id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const remove = (req, res) => {
  const expense = expensesService.getById(+req.params.id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteById(+req.params.id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const expense = expensesService.getById(+req.params.id);
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.update({
    id: +req.params.id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(updatedExpense);
};

module.exports = {
  expensesController: {
    getAll,
    create,
    getById,
    remove,
    update,
  },
};
