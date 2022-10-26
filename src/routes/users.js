'use strict';

const express = require('express');
const router = express.Router();
const {
  getAll,
  getOne,
  add,
  remove,
  update,
} = require('../controllers/users');

router.get('/', getAll);

router.get('/:userId', getOne);

router.post('/', add);

router.patch('/:userId', update);

router.delete('/:userId', remove);

module.exports = router;
