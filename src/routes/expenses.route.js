import { Router } from 'express';
import * as expenses from '../controllers/expenses.controller.js';

export const router = Router();

router.get('/', expenses.getAll);

router.get('/:id', expenses.getById);

router.post('/', expenses.create);

router.delete('/:id', expenses.deleteById);

router.patch('/:id', expenses.update);
