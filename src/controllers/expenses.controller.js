const { sendErrorResponse } = require('../helpers/sendErrorMessage');
const {
  expensesService,
  initExpensesService,
} = require('../services/expenses.service');
const { validateExpenses } = require('../validators/expenses.validator');
const { validateId } = require('../validators/users.validator');
const { STATUS_CODES, ERRORS } = require('../variables/variables');

const expensesUrl = '/expenses';

const expensesController = (server) => {
  initExpensesService();

  server.get(expensesUrl, (req, res) => {
    const params = req.query;

    const expenses = expensesService.getExpenses(params);

    res.status(STATUS_CODES.OK).send(expenses);
  });

  server.post(expensesUrl, (req, res) => {
    try {
      const expenses = req.body;

      validateExpenses(expenses, res);

      const newExpenses = expensesService.createExpenses(expenses);

      res.status(STATUS_CODES.CREATED).send(newExpenses);
    } catch (e) {
      if (e.message === ERRORS.USER_NOT_FOUND) {
        sendErrorResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.USER_NOT_FOUND);
      }
    }
  });

  server.get(`${expensesUrl}/:id`, (req, res) => {
    const id = req.params.id;

    validateId(id, res);

    const expenses = expensesService.getExpensesById(+id);

    if (!expenses) {
      sendErrorResponse(res, STATUS_CODES.NOT_FOUND, ERRORS.EXPENSES_NOT_FOUND);
    }

    res.status(STATUS_CODES.OK).send(expenses);
  });

  server.delete(`${expensesUrl}/:id`, (req, res) => {
    const id = req.params.id;

    validateId(id, res);

    const expenses = expensesService.getExpensesById(+id);

    if (!expenses) {
      sendErrorResponse(res, STATUS_CODES.NOT_FOUND, ERRORS.EXPENSES_NOT_FOUND);
    }

    expensesService.deleteExpenses(+id);
    res.status(STATUS_CODES.NO_CONTENT).end();
  });

  server.patch(`${expensesUrl}/:id`, (req, res) => {
    const id = req.params.id;
    const params = req.body;

    validateId(id, res);

    const expenses = expensesService.getExpensesById(+id);

    if (!expenses) {
      sendErrorResponse(res, STATUS_CODES.NOT_FOUND, ERRORS.EXPENSES_NOT_FOUND);
    }

    const updatedExpenses = expensesService.updateExpenses(+id, params);

    res.status(STATUS_CODES.OK).send(updatedExpenses);
  });
};

module.exports = {
  expensesController,
};
