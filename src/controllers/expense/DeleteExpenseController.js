const { DeleteExpenseService } = require('../../services/expense');

class DeleteExpenseController {
  handle(req, res) {
    const { id } = req.params;

    try {
      const service = new DeleteExpenseService();

      const removedExpense = service.execute(id);

      if (removedExpense) {
        return res.status(204).json();
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }
}

module.exports = new DeleteExpenseController();
