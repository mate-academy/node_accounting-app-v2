const { EditExpenseService } = require('../../services/expense');

class EditExpenseController {
  handle(req, res) {
    const { id } = req.params;

    try {
      const service = new EditExpenseService();

      const expense = service.execute(id, req.body);

      return res.status(200).json(expense);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }
}

module.exports = new EditExpenseController();
