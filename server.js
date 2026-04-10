import express from 'express';
import db from './db.js';
import authorsRoutes from './routes/authors.routes.js';
import articlesRoutes from './routes/articles.routes.js';

const app = express();

// pour pouvoir lire le JSON dans les requêtes
app.use(express.json());

// middleware qui affiche la méthode et l'url de chaque requête
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// on branche les routes
app.use('/authors', authorsRoutes);
app.use('/articles', articlesRoutes);

app.listen(3000, () => {
  console.log('Serveur lancé sur le port 3000');
});
