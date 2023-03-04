'use strict';

const usersController = require('../controllers/users');
const express = require('express');

const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', usersController.add);
router.delete('/:id', usersController.remove);
router.patch('/:id', usersController.update);

module.exports = router;
