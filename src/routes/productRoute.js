const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController.js');

productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getAllById);

productRouter.post('/', productController.create);
productRouter.patch('/:id', productController.update);

productRouter.delete('/:id', productController.delete);

module.exports = productRouter; // Экспортируйте непосредственно маршрутизатор
