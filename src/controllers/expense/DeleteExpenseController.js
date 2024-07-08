const { DeleteExpenseService } = require('../../services/expense');

class DeleteExpenseController {
  handle(req, res) {
    const {id} = req.params;
  
    try {
      const service = new DeleteExpenseService();

      const updatedExpense = service.execute(id);

      return res.status(200).json(updatedExpense);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }
}

module.exports = new DeleteExpenseController();