const { CreateExpenseService } = require('../../services/expense');

class CreateExpenseController {
  handle(req, res) {
    try {
      const service = new CreateExpenseService();

      const expenses = service.execute(req.body);

      return res.status(201).json(expenses);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }
} 

module.exports = new CreateExpenseController();