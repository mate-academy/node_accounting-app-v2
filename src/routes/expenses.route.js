'use strict';

const Router = require('express');
const router = new Router();

const expController = require('../controllers/expenses.controller');

router.get('/', expController.getAll);
router.get('/:id', expController.getOne);
router.post('/', expController.create);
router.put('/:id', expController.update);
router.delete('/:id', expController.remove);

module.exports = router;
