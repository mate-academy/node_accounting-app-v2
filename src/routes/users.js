'use strict';
/* eslint-disable max-len */

const { getAll, getOne, create, remove, update } = require('../controllers/users');
const express = require('express');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.delete('/:id', remove);
router.patch('/:id', update);

module.exports = router;
