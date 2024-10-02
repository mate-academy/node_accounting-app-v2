const { expensesService } = require('../services/expenses.service');
const { usersService } = require('../services/users.service');

const getAll = (req, res) => {
  const expenses = expensesService.getAll(req.query);

  res.status(200).json(expenses);
};

const create = (req, res) => {
  const dataToCreate = req.body;
  const { userId, spentAt, title, amount, category, note } = dataToCreate;

  if (
    !userId ||
    typeof userId !== 'number' ||
    !spentAt ||
    typeof spentAt !== 'string' ||
    !title ||
    typeof title !== 'string' ||
    !amount ||
    typeof amount !== 'number' ||
    !category ||
    typeof category !== 'string' ||
    !note ||
    typeof note !== 'string' ||
    !usersService.getById(+userId)
  ) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.create(dataToCreate);

  res.status(201).json(expense);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const expense = expensesService.getById(+expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(expense);
};

const deleteOne = (req, res) => {
  const { expenseId } = req.params;
  const expense = expensesService.getById(+expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteById(+expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const reqBody = req.body;
  const expense = expensesService.getById(+expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.update({ id: +expenseId, ...reqBody });

  res.status(200).json(updatedExpense);
};

const expensesController = {
  getAll,
  create,
  getOne,
  deleteOne,
  update,
};

module.exports = {
  expensesController,
};
