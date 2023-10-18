'use strict';

const usersService = require('./../services/users.service');

const userIdRouteParam = (req, res, next, id) => {
  const userId = parseInt(id);

  if (Number.isNaN(userId)) {
    res.sendStatus(400);

    return;
  }

  if (!usersService.exists(userId)) {
    res.sendStatus(404);

    return;
  }

  next();
};

const userNameRequestBody = (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  next();
};

module.exports = {
  userIdRouteParam,
  userNameRequestBody,
};
