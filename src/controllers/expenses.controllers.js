const createExpenseControllers = (expensesService) => {
  const get = (req, res) => {
    const { userId, from, to } = req.query;
    let { categories } = req.query;

    if (typeof categories === 'string') {
      categories = [categories];
    }

    const filteredExpenses = expensesService.getFilteredExpenses({
      userId,
      categories,
      from,
      to,
    });

    res.status(200).json(filteredExpenses);
  };

  const getById = (req, res) => {
    const { id } = req.params;

    if (id == null) {
      return res.status(400).json({ error: 'ID is required' });
    }

    if (Number.isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID must be a number' });
    }

    const expense = expensesService.getExpenseById(Number(id));

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json(expense);
  };

  const add = (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId == null ||
      spentAt == null ||
      title == null ||
      amount == null ||
      category == null ||
      note == null
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newExpense = expensesService.addExpense({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    if (!newExpense) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    res.status(201).json(newExpense);
  };

  const update = (req, res) => {
    const { id } = req.params;

    if (id == null) {
      return res.status(400).json({ error: 'ID is required' });
    }

    if (Number.isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID must be a number' });
    }

    const allowedFields = [
      'userId',
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (updates.userId !== undefined) {
      const user = expensesService.getUserExists(updates.userId);

      if (!user) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
    }

    const updatedExpense = expensesService.updateExpense(Number(id), updates);

    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json(updatedExpense);
  };

  const remove = (req, res) => {
    const { id } = req.params;

    if (id == null) {
      return res.status(400).json({ error: 'ID is required' });
    }

    if (Number.isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID must be a number' });
    }

    const deleted = expensesService.deleteExpense(Number(id));

    if (!deleted) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(204).send();
  };

  return {
    get,
    getById,
    add,
    update,
    remove,
  };
};

module.exports = {
  createExpenseControllers,
};
