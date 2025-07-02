const expenseService = require('../Services/expenseService');
const userService = require('../Services/userService');

const expenseController = {
  async getMany(req, res) {
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    let categories;

    if (req.query.categories) {
      categories = Array.isArray(req.query.categories)
        ? req.query.categories
        : [req.query.categories];
    }

    const from = req.query.from;
    const to = req.query.to;

    res.json(expenseService.getMany(userId, categories, from, to));
  },

  async getById(req, res) {
    if (!req.params.id) {
      return res.sendStatus(400);
    }

    const expense = expenseService.getById(Number(req.params.id));

    if (!expense) {
      return res.sendStatus(404);
    }

    res.json(expense);
  },

  async create(req, res) {
    if (
      !req.body ||
      !req.body.userId ||
      !userService.getById(Number(req.body.userId)) ||
      !req.body.spentAt ||
      Date(req.body.spentAt) === 'Invalid Date' ||
      !req.body.title ||
      !req.body.amount ||
      !req.body.category
    ) {
      return res.sendStatus(400);
    }

    res
      .status(201)
      .json(
        expenseService.create({ ...req.body, userId: Number(req.body.userId) }),
      );
  },

  async update(req, res) {
    if (!req.body || !req.params.id) {
      return res.sendStatus(400);
    }

    if (!expenseService.getById(Number(req.params.id))) {
      return res.sendStatus(404);
    }

    res
      .status(200)
      .json(expenseService.update(Number(req.params.id), req.body));
  },

  async delete(req, res) {
    if (!expenseService.getById(Number(req.params.id))) {
      return res.sendStatus(404);
    }
    expenseService.delete(Number(req.params.id));
    res.sendStatus(204);
  },
};

module.exports = expenseController;
