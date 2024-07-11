const AbstractService = require('./abstract.service');

class ExpensesService extends AbstractService {
  constructor(userService) {
    super();

    this.userService = userService;
  }

  getAll(query) {
    let filteredCollection = [...this.collection];
    let fromDate, toDate;

    if (query.from && this.validateDateTimeString(query.from)) {
      fromDate = new Date(query.from).getTime();
    }

    if (query.to && this.validateDateTimeString(query.to)) {
      toDate = new Date(query.to).getTime();
    }

    if (query.userId) {
      filteredCollection = filteredCollection.filter(
        (entity) => entity.userId === +query.userId,
      );
    }

    if (fromDate && toDate) {
      filteredCollection = filteredCollection.filter(
        (entity) =>
          entity.spentAt.getTime() >= fromDate &&
          entity.spentAt.getTime() <= toDate,
      );
    } else if (fromDate || toDate) {
      if (fromDate) {
        filteredCollection = filteredCollection.filter(
          (entity) => entity.spentAt.getTime() >= fromDate,
        );
      }

      if (toDate) {
        filteredCollection = filteredCollection.filter(
          (entity) => entity.spentAt.getTime() <= toDate,
        );
      }
    }

    if (query.categories) {
      filteredCollection = filteredCollection.filter(
        (entity) => entity.category === query.categories,
      );
    }

    return filteredCollection;
  }

  parseCreateData(body) {
    const errors = [];
    const { userId, spentAt, title, amount, category, note = '' } = body;

    if (!userId || !spentAt || !title || !amount || !category) {
      errors.push('Some of the fields are absent');
    }

    if (spentAt && !this.validateDateTimeString(spentAt)) {
      errors.push('Wrong Spent date/time format');
    }

    if (amount && isNaN(parseInt(amount))) {
      errors.push('The amount must be a number');
    }

    const user = this.userService.getById(userId);

    if (!user) {
      errors.push('User not found');
    }

    let data = {};

    if (errors.length > 0) {
      return {
        errors,
        data,
      };
    }

    data = Object.assign(data, {
      userId,
      title,
      category,
      note,
      amount: parseInt(amount),
      spentAt: new Date(spentAt),
    });

    return {
      errors,
      data,
    };
  }

  parseUpdateData(body) {
    const errors = [];

    let spentAt = body.spentAt || null;
    const title = body.title || null;
    const amount = body.amount || null;
    const category = body.category || null;
    const note = body.note || null;

    if (spentAt && !this.validateDateTimeString(spentAt)) {
      errors.push('Wrong Spent date time format');
    } else if (spentAt) {
      spentAt = new Date(spentAt);
    }

    const data = {};

    if (spentAt) {
      Object.assign(data, { spentAt });
    }

    if (title) {
      Object.assign(data, { title });
    }

    if (amount) {
      Object.assign(data, { amount });
    }

    if (category) {
      Object.assign(data, { category });
    }

    if (note) {
      Object.assign(data, { note });
    }

    return {
      errors,
      data,
    };
  }
}

module.exports = ExpensesService;
