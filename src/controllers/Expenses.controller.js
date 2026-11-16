function createExpensesController(ExpensesService, UsersService) {
  return {
    getAllExpenses: (req, res) => {
      const { userId, categories, from, to } = req.query;

      const categoryList = categories ? categories.split(',') : [];

      const invalidDate = [from, to].some(
        (value) => value && !Number.isFinite(Date.parse(value)),
      );

      if (invalidDate || (from && to && Date.parse(from) > Date.parse(to))) {
        return res.sendStatus(400);
      }

      res.send(ExpensesService.getAllExpenses(userId, categoryList, from, to));
    },

    createExpenses: (req, res) => {
      const { userId, spentAt, title, amount, category, note } = req.body;

      if (
        userId === undefined ||
        userId === null ||
        !spentAt ||
        !title ||
        amount === undefined ||
        amount === null ||
        !category ||
        !note
      ) {
        res.sendStatus(400);

        return;
      }

      if (!UsersService.getUserById(userId)) {
        res.sendStatus(404);

        return;
      }
      res.statusCode = 201;

      res.send(
        ExpensesService.createExpenses(
          userId,
          spentAt,
          title,
          amount,
          category,
          note,
        ),
      );
    },

    getExpensesById: (req, res) => {
      const { id } = req.params;

      if (id !== 0) {
        if (!id) {
          res.sendStatus(400);

          return;
        }
      }

      const user = ExpensesService.getExpensesById(id);

      if (!user) {
        res.sendStatus(404);

        return;
      }

      res.statusCode = 200;
      res.send(user);
    },

    updateExpensesById: (req, res) => {
      const { id } = req.params;

      if (id === undefined || id === null) {
        return res.sendStatus(400);
      }

      const expense = ExpensesService.getExpensesById(id);

      if (!expense) {
        return res.sendStatus(404);
      }

      const fields = ['spentAt', 'title', 'amount', 'category', 'note'];
      const updates = Object.fromEntries(
        fields
          .filter((field) => req.body[field] !== undefined)
          .map((field) => [field, req.body[field]]),
      );

      if (Object.keys(updates).length === 0) {
        return res.sendStatus(400);
      }

      res.status(200).send(ExpensesService.updateExpensesById(id, updates));
    },

    deleteExpensesById: (req, res) => {
      const { id } = req.params;

      if (!id || id === 0) {
        res.sendStatus(400);

        return;
      }

      const expenses = ExpensesService.getExpensesById(id);

      if (!expenses) {
        res.sendStatus(404);

        return;
      }
      ExpensesService.deleteExpensesById(id);
      res.statusCode = 204;
      res.end();
    },
  };
}

module.exports = {
  createExpensesController,
};
