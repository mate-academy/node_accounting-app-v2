const { GetAllExpensesService } = require('../../services/expense');

class GetAllExpensesController {
  handle(req, res) {
    try {
      const service = new GetAllExpensesService();

      const expenses = service.execute(req.query);

      return res.status(200).json(expenses);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }
}

module.exports = new GetAllExpensesController();