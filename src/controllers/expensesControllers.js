module.exports = (expService, usersService) => ({
  getAll() {
    return (req, res) => {
      const querry = req.query;

      try {
        const expenses = expService.getAll(querry);

        res.status(200).send(expenses);
      } catch (err) {
        res.status(400).send('Bad Request');
      }
    };
  },

  getByExpId() {
    return (req, res) => {
      const { id } = req.params;
      const numericId = Number(id);

      if (!id || Number.isNaN(numericId)) {
        return res.status(404).send('Expense not found');
      }

      const expense = expService.getById(numericId);

      if (!expense) {
        return res.status(404).send('Expense not found');
      }

      res.status(200).json(expense);
    };
  },

  addExp() {
    return (req, res) => {
      const body = req.body;

      const foundUser = usersService.getById(body.userId);

      if (!foundUser) {
        return res.status(400).send(`User with id: ${body.userId} not found`);
      }

      const newExpense = expService.addExpense(body);

      res.status(201).json(newExpense);
    };
  },

  updatedExp() {
    return async (req, res) => {
      if (typeof req.body !== 'object' || req.body === null) {
        return res.status(400).send('Required content is not passed');
      }

      const updateData = req.body;

      const { id } = req.params;

      const numericId = Number(id);

      const updExpense = expService.updExpense(numericId, updateData);

      if (!updExpense) {
        return res.status(404).send(`Expense with Id: ${numericId} not find`);
      }

      res.status(200).json(updExpense);
    };
  },

  deleteExp() {
    return (req, res) => {
      const { id } = req.params;

      const numericId = Number(id);

      const deleteExp = expService.deleteExp(numericId);

      if (!deleteExp) {
        return res.status(404).send('Expense not found');
      }

      res.status(204).end();
    };
  },
});
