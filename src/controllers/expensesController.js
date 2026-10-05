const createExpensesController = (expensesService) => {
  const getExpenses = (req, res) => {
    const userId = req.query.userId;
    const from = req.query.from;
    const to = req.query.to;
    const categories = req.query.categories;
    const expenses = expensesService.findExpense(userId, from, to, categories);

    res.json(expenses);
  };

  const getExpenseById = (req, res) => {
    const id = req.params.id;
    const expense = expensesService.findExpenseById(id);

    if (!expense) {
      res.status(404);
      res.end();
    } else {
      res.status(200);
      res.json(expense);
    }
  };

  const postExpense = (req, res) => {
    const newExpense = req.body;

    if (!req.body.title) {
      res.status(400);
      res.end();
    } else {
      const expense = expensesService.createExpense(newExpense);

      if (expense === null) {
        res.status(400).end();
      } else {
        res.status(201);
        res.json(expense);
      }
    }
  };

  const patchExpense = (req, res) => {
    const id = req.params.id;
    const expense = expensesService.patchExpenseById(id, req.body);

    if (!expense) {
      res.status(404);
      res.end();
    } else {
      res.status(200);
      res.json(expense);
    }
  };

  const deleteExpense = (req, res) => {
    const id = req.params.id;
    const expense = expensesService.deleteExpenseById(id);

    if (!expense) {
      res.status(404);
      res.end();
    } else {
      res.status(204).end();
    }
  };

  return {
    getExpenses,
    getExpenseById,
    postExpense,
    patchExpense,
    deleteExpense,
  };
};

module.exports = {
  createExpensesController,
};
