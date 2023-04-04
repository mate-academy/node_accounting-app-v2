import express from 'express';
import * as controllers from '../controller/controller';
const router = express.Router();
router.use((req, res, next) => {
    req.headers.db = req.baseUrl.slice(1);
    next();
});
router.get('/', controllers.getAll);
router.get('/:id', controllers.getById);
router.post('/', controllers.create);
router.delete('/:id', controllers.remove);
router.patch('/:id', controllers.patch);
export default router;
