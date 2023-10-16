'use strict';

const express = require('express');

const expencesServices = require('../controllers/expenses.controller');

const router = express.Router();

router.get('/', expencesServices.getAll);
router.get('/:id', expencesServices.getOne);
router.post('/', express.json(), expencesServices.create);
router.patch('/:id', express.json(), expencesServices.update);
router.delete('/:id', expencesServices.remove);

module.exports = router;
