import express from 'express';

const app = express();

// Middleware pour lire le JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API en ligne');
});

app.listen(3000, () => {
  console.log('Serveur lancé sur le port 3000');
});
