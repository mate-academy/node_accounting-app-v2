'use strict';

const express = require('express');
const usersController = require('../controllers/users.controller');

const router = express.Router();

router.param('id', (req, res, next, id) => {
  const num = parseInt(id);

  if (isNaN(num)) {
    res.status(400).send({ error: 'Invalid ID format' });
  } else {
    req.params.id = num;
    next();
  }
});

router.get('/', usersController.get);
router.get('/:id', usersController.getById);
router.post('/', express.json(), usersController.create);
router.delete('/:id', usersController.remove);
router.patch('/:id', express.json(), usersController.update);

module.exports = {
  router,
};
