'use strict';

const REQUIRED_EXPENSE_FIELDS = [
  'userId',
  'spentAt',
  'title',
  'amount',
  'category',
  'note',
];

function createExpensesController({ expensesService }) {
  function createExpense(req, res) {
    const hasMissingField = REQUIRED_EXPENSE_FIELDS.some((field) => {
      return req.body[field] === undefined;
    });

    if (hasMissingField) {
      res.status(400).send({ message: 'Expense data is incomplete' });

      return;
    }

    if (!expensesService.hasUser(req.body.userId)) {
      res.status(400).send({ message: 'User not found' });

      return;
    }

    const expense = expensesService.createExpense(req.body);

    res.status(201).send(expense);
  }

  function getExpenses(req, res) {
    const filters = {
      userId:
        req.query.userId !== undefined ? Number(req.query.userId) : undefined,
      from: req.query.from,
      to: req.query.to,
      categories: req.query.categories?.split(','),
    };

    res.send(expensesService.getExpenses(filters));
  }

  function getExpense(req, res) {
    const expense = expensesService.getExpenseById(
      Number(req.params.expenseId),
    );

    if (!expense) {
      res.status(404).send({ message: 'Expense not found' });

      return;
    }

    res.send(expense);
  }

  function updateExpense(req, res) {
    const expenseId = Number(req.params.expenseId);
    const expense = expensesService.getExpenseById(expenseId);

    if (!expense) {
      res.status(404).send({ message: 'Expense not found' });

      return;
    }

    if (
      req.body.userId !== undefined &&
      !expensesService.hasUser(req.body.userId)
    ) {
      res.status(400).send({ message: 'User not found' });

      return;
    }

    res.send(expensesService.updateExpense(expenseId, req.body));
  }

  function deleteExpense(req, res) {
    const isDeleted = expensesService.deleteExpense(
      Number(req.params.expenseId),
    );

    if (!isDeleted) {
      res.status(404).send({ message: 'Expense not found' });

      return;
    }

    res.status(204).send();
  }

  return {
    createExpense,
    getExpenses,
    getExpense,
    updateExpense,
    deleteExpense,
  };
}

module.exports = {
  createExpensesController,
};
