const { CreateExpenseService } = require('../../services/expense');

class CreateExpenseController {
  handle(req, res) {
    try {
      const service = new CreateExpenseService();

      const expense = service.execute(req.body);

      return res.status(201).json(expense);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }
}

module.exports = new CreateExpenseController();
