'use strict';

const { expensesService } = require('../services/expenses.service');
const { usersService } = require('../services/users.service');

class ExpensesController {
  get(req, res) {
    res.status(200).json(expensesService.get(req.query));
  };

  create(req, res) {
    const params = req.body;

    const isValid = expensesService.isValidParamsFor('create', params);
    const user = usersService.getUserById(params.userId);

    if (!isValid || !user) {
      return res.sendStatus(400);
    }

    res.status(201).json(expensesService.create(req.body));
  };

  getOne(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }

    const foundUser = expensesService.getOne(id);

    if (!foundUser) {
      return res.sendStatus(404);
    }

    res.status(200).json(foundUser);
  };

  remove(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }

    if (!expensesService.getOne(id)) {
      return res.sendStatus(404);
    }

    expensesService.remove(id);

    res.sendStatus(204);
  };

  update(req, res) {
    const params = req.body;
    const { id } = req.params;

    if (!expensesService.isValidParamsFor('update', params)) {
      return res.sendStatus(400);
    }

    if (!expensesService.getOne(id)) {
      return res.sendStatus(404);
    }

    res.status(200).json(expensesService.update(id, params));
  }
}

const expensesController = new ExpensesController();

module.exports = {
  expensesController,
};
