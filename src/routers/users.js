const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', usersController.getAll);

router.post('/', express.json(), usersController.addNew);

router.get('/:id', usersController.getById);

router.delete('/:id', usersController.remove);

router.patch('/:id', express.json(), usersController.update);

module.exports = router;
