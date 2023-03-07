'use strict';

const services = require('./services');
const { isEqual } = require('lodash');
const { v4: uuidv4 } = require('uuid');

const keyNames = {
  users: ['name'],
  expenses: [
    'userId',
    'title',
    'spentAt',
    'amount',
    'category',
    'note',
  ],
};

keyNames.patch = {
  expenses: keyNames.expenses.filter(key => key !== 'userId'),
  users: keyNames.users,
};

const getKeys = (req) => {
  const { method, headers: { collection } } = req;

  return method === 'PATCH'
    ? keyNames.patch[collection]
    : keyNames[collection];
};

const getProps = (req) => (
  getKeys(req).reduce((prev, key) => key in req.body
    ? Object.assign(prev, { [key]: req.body[key] })
    : prev, {}
  )
);

module.exports = {
  getAll: (req, res) => {
    const { query, headers: { collection } } = req;

    res.send(services.getAll(collection, query));
  },

  getById: (req, res) => {
    const { headers: { collection }, params: { id } } = req;
    const item = services.getById(collection, id);

    if (!id) {
      return res.sendStatus(400);
    }

    if (!item) {
      return res.sendStatus(404);
    }
    res.send(item);
  },

  post: (req, res) => {
    const { headers: { collection }, body: { userId } } = req;
    const props = getProps(req);
    const isBodyValid = isEqual(Object.keys(props), getKeys(req));
    const userExists = collection === 'expenses'
      ? services.getById('users', userId)
      : true;

    const newItem = {
      id: uuidv4(),
      ...props,
    };

    if (!isBodyValid || !userExists) {
      return res.sendStatus(400);
    }
    res.statusCode = 201;
    res.send(services.post(collection, newItem));
  },

  remove: (req, res) => {
    const { collection } = req.headers;
    const { id } = req.params;

    res.sendStatus(services.remove(collection, id));
  },

  patch: (req, res) => {
    const { params: { id }, body, headers: { collection } } = req;
    const props = getProps(req);
    const item = services.patch(collection, id, props);
    const isBodyValid = getKeys(req).some(key => key in body);

    if (!item) {
      return res.sendStatus(404);
    }

    if (!id || !isBodyValid) {
      return res.sendStatus(400);
    }
    res.send(item);
  },
};
