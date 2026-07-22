function createExpensesController(expensesService) {
  const getAll = (req, res) => {
    const expenses = expensesService.getAllExpenses(req.query);

    return res.status(200).json(expenses);
  };

  const create = (req, res) => {
    const expenseData = req.body;

    if (
      expenseData.userId == null ||
      expenseData.spentAt == null ||
      expenseData.title == null ||
      expenseData.amount == null ||
      expenseData.category == null ||
      expenseData.note == null
    ) {
      return res.status(400).json({
        message: 'Bad Request',
      });
    }

    const createdExpense = expensesService.createExpense(expenseData);

    if (!createdExpense) {
      return res.status(400).json({
        message: 'Bad Request',
      });
    }

    return res.status(201).json(createdExpense);
  };

  const getOne = (req, res) => {
    const expenseId = Number(req.params.id);

    if (Number.isNaN(expenseId)) {
      return res.status(400).json({
        message: 'Bad Request',
      });
    }

    const expense = expensesService.getExpenseById(expenseId);

    if (!expense) {
      return res.status(404).json({
        message: 'Not Found',
      });
    }

    return res.status(200).json(expense);
  };

  const remove = (req, res) => {
    const expenseId = +req.params.id;

    const deleted = expensesService.deleteExpense(expenseId);

    if (!deleted) {
      return res.status(404).json({
        message: 'Not found',
      });
    }

    return res.status(204).send();
  };

  const update = (req, res) => {
    const expenseId = +req.params.id;
    const expense = expensesService.updateExpense(expenseId, req.body);

    if (!expense) {
      return res.status(404).json({
        message: 'Not Found',
      });
    }

    if (req.body.title == null) {
      return res.status(400).json({
        message: 'Bad Request',
      });
    }

    return res.status(200).json(expense);
  };

  return {
    getAll,
    create,
    getOne,
    remove,
    update,
  };
}

module.exports = {
  createExpensesController,
};
