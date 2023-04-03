import express from 'express';
import cors from 'cors';
import router from './routes/routes';
import { validDatabases } from './utils/helpers/validDatabases';
function createServer() {
    const app = express();
    app.use(cors());
    app.use((req, res, next) => {
        const db = req.path.split('/')[1];
        if (!validDatabases.includes(db)) {
            res.status(404).send('Database not found');
            return;
        }
        next();
    });
    app.use(express.json());
    app.use('/users', router);
    app.use('/expenses', router);
    return app;
}
export default createServer;
