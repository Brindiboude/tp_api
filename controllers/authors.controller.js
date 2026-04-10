import db from '../db.js';

export const getAuthors = (req, res) => {
  const authors = db.prepare('SELECT * FROM authors').all();
  res.json(authors);
};

export const createAuthor = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'name obligatoire' });
  }

  const result = db.prepare('INSERT INTO authors (name) VALUES (?)').run(name);
  res.status(201).json({ id: result.lastInsertRowid, name });
};

// Récupérer les articles d'un auteur
export const getArticlesByAuthor = (req, res) => {
  const { id } = req.params;

  const author = db.prepare('SELECT * FROM authors WHERE id = ?').get(id);
  if (!author) {
    return res.status(404).json({ error: 'auteur introuvable' });
  }

  const articles = db.prepare('SELECT * FROM articles WHERE author_id = ?').all(id);
  res.json(articles);
};
