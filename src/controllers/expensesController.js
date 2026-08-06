const { z } = require('zod');

const expenseDataSchema = z.object({
  userId: z.number(),
  spentAt: z.string(),
  title: z.string().min(1, 'Title is required'),
  amount: z.number().positive(),
  category: z.string().optional(),
  note: z.string().optional(),
});

const updateExpenseSchema = expenseDataSchema.partial();

function createExpensesController(expensesService) {
  const getAll = (req, res) => {
    const expenses = expensesService.getAllExpenses(req.query);

    return res.status(200).json(expenses);
  };

  const create = (req, res) => {
    const validationResult = expenseDataSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        message: 'Bad Request',
      });
    }

    const expenseData = validationResult.data;

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
    const expenseId = Number(req.params.id);

    if (Number.isNaN(expenseId)) {
      return res.status(400).json({
        message: 'Bad Request',
      });
    }

    const validationResult = updateExpenseSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        message: 'Bad Request',
      });
    }

    const expense = expensesService.updateExpense(
      expenseId,
      validationResult.data,
    );

    if (!expense) {
      return res.status(404).json({
        message: 'Not Found',
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
