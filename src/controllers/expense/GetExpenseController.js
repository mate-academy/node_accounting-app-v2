const { GetExpenseService } = require('../../services/expense');

class GetExpenseController {
  handle(req, res) {
    const { id } = req.params;

    try {
      const service = new GetExpenseService();

      const expenses = service.execute(id);

      return res.status(200).json(expenses);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }
}

module.exports = new GetExpenseController();