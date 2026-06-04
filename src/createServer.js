'use strict';

const express = require('express');

let nextId = 1;

function uuid() {
  return nextId++;
}

class UsersService {
  #users = [];

  constructor() {
    this.initUsers();
  }

  initUsers() {
    this.#users = [];
  }

  getAll() {
    return this.#users;
  }

  create(name) {
    const user = { id: uuid(), name };

    this.#users.push(user);

    return user;
  }

  getById(id) {
    return this.#users.find((user) => user.id === id);
  }

  deleteById(id) {
    const index = this.#users.findIndex((user) => user.id === id);

    if (index === -1) {
      return;
    }

    const [removedUser] = this.#users.splice(index, 1);

    return removedUser;
  }

  update({ id, name }) {
    const userToUpdate = this.getById(id);

    if (!userToUpdate) {
      return;
    }

    return Object.assign(userToUpdate, { name });
  }
}

const usersService = new UsersService();

class ExpensesService {
  #expenses = [];

  initExpenses() {
    this.#expenses = [];
  }

  getAll(queries = {}) {
    const { userId, categories, from, to } = queries;
    let queriedExpenses = [...this.#expenses];

    if (userId) {
      queriedExpenses = queriedExpenses.filter((e) => e.userId === userId);
    }

    if (categories) {
      queriedExpenses = queriedExpenses.filter((e) => {
        return categories.includes(e.category);
      });
    }

    if (from) {
      queriedExpenses = queriedExpenses.filter(
        (e) => new Date(e.spentAt) > new Date(from),
      );
    }

    if (to) {
      queriedExpenses = queriedExpenses.filter(
        (e) => new Date(e.spentAt) < new Date(to),
      );
    }

    return queriedExpenses;
  }

  create(payload) {
    const expense = { id: uuid(), ...payload };

    this.#expenses.push(expense);

    return expense;
  }

  getById(id) {
    return this.#expenses.find((e) => e.id === id);
  }

  deleteById(id) {
    const index = this.#expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return null;
    }

    return this.#expenses.splice(index, 1)[0];
  }

  update({ id, ...payload }) {
    const expense = this.getById(id);

    if (!expense) {
      return null;
    }

    return Object.assign(expense, { ...payload });
  }
}

const expensesService = new ExpensesService();

class UsersController {
  constructor(service) {
    this.service = service;
  }

  getAll = (req, res) => {
    const users = this.service.getAll();

    res.json(users);
  };

  create = (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = this.service.create(name);

    res.status(201).json(user);
  };

  getOne = (req, res) => {
    const user = this.service.getById(Number(req.params.id));

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  };

  deleteOne = (req, res) => {
    const user = this.service.deleteById(Number(req.params.id));

    if (!user) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  };

  update = (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    const user = this.service.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    if (!name) {
      return res.sendStatus(400);
    }

    const updatedUser = this.service.update({ id, name });

    res.json(updatedUser);
  };
}

const usersController = new UsersController(usersService);

class ExpensesController {
  constructor(expenseService, userService) {
    this.expenseService = expenseService;
    this.userService = userService;
  }

  getAll = (req, res) => {
    const { userId, categories, from, to } = req.query;

    const expenses = this.expenseService.getAll({
      userId: userId ? Number(userId) : undefined,
      categories,
      from,
      to,
    });

    res.json(expenses);
  };

  create = (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const user = this.userService.getById(Number(userId));

    if (
      !userId ||
      !user ||
      !spentAt ||
      !title ||
      amount === undefined ||
      !category
    ) {
      return res.sendStatus(400);
    }

    const expense = this.expenseService.create({
      userId: Number(userId),
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(expense);
  };

  getOne = (req, res) => {
    const expense = this.expenseService.getById(Number(req.params.id));

    if (!expense) {
      return res.sendStatus(404);
    }

    res.json(expense);
  };

  deleteOne = (req, res) => {
    const expense = this.expenseService.deleteById(Number(req.params.id));

    if (!expense) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  };

  update = (req, res) => {
    const existingExpense = this.expenseService.getById(Number(req.params.id));

    if (!existingExpense) {
      return res.sendStatus(404);
    }

    const updatedExpense = this.expenseService.update({
      ...existingExpense,
      ...req.body,
      id: existingExpense.id,
      userId: existingExpense.userId,
    });

    res.json(updatedExpense);
  };
}

const expensesController = new ExpensesController(
  expensesService,
  usersService,
);

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);
usersRouter.post('/', usersController.create);
usersRouter.get('/:id', usersController.getOne);
usersRouter.delete('/:id', usersController.deleteOne);
usersRouter.patch('/:id', usersController.update);

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.post('/', expensesController.create);
expensesRouter.get('/:id', expensesController.getOne);
expensesRouter.delete('/:id', expensesController.deleteOne);
expensesRouter.patch('/:id', expensesController.update);

function createServer() {
  const app = express();

  usersService.initUsers();
  expensesService.initExpenses();
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
