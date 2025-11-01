const express = require('express');
const categoriesController = require('../controllers/categories.controller.js');
const router = express.Router();

router.get('/', categoriesController.get);
router.get('/:id', categoriesController.getById);
router.post('/', categoriesController.create);
router.delete('/:id', categoriesController.remove);
router.put('/:id', categoriesController.update);
router.patch('/:id', categoriesController.update);

module.exports = router;
