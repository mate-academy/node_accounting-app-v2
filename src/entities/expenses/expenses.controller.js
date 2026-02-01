const createExpenseController = (userService, expensesService) => {
  const {
    getExpenseByID,
    createExpense,
    deleteExpense,
    getAllExpenses,
    updateExpense,
  } = expensesService;

  const { getUserByID } = userService;

  const getOne = (req, res) => {
    const expense = getExpenseByID(Number(req.params.id));

    if (!expense) {
      return res.sendStatus(404);
    }

    res.status(200).send(expense);
  };

  const getAll = (req, res) => {
    const { categories, userId, from, to } = req.query;

    const categoriesArray = categories
      ? Array.isArray(categories)
        ? categories
        : [categories]
      : undefined;

    res.send(
      getAllExpenses({
        categories: categoriesArray,
        userId,
        from,
        to,
      }),
    );
  };

  const create = (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      return res.sendStatus(400);
    }

    if (!getUserByID(Number(userId))) {
      return res.sendStatus(404);
    }

    res.status(201).send(
      createExpense({
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      }),
    );
  };

  const expenseDelete = (req, res) => {
    const expense = getExpenseByID(Number(req.params.id));

    if (!expense) {
      return res.sendStatus(404);
    }

    deleteExpense(Number(req.params.id));

    res.sendStatus(204);
  };

  const update = (req, res) => {
    const expense = updateExpense({ id: Number(req.params.id), ...req.body });

    if (!expense) {
      return res.sendStatus(404);
    }

    res.send(expense);
  };

  return {
    getOne,
    getAll,
    create,
    expenseDelete,
    update,
  };
};

module.exports = createExpenseController;
