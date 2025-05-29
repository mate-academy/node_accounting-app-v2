const expenseService = require('../services/expenses');
const { userExists } = require('../services/users');

const getAll = (req, res) => {
  const { userId, from, to, categories } = req.query;

  res.send(expenseService.getAllExpenses(userId, from, to, categories));
};

const addNew = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    !userId ||
    !spentAt ||
    !title ||
    !amount ||
    !category ||
    !note ||
    !userExists(userId)
  ) {
    res.sendStatus(400);

    return;
  }

  res.status(201);

  res.send(
    expenseService.addExpense({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    }),
  );
};

const getById = (req, res) => {
  const id = req.params.id;

  if (!expenseService.expenseExists(id)) {
    res.sendStatus(404);

    return;
  }

  res.send(expenseService.getById(id));
};

const remove = (req, res) => {
  const id = req.params.id;

  if (!expenseService.expenseExists(id)) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpense(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { spentAt, title, amount, category, note } = req.body;
  const id = req.params.id;

  if (!expenseService.expenseExists(id)) {
    res.sendStatus(404);

    return;
  }

  res.send(
    expenseService.updateExpense(id, {
      spentAt,
      title,
      amount,
      category,
      note,
    }),
  );
};

module.exports = {
  getAll,
  addNew,
  getById,
  remove,
  update,
};
