const BaseService = require('./baseService');

class ExpenseService extends BaseService {
  getByUserId(userId) {
    return this._items.filter(item => String(item.userId) === String(userId));
  }

  getByCaterory(category) {
    return this._items.filter(
      item => String(item.category) === String(category),
    );
  }

  getBetweenDates(from, to) {
    const dateFrom = new Date(from);
    const dateTo = new Date(to);
    const filteredItems = this._items.filter(item => {
      const spentAt = new Date(item.spentAt);

      return spentAt > dateFrom && spentAt < dateTo;
    });

    return filteredItems;
  }
}

module.exports = ExpenseService;
