import express from 'express';
import db from './db.js';
import authorsRoutes from './routes/authors.routes.js';

const app = express();

app.use(express.json());

app.use('/authors', authorsRoutes);

app.listen(3000, () => {
  console.log('Serveur lancé sur le port 3000');
});
