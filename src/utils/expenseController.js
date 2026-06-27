const { userService } = require('../users/users.router');
const BaseController = require('./baseController');

class ExpenseController extends BaseController {
  createOne = (request, response) => {
    const body = request.body;

    if (!userService.getById(body.userId)) {
      return response.status(400).json({
        message: 'User not found',
      });
    }

    const newExpense = this.service.createOne(body);

    response.status(201).json(newExpense);
  };

  getByQuery = (request, response) => {
    const { userId, categories, from, to } = request.query;

    let items = this.service.get();

    if (userId) {
      items = items.filter(item => String(item.userId) === String(userId));
    }

    if (categories) {
      const categoriesList = Array.isArray(categories)
        ? categories.map(String)
        : [String(categories)];

      items = items.filter(
        item => categoriesList.includes(String(item.category)),
        // eslint-disable-next-line function-paren-newline
      );
    }

    if (from && to) {
      const dateFrom = new Date(from);
      const dateTo = new Date(to);

      items = items.filter(item => {
        const spentAt = new Date(item.spentAt);

        return spentAt > dateFrom && spentAt < dateTo;
      });
    }

    response.json(items);
  };
}

module.exports = ExpenseController;
