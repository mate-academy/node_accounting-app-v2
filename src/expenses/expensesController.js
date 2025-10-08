const { expenseService } = require('./expensesService');

const getAll = async (req, res) => {
  const { userId, categories, dateFrom, dateTo } = req.body;

  const expenses = await expenseService.getAllExpenses(
    userId,
    categories,
    dateFrom,
    dateTo,
  );

  res.json(expenses);
};

const getSingle = async (req, res) => {
  const exp = await expenseService.getSingleExpense(req.params.id);

  res.json(exp);
};

const create = async (req, res) => {
  const { userId, title, amount, category, note } = req.body.name;

  if (!userId || !title || !amount || !category) {
    return res.sendStatus(400);
  }

  const exp = await expenseService.addExpense({
    userId,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(exp);
};

const deleteExpense = async (req, res) => {
  const deletedExpense = await expenseService.removeExpense(req.params.id);

  if (!deletedExpense) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { userId, title, amount, category, note } = req.body;
  const exp = await expenseService.getSingleExpense(req.params.id);

  if (!exp) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expenseService.updateExpense({
    id: req.params.id,
    userId,
    title,
    amount,
    category,
    note,
  });

  res.json(updatedExpense);
};

export const expensesController = {
  getAll,
  getSingle,
  create,
  deleteExpense,
  update,
};
