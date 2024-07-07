const { Router } = require('express');

const userRoutes = Router();

userRoutes.get('/');
userRoutes.get('/:id');
userRoutes.post('/');
userRoutes.patch('/:id');
userRoutes.delete('/:id');

module.exports = userRoutes;